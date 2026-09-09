import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostLayout } from "@/components/PostLayout";
import { getPost, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts("projects").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost("projects", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost("projects", slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: post.title,
    description: post.description,
    author: { "@type": "Person", name: site.author },
    datePublished: post.date,
    url: `${site.domain}/projects/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout
        post={post}
        eyebrow="Project"
        backHref="/projects"
        backLabel="All projects"
      />
    </>
  );
}
