import type {
  AnchorHTMLAttributes,
  ImgHTMLAttributes,
  ReactNode,
} from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import {
  EngineeringTimeline,
  H100CriticalPath,
  H100ModelScheduling,
  H100OptimizationSurface,
  H100PipelineOverlap,
  H100TargetSchedule,
  HumanSyntheticChart,
  MetricHero,
  MlCourseCurriculum2026,
  MlCourseCurriculumList,
  MlCoursePath,
  MlCoursePerspectiveShift,
  ScriptGapChart,
  TopicPerformanceChart,
  TrainingCurves,
  TtsCheckpointStorage,
  TtsModelJourney,
} from "@/components/charts";
import { EmsiSlideGallery } from "@/components/EmsiSlideGallery";

function textFromChildren(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (typeof children === "object" && "props" in children) {
    return textFromChildren(
      (children as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}

function Caption({ children }: { children?: ReactNode }) {
  const text = textFromChildren(children).trim();
  const match = /^(Figure\s+\d+)\.\s*([\s\S]+)$/i.exec(text);

  return (
    <div className="post-caption" role="note">
      {match ? (
        <>
          <span className="post-caption__label">{match[1]}</span>
          <span className="post-caption__body">{match[2]}</span>
        </>
      ) : (
        <span className="post-caption__body">{children}</span>
      )}
    </div>
  );
}

const components = {
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
    >
      {children}
    </a>
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
  Caption,
  MetricHero,
  ScriptGapChart,
  TopicPerformanceChart,
  HumanSyntheticChart,
  EngineeringTimeline,
  TrainingCurves,
  H100CriticalPath,
  H100PipelineOverlap,
  H100TargetSchedule,
  H100ModelScheduling,
  H100OptimizationSurface,
  MlCoursePath,
  MlCoursePerspectiveShift,
  MlCourseCurriculumList,
  MlCourseCurriculum2026,
  TtsModelJourney,
  TtsCheckpointStorage,
  EmsiSlideGallery,
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
