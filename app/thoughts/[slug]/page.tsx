import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts("thoughts").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const href = `/essays/${slug}/`;
  return {
    title: "Moved",
    robots: { index: false, follow: true },
    alternates: { canonical: `${site.domain}${href}` },
  };
}

export default async function LegacyThoughtRedirect({ params }: Props) {
  const { slug } = await params;
  return <PermanentRedirect href={`/essays/${slug}/`} />;
}
