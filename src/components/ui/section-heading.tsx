"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { revealUp } from "@/lib/motion";
import { StaggerReveal } from "@/components/ui/scroll-reveal";
import { Scramble } from "@/components/ui/scramble";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <StaggerReveal stagger={0.12} className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <motion.span
          variants={revealUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
          <Scramble text={eyebrow} />
        </motion.span>
      )}
      <motion.h2
        variants={revealUp}
        className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={revealUp}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </StaggerReveal>
  );
}
