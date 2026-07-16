import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const SYSTEM_PROMPT = `Vous êtes l'assistant virtuel d'AquaVolt Pro, une entreprise marocaine spécialisée en électricité, plomberie et piscines, basée à Khouribga mais opérant dans tout le Maroc.

SERVICES PROPOSÉS :
- Électricité : installation, réparation, mise aux normes, tableaux électriques, éclairage
- Plomberie : installation sanitaire, dépannage, chauffe-eau, fuite d'eau, canalisation
- Piscines : construction, rénovation, entretien, équipement (pompe, filtre, traitement)
- Maintenance : contrats annuels pour particuliers et professionnels

ZONES D'INTERVENTION : Tout le Maroc (Khouribga, Casablanca, Rabat, Marrakech, Fès, et autres villes)

CONSIGNES :
- Répondez en français ou en arabe selon la langue du client
- Soyez professionnel, chaleureux et concise
- Pour les demandes de devis, collectez : type de service, ville, description du besoin, nom et téléphone
- Ne donnez pas de tarifs précis sans visite technique, mais donnez des fourchettes indicatives
- Redirigez vers le formulaire de devis pour les demandes complexes
- Mentionnez toujours que AquaVolt Pro est basée à Khouribga avec couverture nationale

FOURCHETTES INDICATIVES (à mentionner avec prudence) :
- Dépannage électricité/plomberie : à partir de 200 MAD
- Installation électrique maison : sur devis
- Piscine : projet sur mesure, visite technique obligatoire
- Contrat maintenance : mensuel ou annuel disponible`;

/**
 * Sends a chat message to an n8n webhook and returns the assistant reply.
 * The n8n workflow should return JSON: { "reply": "..." }
 */
async function callN8nChatWebhook(
  messages: Array<{ role: string; content: string }>,
  language: string
): Promise<string> {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL!;
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, language, systemPrompt: SYSTEM_PROMPT }),
  });

  if (!response.ok) {
    throw new Error(`n8n webhook responded with status ${response.status}`);
  }

  const data = (await response.json()) as { reply?: string; output?: string; text?: string };
  // Support multiple common n8n response shapes
  const reply = data.reply ?? data.output ?? data.text;
  if (typeof reply !== "string" || !reply) {
    throw new Error("n8n webhook returned no reply field");
  }
  return reply;
}

export const chatRouter = createRouter({
  sendMessage: publicQuery
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant", "system"]),
            content: z.string(),
          })
        ),
        language: z.enum(["fr", "ar"]).default("fr"),
      })
    )
    .mutation(async ({ input }) => {
      const errorReply =
        input.language === "ar"
          ? "عذراً، خدمة الدردشة غير متوفرة حالياً. يرجى الاتصال بنا على الواتساب."
          : "Désolé, le service de chat n'est pas disponible pour le moment. Veuillez nous contacter via WhatsApp.";

      // Prefer n8n webhook when configured
      if (process.env.N8N_CHAT_WEBHOOK_URL) {
        try {
          const reply = await callN8nChatWebhook(input.messages, input.language);
          return { reply, backend: "n8n" };
        } catch (error) {
          console.error("n8n chat webhook error:", error);
          // Fall through to OpenAI fallback
        }
      }

      if (!process.env.OPENAI_API_KEY) {
        return { reply: errorReply, backend: "none" };
      }

      const langPrompt =
        input.language === "ar"
          ? "\n\nملاحظة مهمة: يجب أن ترد دائماً باللغة العربية فقط، باستخدام لهجة مغربية ودية عند الاقتضاء."
          : "\n\nNote importante : vous devez toujours répondre en français uniquement.";

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT + langPrompt },
            ...input.messages,
          ],
          temperature: 0.7,
          max_tokens: 800,
        });

        const reply = response.choices[0]?.message?.content || "Erreur";
        return { reply, backend: "openai" };
      } catch (error) {
        console.error("OpenAI error:", error);
        return {
          reply:
            input.language === "ar"
              ? "حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
              : "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
          backend: "error",
        };
      }
    }),
});
