import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesHub } from "@/components/PostLayout";
import { getSeries, getSeriesBySlug } from "@/lib/content";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getSeries("articles").map((series) => ({ series: series.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("articles", seriesSlug);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
  };
}

export default async function ArticleSeriesPage({ params }: Props) {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("articles", seriesSlug);
  if (!series) notFound();

  return <SeriesHub series={series} kindLabel="articles" />;
}
