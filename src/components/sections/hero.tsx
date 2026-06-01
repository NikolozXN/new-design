"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Counter } from "@/components/ui/counter";
import { CanvasGradient } from "@/components/ui/canvas-gradient";
import { KineticHeading } from "@/components/ui/kinetic-heading";
import { DashboardMock } from "@/components/ui/dashboard-mock";
import { EASE } from "@/lib/motion";

const STATS = [
  { value: 12000, suffix: "+", label: "Active teams" },
  { value: 2.4, suffix: "M", label: "Tasks shipped", decimals: 1 },
  { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
  { value: 4.9, suffix: "/5", label: "Avg. rating", decimals: 1 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [24, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-32 pb-24 sm:pt-40"
    >
      {/* Interactive gradient canvas */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <CanvasGradient className="opacity-80 dark:opacity-90" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.04] mix-blend-overlay" />

      <Container>
        <motion.div style={reduce ? undefined : { y: textY }}>
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex justify-center"
          >
            <a
              href="#features"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 py-1.5 pl-2 pr-4 text-sm backdrop-blur transition-colors hover:border-foreground/30"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-ink">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-ink" />
                v3.0
              </span>
              <span className="text-muted">AI sprint planning is here</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* Kinetic editorial headline */}
          <KineticHeading
            className="mx-auto mt-8 max-w-5xl text-balance text-center text-[2.6rem] font-bold leading-[0.98] tracking-tight sm:text-7xl sm:leading-[0.95] md:text-8xl"
            lines={[
              [{ text: "Project" }, { text: "management" }],
              [{ text: "that" }, { text: "actually" }, { text: "flows", accent: true }],
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
            className="mx-auto mt-7 max-w-xl text-center text-lg leading-relaxed text-muted sm:text-xl"
          >
            Plan sprints, track work, and automate the busywork — all in one
            workspace your team will actually love opening.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button href="#pricing" size="lg" className="w-full sm:w-auto">
                Start free trial
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Button
              href="#how-it-works"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <PlayCircle className="h-4 w-4" />
              Watch the film
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating, scroll-tilting mockup */}
        <div className="perspective mx-auto mt-20 max-w-5xl">
          <motion.div
            style={
              reduce
                ? undefined
                : { rotateX, scale, y, transformStyle: "preserve-3d" }
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <div className="relative animate-float">
              <div className="absolute -inset-x-12 -top-12 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-b from-primary/30 via-accent/10 to-transparent blur-3xl" />
              <DashboardMock />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
