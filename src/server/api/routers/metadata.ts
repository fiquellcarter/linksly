import { TRPCError } from "@trpc/server";
import * as cheerio from "cheerio";
import { z } from "zod";

import { env } from "~/env";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const USER_AGENT = `Mozilla/5.0 (compatible; ${env.NEXT_PUBLIC_APP_NAME}/1.0; +${env.NEXT_PUBLIC_APP_URL})`;
const FETCH_TIMEOUT = 10000;
const TITLES = [
  "Title? What Title? We Don't Do That Here 💀",
  "This Page Just Woke Up And Chose Violence 😤",
  "404 Title Not Found... but the vibes? Immaculate ✨",
  "We ran out of budget for titles, sorry not sorry 😂",
];
const DESCRIPTIONS = [
  "The description was kidnapped by gremlins at 3:17 AM. Send help... or pizza.",
  "This page is 87% vibes, 12% chaos, and 1% actual content.",
  "Developer promised a description in 2019. Still waiting.",
  "You've reached the loading screen of life. Enjoy the existential void.",
];

export const metadataRouter = createTRPCRouter({
  extract: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const parsedUrl = new URL(input.url);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          throw new TRPCError({
            code: "BAD_REQUEST",
          });
        }

        const response = await fetch(input.url, {
          headers: {
            "User-Agent": USER_AGENT,
          },
          signal: AbortSignal.timeout(FETCH_TIMEOUT),
        });

        if (!response.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
          });
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        const title =
          $('meta[property="og:title"]').attr("content")?.trim() ??
          $('meta[name="twitter:title"]').attr("content")?.trim() ??
          $("title").text().trim() ??
          TITLES[Math.floor(Math.random() * TITLES.length)]!;

        const description =
          $('meta[property="og:description"]').attr("content")?.trim() ??
          $('meta[name="twitter:description"]').attr("content")?.trim() ??
          $('meta[name="description"]').attr("content")?.trim() ??
          DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]!;

        // TODO: create your own favicon
        const faviconHref =
          $('link[rel="icon"]').attr("href") ??
          $('link[rel="shortcut icon"]').attr("href") ??
          $('link[rel="apple-touch-icon"]').attr("href") ??
          "/favicon.ico";

        const favicon = new URL(faviconHref, input.url).href;

        return { title, description, favicon };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          cause: error,
        });
      }
    }),
});
