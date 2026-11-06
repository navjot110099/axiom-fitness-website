import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { POSTS } from "@/lib/data";

/** Static + generated routes for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const primary = [
    "",
    "/disciplines",
    "/recovery",
    "/nutrition",
    "/cafe",
    "/intelligence",
    "/membership",
  ];
  const secondary = [
    "/classes",
    "/coaches",
    "/challenges",
    "/leaderboards",
    "/store",
    "/journal",
    "/contact",
    "/careers",
    "/press",
    "/booking",
  ];
  const utility = ["/dashboard", "/privacy", "/terms"];

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    ...primary.map((p) => entry(p, p === "" ? 1 : 0.9, "weekly")),
    ...secondary.map((p) => entry(p, 0.7, "weekly")),
    ...POSTS.map((post) => entry(`/journal/${post.slug}`, 0.6, "monthly")),
    ...utility.map((p) => entry(p, 0.3, "monthly")),
  ];
}
