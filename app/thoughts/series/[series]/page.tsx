import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { getSeries } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getSeries("thoughts").map((series) => ({ series: series.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series } = await params;
  const href = `/essays/series/${series}/`;
  return {
    title: "Moved",
    robots: { index: false, follow: true },
    alternates: { canonical: `${site.domain}${href}` },
  };
}

export default async function LegacyThoughtSeriesRedirect({ params }: Props) {
  const { series } = await params;
  return <PermanentRedirect href={`/essays/series/${series}/`} />;
}
