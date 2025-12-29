import { bookmarkRouter } from "~/server/api/routers/bookmark";
import { collectionRouter } from "~/server/api/routers/collection";
import { metadataRouter } from "~/server/api/routers/metadata";
import { welcomeRouter } from "~/server/api/routers/welcome";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  bookmark: bookmarkRouter,
  collection: collectionRouter,
  metadata: metadataRouter,
  welcome: welcomeRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
