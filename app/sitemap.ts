import type { MetadataRoute } from "next";
import { getPosts, getSeries, hrefForSeries } from "@/lib/content";
import { ARTICLE_TO_PROJECT } from "@/lib/articleRedirects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/reads", "/thoughts"].map(
    (path) => ({
      url: `${site.domain}${path}`,
      lastModified: new Date(),
    }),
  );

  const collections = [
    ["projects", getPosts("projects")],
    ["reads", getPosts("reads")],
    ["thoughts", getPosts("thoughts")],
  ] as const;

  const posts = collections.flatMap(([kind, items]) =>
    items.map((post) => ({
      url: `${site.domain}/${kind}/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    })),
  );

  const series = getSeries("thoughts").map((item) => ({
    url: `${site.domain}${hrefForSeries(item)}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  // Keep legacy article URLs discoverable; they redirect to projects.
  const legacyArticles = Object.keys(ARTICLE_TO_PROJECT).map((slug) => ({
    url: `${site.domain}/articles/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...posts, ...series, ...legacyArticles];
}
