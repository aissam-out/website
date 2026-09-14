import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeriesHub } from "@/components/PostLayout";
import { getSeries, getSeriesBySlug } from "@/lib/content";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  return getSeries("projects").map((series) => ({ series: series.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("projects", seriesSlug);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
  };
}

export default async function ProjectSeriesPage({ params }: Props) {
  const { series: seriesSlug } = await params;
  const series = getSeriesBySlug("projects", seriesSlug);
  if (!series) notFound();

  return <SeriesHub series={series} kindLabel="projects" />;
}
