import { desc, eq } from "drizzle-orm";
import z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { collection } from "~/server/db/schema";

export const collectionRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(collection)
      .where(eq(collection.userId, ctx.session.user.id))
      .orderBy(desc(collection.createdAt));
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(collection)
        .values({
          ...input,
          userId: ctx.session.user.id,
        })
        .returning();
    }),
});
