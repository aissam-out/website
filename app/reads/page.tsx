import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moved to Notes",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.domain}/notes/` },
};

export default function LegacyReadsIndex() {
  return <PermanentRedirect href="/notes/" />;
}
