/** Canonical site origin, shared by metadata, sitemap, robots and OG image. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://axiom.fit";
