"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Card with a radial "spotlight" glow that follows the cursor, plus an
 * always-on subtle border highlight. Pure CSS mask — cheap and smooth.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const bg = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--primary) 18%, transparent), transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-card border border-border bg-surface transition-colors duration-300 hover:border-primary/40",
        className
      )}
    >
      <motion.div
        aria-hidden
        style={{ background: bg }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
