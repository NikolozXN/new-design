import Link from "next/link";
import { cn } from "@/lib/utils";

/** Flowly wordmark + glyph. Swap the SVG path / text to rebrand. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md shadow-primary/30">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M5 7.5c0-1.1.9-2 2-2h10a2 2 0 0 1 0 4H9a2 2 0 0 0 0 4h6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="6" cy="16.5" r="1.8" fill="currentColor" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Flowly
      </span>
    </Link>
  );
}
