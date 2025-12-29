import { TRPCError } from "@trpc/server";
import { and, desc, eq } from "drizzle-orm";
import { kebabCase } from "string-ts";
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
  bySlug: protectedProcedure
    .input(
      z.object({
        slug: z.string().min(1),
      })
    )
    .query(async ({ ctx, input }) => {
      const [data] = await ctx.db
        .select()
        .from(collection)
        .where(and(eq(collection.userId, ctx.session.user.id), eq(collection.slug, input.slug)));

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return data;
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = kebabCase(input.name);

      await ctx.db
        .insert(collection)
        .values({
          ...input,
          slug,
          userId: ctx.session.user.id,
        })
        .returning();
    }),
});
