import { marqueeItems } from "@/lib/site";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="overflow-hidden border-y border-line bg-canvas-2 py-4">
      <div className="marquee-track flex w-max gap-10 pr-10">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="whitespace-nowrap text-sm uppercase tracking-[0.22em] text-cream/70"
          >
            {item}
            <span className="ml-10 text-gold">★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
