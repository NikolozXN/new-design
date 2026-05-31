"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";

/** Top-of-page header for inner content pages (clears the fixed navbar). */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
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
            className="mt-5 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
