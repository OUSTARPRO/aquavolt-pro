import { authRouter } from "./auth-router";
import { galleryRouter } from "./gallery-router";
import { quoteRouter } from "./quote-router";
import { chatRouter } from "./chat-router";
import { catalogRouter } from "./catalog-router";
import { productRouter } from "./product-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  gallery: galleryRouter,
  quote: quoteRouter,
  chat: chatRouter,
  catalog: catalogRouter,
  product: productRouter,
});

export type AppRouter = typeof appRouter;
