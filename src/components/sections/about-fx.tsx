"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { CanvasGradient } from "@/components/ui/canvas-gradient";
import { KineticHeading } from "@/components/ui/kinetic-heading";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

/** Concentric orbit rings — decorative, scroll-parallax ready. */
export function OrbitRings({
  className,
  rotate,
  scale,
  rings = 3,
}: {
  className?: string;
  rotate?: MotionValue<number>;
  scale?: MotionValue<number>;
  rings?: number;
}) {
  return (
    <motion.div
      style={rotate || scale ? { rotate, scale } : undefined}
      className={cn("pointer-events-none absolute", className)}
      aria-hidden
    >
      {Array.from({ length: rings }).map((_, i) => (
        <span
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
          style={{
            width: `${(i + 1) * 34}%`,
            height: `${(i + 1) * 34}%`,
            animation: `spin ${18 + i * 6}s linear infinite ${i % 2 ? "reverse" : "normal"}`,
          }}
        />
      ))}
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_4px_var(--accent)]" />
    </motion.div>
  );
}

/** Scroll-scrubbed chromatic headline — RGB split tightens as you scroll in. */
export function ChromaticHeadline({
  children,
  progress,
  className,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const split = useTransform(progress, [0, 0.55], [5, 0]);
  const rX = useTransform(split, (v) => -v);
  const bX = useTransform(split, (v) => v);

  if (reduce) {
    return <h3 className={className}>{children}</h3>;
  }

  return (
    <motion.h3 className={cn("relative", className)}>
      <motion.span
        aria-hidden
        style={{ x: rX }}
        className="pointer-events-none absolute inset-0 text-[#ff4d6d]/55 mix-blend-screen"
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden
        style={{ x: bX }}
        className="pointer-events-none absolute inset-0 text-[#4dabff]/55 mix-blend-screen"
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </motion.h3>
  );
}

/** Morphing mesh backdrop driven by scroll + brand tint. */
export function ScrollMeshBackdrop({
  tint,
  progress,
  className,
}: {
  tint: string;
  progress: MotionValue<number>;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rot = useTransform(progress, [0, 1], [0, 38]);
  const s1 = useTransform(progress, [0, 0.5, 1], [0.65, 1.15, 0.9]);
  const s2 = useTransform(progress, [0, 0.5, 1], [1.1, 0.75, 1.05]);
  const y1 = useTransform(progress, [0, 1], [40, -30]);
  const y2 = useTransform(progress, [0, 1], [-20, 35]);

  if (reduce) {
    return (
      <span
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", className)}
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${tint}22, transparent)` }}
      />
    );
  }

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.span
        style={{ rotate: rot, scale: s1, y: y1, background: `${tint}40` }}
        className="absolute -left-1/4 top-[8%] h-[55%] w-[90%] rounded-full blur-[90px]"
      />
      <motion.span
        style={{ rotate: rot, scale: s2, y: y2, background: `${tint}28` }}
        className="absolute -right-1/4 top-[22%] h-[48%] w-[80%] rounded-full blur-[100px]"
      />
      <span
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%, ${tint}08 0deg, transparent 18deg, transparent 36deg)`,
        }}
      />
    </div>
  );
}

/** Each word brightens as scroll progress crosses it — editorial mission effect. */
export function ScrollWordReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.35"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const words = text.split(/\s+/);

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <WordSpan key={`${word}-${i}`} word={word} index={i} total={words.length} progress={smooth} />
      ))}
    </p>
  );
}

function WordSpan({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.22, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <motion.span
      style={{ opacity, y, scale }}
      className="mr-[0.28em] inline-block text-foreground will-change-transform"
    >
      {word}
    </motion.span>
  );
}

/** Film-strip perforation borders — top & bottom. */
export function FilmPerforations({ className }: { className?: string }) {
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-3 bg-[length:14px_100%] opacity-60",
          className
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 7px 50%, var(--foreground) 2px, transparent 2.5px)",
        }}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[length:14px_100%] opacity-60",
          className
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 7px 50%, var(--foreground) 2px, transparent 2.5px)",
        }}
      />
    </>
  );
}

/** Holographic shimmer overlay — intensifies on scroll. */
export function HoloSheen({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 0.45, 0.15]);
  const x = useTransform(progress, [0, 1], ["-30%", "130%"]);

  return (
    <motion.span
      aria-hidden
      style={{
        opacity,
        backgroundImage:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.55) 48%, rgba(200,255,77,0.35) 52%, transparent 65%)",
        x,
      }}
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
    />
  );
}

/** About-specific hero — orbital scene + kinetic type. */
export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  const chips = [
    { label: "12k+ teams", x: "12%", y: "28%" },
    { label: "60 countries", x: "78%", y: "32%" },
    { label: "Since 2021", x: "18%", y: "68%" },
    { label: "48 Flowlians", x: "72%", y: "64%" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <CanvasGradient className="opacity-75 dark:opacity-85" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-35 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,black,transparent)]" />
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay" />

      <OrbitRings
        className="inset-0 opacity-40 sm:opacity-55"
        rotate={reduce ? undefined : ringRotate}
        scale={reduce ? undefined : ringScale}
        rings={4}
      />

      {!reduce &&
        chips.map((c) => (
          <motion.span
            key={c.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + chips.indexOf(c) * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: c.x, top: c.y }}
            className="pointer-events-none absolute z-0 hidden rounded-full border border-border/80 bg-surface/70 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted backdrop-blur-md sm:block"
          >
            {c.label}
          </motion.span>
        ))}

      <Container>
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
            Our story
          </motion.span>

          <motion.div initial="hidden" animate="show">
            <KineticHeading
              lines={[
                [
                  { text: "The calm" },
                  { text: "operating", accent: true },
                ],
                [{ text: "system for" }, { text: "modern teams", accent: true }],
              ]}
              className="mt-6 text-[2.65rem] font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted"
          >
            Great teams were drowning in tools that created more work than they removed. Flowly is the
            one workspace we always wished existed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button href="/contact" size="lg">
                Join the team
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Button href="/#features" variant="secondary" size="lg">
              See the product
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-14 flex items-center justify-center gap-2 text-sm text-muted"
          >
            <span>Scroll to explore</span>
            <ArrowRight className="h-4 w-4 rotate-90 animate-pulse text-accent" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/** Page-wide scroll tint wash — subtle hue follows you down the About page. */
export function AboutScrollWash({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const hue = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [265, 200, 78, 286]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.12, 0.22, 0.18, 0.1]);
  const background = useMotionTemplate`radial-gradient(ellipse 90% 55% at 50% 20%, hsl(${hue} 80% 60% / 0.35), transparent 70%)`;

  return (
    <div ref={ref} className="relative">
      {!reduce && (
        <motion.div
          style={{ opacity, background }}
          className="pointer-events-none fixed inset-0 -z-30"
          aria-hidden
        />
      )}
      {children}
    </div>
  );
}
