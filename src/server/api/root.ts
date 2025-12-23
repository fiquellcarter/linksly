import { collectionRouter } from "~/server/api/routers/collection";
import { welcomeRouter } from "~/server/api/routers/welcome";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  collection: collectionRouter,
  welcome: welcomeRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
