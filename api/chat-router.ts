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

COMMANDE DE COMPLÉMENTS :
Les clients et les techniciens peuvent commander des produits (chlore, pH, algicide, joints, LED, etc.) pour un client via la page /commande.
Redirigez vers /commande lorsqu'on veut commander des produits pour un client.

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
      if (!process.env.OPENAI_API_KEY) {
        return {
          reply:
            input.language === "ar"
              ? "عذراً، خدمة الدردشة غير متوفرة حالياً. يرجى الاتصال بنا على الواتساب."
              : "Désolé, le service de chat n'est pas disponible pour le moment. Veuillez nous contacter via WhatsApp.",
        };
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
        return { reply };
      } catch (error) {
        console.error("OpenAI error:", error);
        return {
          reply:
            input.language === "ar"
              ? "حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
              : "Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.",
        };
      }
    }),
});
