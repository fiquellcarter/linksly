import { desc, eq } from "drizzle-orm";
import z from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { bookmark } from "~/server/db/schema";

export const bookmarkRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select()
      .from(bookmark)
      .where(eq(bookmark.userId, ctx.session.user.id))
      .orderBy(desc(bookmark.createdAt));
  }),
  create: protectedProcedure
    .input(
      z.object({
        collectionId: z.number().nullable(),
        url: z.string().url(),
        title: z.string().min(1),
        description: z.string().min(1),
        favicon: z.string().url(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(bookmark).values({
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});
