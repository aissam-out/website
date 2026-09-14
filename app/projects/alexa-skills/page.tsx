import type { Metadata } from "next";
import { PermanentRedirect } from "@/components/PermanentRedirect";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Moved",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${site.domain}/projects/series/alexa-skills-with-python/`,
  },
};

/** Old stub URL for the Alexa project now points at the series hub. */
export default function LegacyAlexaSkillsRedirect() {
  return (
    <PermanentRedirect href="/projects/series/alexa-skills-with-python/" />
  );
}
