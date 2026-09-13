import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { ARTICLE_TO_PROJECT } from "@/lib/articleRedirects";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(ARTICLE_TO_PROJECT).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const href = ARTICLE_TO_PROJECT[slug];
  if (!href) return {};
  return {
    title: "Moved",
    robots: { index: false, follow: true },
    alternates: { canonical: `${site.domain}${href}` },
  };
}

export default async function LegacyArticleRedirect({ params }: Props) {
  const { slug } = await params;
  const href = ARTICLE_TO_PROJECT[slug] ?? "/projects/";
  return <PermanentRedirect href={href} />;
}
