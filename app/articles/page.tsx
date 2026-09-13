import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moved to Projects",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.domain}/projects/` },
};

export default function LegacyArticlesIndex() {
  return <PermanentRedirect href="/projects/" />;
}
