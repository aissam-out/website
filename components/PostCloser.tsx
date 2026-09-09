import Link from "next/link";
import { PostDate } from "@/components/PostDate";
import { hrefForPost, type Post } from "@/lib/content";

function EndMark() {
  return (
    <div className="flex flex-col items-center gap-4" aria-hidden>
      <div className="flex items-center gap-3 text-gold/70">
        <span className="h-px w-10 bg-line" />
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="text-gold"
        >
          <path
            d="M9 1.5L10.2 7.8L16.5 9L10.2 10.2L9 16.5L7.8 10.2L1.5 9L7.8 7.8L9 1.5Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        <span className="h-px w-10 bg-line" />
      </div>
      <p className="font-display text-lg italic text-muted">End of note</p>
    </div>
  );
}

export function PostCloser({
  post,
  related,
  backHref,
  backLabel,
}: {
  post: Post;
  related: Post[];
  backHref: string;
  backLabel: string;
}) {
  return (
    <footer className="mt-16 border-t border-line pt-12">
      <EndMark />

      {related.length > 0 ? (
        <section className="mt-14" aria-labelledby="continue-reading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                Continue reading
              </p>
              <h2
                id="continue-reading"
                className="mt-2 font-display text-3xl italic text-cream"
              >
                Read next
              </h2>
            </div>
            <Link
              href={backHref}
              className="hidden text-sm text-muted transition hover:text-gold sm:inline"
            >
              All {backLabel.toLowerCase()} →
            </Link>
          </div>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <li key={`${item.kind}-${item.slug}`}>
                <Link
                  href={hrefForPost(item)}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-canvas-2 p-5 transition hover:border-gold/45"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                      {item.category ?? item.kind}
                    </p>
                    {item.date ? (
                      <PostDate date={item.date} variant="inline" />
                    ) : null}
                  </div>
                  <p className="mt-3 font-display text-xl italic leading-snug text-cream transition group-hover:text-gold">
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <Link href={backHref} className="text-sm text-gold hover:underline">
          ← Back to {backLabel.toLowerCase()}
        </Link>
        {post.tags && post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
