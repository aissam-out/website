import type { MetadataRoute } from "next";
import { getPosts, getSeries, hrefForPost, hrefForSeries } from "@/lib/content";
import { ARTICLE_TO_PROJECT } from "@/lib/articleRedirects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/notes", "/essays"].map(
    (path) => ({
      url: `${site.domain}${path}`,
      lastModified: new Date(),
    }),
  );

  const posts = [
    ...getPosts("projects"),
    ...getPosts("reads"),
    ...getPosts("thoughts"),
  ].map((post) => ({
    url: `${site.domain}${hrefForPost(post)}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  const series = getSeries("thoughts").map((item) => ({
    url: `${site.domain}${hrefForSeries(item)}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  // Legacy article URLs keep working via redirects.
  const legacyArticles = Object.keys(ARTICLE_TO_PROJECT).map((slug) => ({
    url: `${site.domain}/articles/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...posts, ...series, ...legacyArticles];
}
