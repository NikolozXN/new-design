"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { CanvasGradient } from "@/components/ui/canvas-gradient";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** Top-of-page hero for inner content pages — matches the landing hero's feel. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      {/* Interactive gradient canvas (same as the landing hero) */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <CanvasGradient className="opacity-70 dark:opacity-80" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay" />

      <Container>
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          {eyebrow && (
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={fadeUp}
            className="mt-6 text-balance font-display text-[2.75rem] font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              {subtitle}
            </motion.p>
          )}
          {children && (
            <motion.div variants={fadeUp} className="mt-9">
              {children}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
