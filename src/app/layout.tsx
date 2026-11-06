import type { Metadata, Viewport } from "next";
import { archivo, inter, jetbrains } from "@/lib/fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/providers/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BRAND } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AXIOM — The Operating System for the Human Body",
    template: "%s — AXIOM",
  },
  description:
    "AXIOM is a luxury fitness & wellness ecosystem: twelve training disciplines, a full recovery circuit, performance nutrition, and an AI intelligence layer that unifies it all.",
  applicationName: BRAND.name,
  keywords: [
    "luxury gym",
    "fitness club",
    "wellness",
    "recovery",
    "ice bath",
    "sauna",
    "AI fitness coach",
    "personal training",
    "New York gym",
  ],
  authors: [{ name: BRAND.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "AXIOM — The Operating System for the Human Body",
    description:
      "Twelve disciplines. A full recovery circuit. Performance nutrition. One intelligence layer. This is not a gym — it is an ecosystem.",
    siteName: BRAND.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "AXIOM — The Operating System for the Human Body",
    description:
      "A luxury fitness & wellness ecosystem with an AI intelligence layer.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Speed up the first Unsplash image (LCP) */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="grain relative min-h-screen bg-void">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-voltage focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
