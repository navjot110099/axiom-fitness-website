import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Aurora } from "@/components/ui/Aurora";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import {
  ReadingProgress,
  ArticleCover,
  ArticleBody,
} from "@/components/sections/JournalArticle";
import { POSTS } from "@/lib/data";
import { bodyFor } from "@/lib/journal-bodies";

type Tone = "voltage" | "ember" | "plasma" | "gold" | "neutral";

const TONE: Record<string, Tone> = {
  Recovery: "plasma",
  Strength: "voltage",
  Nutrition: "gold",
  Intelligence: "plasma",
  Wellness: "gold",
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const blocks = bodyFor(post.slug);
  const related = POSTS.filter((p) => p.slug !== post.slug)
    .sort((a) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden pt-40 pb-10 lg:pt-48">
          <Aurora />
          <div className="container-x relative">
            <Link
              href="/journal"
              data-cursor
              className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-bone focus-ring"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Journal
            </Link>

            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <Badge tone={TONE[post.category] ?? "neutral"}>
                  {post.category}
                </Badge>
                <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-faint">
                  <Clock className="h-3 w-3" /> {post.read} min read
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  {post.date}
                </span>
              </div>

              <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-mega md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-7 text-xl leading-relaxed text-ash">
                {post.excerpt}
              </p>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="container-x">
          <ArticleCover src={post.image} alt={post.title} />
        </div>

        {/* Body */}
        <div className="container-x">
          <div className="mx-auto max-w-[46rem]">
            {blocks.length > 0 ? (
              <ArticleBody blocks={blocks} />
            ) : (
              <p className="mt-14 text-lg leading-relaxed text-ash">
                {post.excerpt}
              </p>
            )}

            <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  Written by
                </div>
                <div className="mt-1 font-display text-lg font-extrabold">
                  The AXIOM Performance Team
                </div>
              </div>
              <Link
                href="/journal"
                data-cursor="cta"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 py-3 text-sm text-bone transition-colors hover:border-bone/40 focus-ring"
              >
                More essays
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Related */}
        <Section className="mt-10 border-t border-line">
          <p className="eyebrow mb-8">
            <span className="text-voltage">/ Continue</span> — Related reading
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                data-cursor="cta"
                data-cursor-label="Read"
                className="group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Badge tone={TONE[p.category] ?? "neutral"}>
                    {p.category}
                  </Badge>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                    {p.read} min
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-extrabold leading-tight transition-colors group-hover:text-voltage">
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </Section>
      </article>
    </>
  );
}
