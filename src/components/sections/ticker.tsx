import { Marquee } from "@/components/ui/marquee";

const WORDS = ["Plan", "Track", "Automate", "Collaborate", "Ship", "Repeat"];

/** Oversized kinetic typography ticker used as a section divider. */
export function Ticker() {
  return (
    <section
      aria-hidden
      className="relative border-y border-border bg-surface-2/40 py-7"
    >
      <Marquee className="items-center">
        {WORDS.map((w, i) => (
          <span key={w} className="flex items-center gap-8 pr-8">
            <span
              className={
                i % 2 === 0
                  ? "font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
                  : "font-display text-5xl font-bold tracking-tight text-outline-muted sm:text-7xl"
              }
            >
              {w}
            </span>
            <span className="text-3xl text-accent sm:text-4xl">✺</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
