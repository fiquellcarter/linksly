import { type Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import type { PropsWithChildren } from "react";

import { cn } from "~/lib/utils";
import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Linksly – Minimal Bookmark Manager",
  description: "Linksly is a minimal bookmark manager to save links and organize bookmarks into simple collections.",
};

const sans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="en"
      data-theme="symphony"
      data-scroll-behavior="smooth"
      className={cn("scroll-smooth antialiased", sans.variable, serif.variable, mono.variable)}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
