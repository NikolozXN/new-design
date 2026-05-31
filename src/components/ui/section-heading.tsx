"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";
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
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={cn("mx-auto max-w-2xl text-center", className)}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
          <Scramble text={eyebrow} />
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="mt-5 text-balance font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
