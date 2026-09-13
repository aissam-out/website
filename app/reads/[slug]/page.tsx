import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostLayout } from "@/components/PostLayout";
import { getPost, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts("reads").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("reads", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  };
}

export default async function ReadPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("reads", slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author },
    url: `${site.domain}/reads/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout
        post={post}
        eyebrow="Note"
        backHref="/reads"
        backLabel="All notes"
      />
    </>
  );
}
