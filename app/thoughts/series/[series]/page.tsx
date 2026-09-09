import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesHub } from "@/components/PostLayout";
import { getSeries, getSeriesBySlug } from "@/lib/content";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getSeries("thoughts").map((series) => ({ series: series.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("thoughts", seriesSlug);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
  };
}

export default async function ThoughtSeriesPage({ params }: Props) {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("thoughts", seriesSlug);
  if (!series) notFound();

  return <SeriesHub series={series} kindLabel="thoughts" />;
}
