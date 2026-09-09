import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  EngineeringTimeline,
  HumanSyntheticChart,
  MetricHero,
  ScriptGapChart,
  TopicPerformanceChart,
  TrainingCurves,
} from "@/components/charts";

const components = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
    />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { alt = "", src, ...rest } = props;
    if (!src || typeof src !== "string") return null;
    return (
      // Local media from /public; dimensions unknown at import time
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...rest}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-auto w-full max-w-full rounded-2xl border border-line"
      />
    );
  },
  MetricHero,
  ScriptGapChart,
  TopicPerformanceChart,
  HumanSyntheticChart,
  EngineeringTimeline,
  TrainingCurves,
};

export function PostBody({ source }: { source: string }) {
  return (
    <div className="post-body">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: {
                    light: "github-light",
                    dark: "github-dark",
                  },
                  keepBackground: false,
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
