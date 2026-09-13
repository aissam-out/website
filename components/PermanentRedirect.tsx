"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Client + meta refresh redirect for static export (no next.config redirects). */
export function PermanentRedirect({ href }: { href: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(href);
  }, [href, router]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center md:px-8">
      <p className="text-muted">
        This page moved to{" "}
        <a href={href} className="text-gold hover:underline">
          {href}
        </a>
        .
      </p>
    </div>
  );
}
