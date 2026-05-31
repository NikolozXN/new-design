import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Size = "sm" | "md" | "lg";

const tile: Record<Size, string> = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-13 w-13 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl",
};
const glyph: Record<Size, string> = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-7 w-7",
};

/**
 * Premium icon "chip": gradient fill, inset ring, soft glow, subtle grain, and
 * a glyph that lifts/rotates on hover (when placed inside a `group`).
 */
export function IconTile({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10",
        "text-primary ring-1 ring-inset ring-primary/25",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]",
        "transition-all duration-300 group-hover:ring-primary/50",
        tile[size],
        className
      )}
    >
      {/* glow */}
      <span className="pointer-events-none absolute -inset-2 bg-primary/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70" />
      {/* grain */}
      <span className="grain pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      <Icon
        className={cn(
          "relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110",
          glyph[size]
        )}
        strokeWidth={2}
      />
    </span>
  );
}
