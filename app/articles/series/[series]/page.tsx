import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { site } from "@/lib/site";

type Props = { params: Promise<{ series: string }> };

export function generateStaticParams() {
  // Keep the route buildable; any old series hub goes to projects.
  return [{ series: "darija" }, { series: "alexa-skills-with-python" }];
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Moved to Projects",
    robots: { index: false, follow: true },
    alternates: { canonical: `${site.domain}/projects/` },
  };
}

export default async function LegacyArticleSeriesRedirect(_props: Props) {
  return <PermanentRedirect href="/projects/" />;
}
