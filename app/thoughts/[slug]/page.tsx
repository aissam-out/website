import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostLayout } from "@/components/PostLayout";
import { getPost, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts("thoughts").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("thoughts", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: post.sourceUrl ? { canonical: site.domain + `/thoughts/${slug}` } : undefined,
    openGraph: { title: post.title, description: post.description },
  };
}

export default async function ThoughtPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("thoughts", slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author },
    url: `${site.domain}/thoughts/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout
        post={post}
        eyebrow="Essay"
        backHref="/thoughts"
        backLabel="All essays"
      />
    </>
  );
}
