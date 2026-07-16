import { authRouter } from "./auth-router";
import { galleryRouter } from "./gallery-router";
import { quoteRouter } from "./quote-router";
import { chatRouter } from "./chat-router";
import { n8nRouter } from "./n8n-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  gallery: galleryRouter,
  quote: quoteRouter,
  chat: chatRouter,
  n8n: n8nRouter,
});

export type AppRouter = typeof appRouter;
