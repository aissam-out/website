import type { MetadataRoute } from "next";
import { getPosts, getSeries, hrefForSeries } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/reads", "/thoughts", "/articles"].map(
    (path) => ({
      url: `${site.domain}${path}`,
      lastModified: new Date(),
    }),
  );

  const collections = [
    ["projects", getPosts("projects")],
    ["reads", getPosts("reads")],
    ["thoughts", getPosts("thoughts")],
    ["articles", getPosts("articles")],
  ] as const;

  const posts = collections.flatMap(([kind, items]) =>
    items.map((post) => ({
      url: `${site.domain}/${kind}/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    })),
  );

  const series = [...getSeries("thoughts"), ...getSeries("articles")].map((item) => ({
    url: `${site.domain}${hrefForSeries(item)}`,
    lastModified: item.date ? new Date(item.date) : new Date(),
  }));

  return [...staticRoutes, ...posts, ...series];
}
