import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moved to Essays",
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.domain}/essays/` },
};

export default function LegacyThoughtsIndex() {
  return <PermanentRedirect href="/essays/" />;
}
