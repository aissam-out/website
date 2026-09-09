import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">404</p>
      <h1 className="mt-4 font-display text-5xl italic text-cream">
        This page is <em className="gold-em not-italic">noise</em>
      </h1>
      <p className="mt-4 text-muted">The URL does not resolve to anything I published.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back home</ButtonLink>
      </div>
    </div>
  );
}
