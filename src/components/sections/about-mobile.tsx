"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";
import {
  ChromaticHeadline,
  ScrollMeshBackdrop,
  ScrollWordReveal,
  FilmPerforations,
  HoloSheen,
  OrbitRings,
} from "@/components/sections/about-fx";

type Value = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  tint: string;
  kicker?: string;
  headline?: string;
};

type Stat = {
  value: number;
  suffix?: string;
  label: string;
  plain?: string;
};

type TeamMember = {
  name: string;
  role: string;
  from: string;
  to: string;
  img: string;
};

type MissionMobileProps = {
  eyebrow: string;
  headline: string;
  highlight: string;
  paragraphs: string[];
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** Scroll-scrubbed block — each card animates as it enters the viewport (works on touch). */
export function MobileScrubBlock({
  children,
  className,
  tall = true,
}: {
  children: ReactNode;
  className?: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.38"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const opacity = useTransform(smooth, [0, 0.45, 1], [0.08, 1, 1]);
  const y = useTransform(smooth, [0, 0.55], [80, 0]);
  const scale = useTransform(smooth, [0, 0.55], [0.9, 1]);
  const rotate = useTransform(smooth, [0, 0.55], [4, 0]);

  if (reduce) {
    return (
      <div ref={ref} className={cn(tall && "min-h-[50dvh] py-10", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center py-8",
        tall && "min-h-[68dvh] snap-start snap-always",
        className
      )}
    >
      <motion.div style={{ opacity, y, scale, rotate }} className="w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

function useChapterIndex(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.45) {
            const idx = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(idx)) setActive(idx);
          }
        });
      },
      { threshold: [0.45, 0.6, 0.75], rootMargin: "-20% 0px -25% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [count]);

  return { active, refs };
}

/* ── Values: full-screen cinematic chapters ───────────────────────────── */

function ValueMobileChapter({
  v,
  index,
  setRef,
}: {
  v: Value;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const Icon = v.icon;
  const displayTitle = v.headline ?? v.title;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
  const iconScale = useTransform(smooth, [0, 0.5], [0.35, 1]);
  const iconRotate = useTransform(smooth, [0, 0.5], [-22, 0]);
  const titleX = useTransform(smooth, [0.05, 0.55], [-56, 0]);
  const bodyY = useTransform(smooth, [0.15, 0.65], [36, 0]);
  const bodyOpacity = useTransform(smooth, [0.15, 0.55], [0, 1]);
  const numScale = useTransform(smooth, [0, 0.5], [1.35, 1]);
  const numX = useTransform(smooth, [0, 0.6], [24, -8]);
  const kickerOpacity = useTransform(smooth, [0, 0.35], [0, 1]);
  const ringRotate = useTransform(smooth, [0, 1], [0, 120]);

  useEffect(() => {
    setRef(ref.current);
  }, [setRef]);

  return (
    <div
      ref={ref}
      data-index={index}
      className="relative flex min-h-[100dvh] snap-start snap-always flex-col justify-end overflow-hidden px-6 pb-16 pt-28"
    >
      <ScrollMeshBackdrop tint={v.tint} progress={smooth} />

      <OrbitRings
        className="left-1/2 top-[22%] h-[min(72vw,22rem)] w-[min(72vw,22rem)] -translate-x-1/2 opacity-30"
        rotate={reduce ? undefined : ringRotate}
        rings={3}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-10 font-display text-[9rem] font-bold leading-none tracking-tighter"
        style={{ color: `${v.tint}16` }}
      >
        <motion.span
          style={reduce ? undefined : { scale: numScale, x: numX }}
          className="inline-block"
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </span>

      {v.kicker ? (
        <motion.span
          style={reduce ? { color: v.tint } : { opacity: kickerOpacity, color: v.tint }}
          className="relative mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em]"
        >
          {v.kicker}
        </motion.span>
      ) : null}

      <motion.div
        style={
          reduce
            ? {
                backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 50%, #000))`,
                boxShadow: `0 20px 40px -16px ${v.tint}`,
              }
            : {
                scale: iconScale,
                rotate: iconRotate,
                transformOrigin: "left bottom",
                backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 50%, #000))`,
                boxShadow: `0 20px 40px -16px ${v.tint}`,
              }
        }
        className="relative mb-8 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-2xl"
      >
        <Icon className="h-7 w-7" />
      </motion.div>

      <motion.div style={reduce ? undefined : { x: titleX }} className="relative">
        {reduce ? (
          <h3 className="font-display text-[2.15rem] font-bold leading-[1.02] tracking-tight text-foreground">
            {displayTitle}
          </h3>
        ) : (
          <ChromaticHeadline
            progress={smooth}
            className="font-display text-[2.15rem] font-bold leading-[1.02] tracking-tight text-foreground"
          >
            {displayTitle}
          </ChromaticHeadline>
        )}
      </motion.div>
      <motion.p
        style={reduce ? undefined : { y: bodyY, opacity: bodyOpacity }}
        className="relative mt-4 max-w-md text-base leading-relaxed text-muted"
      >
        {v.body}
      </motion.p>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background via-background/80 to-transparent"
      />
    </div>
  );
}

export function ValuesMobileCinema({ values }: { values: Value[] }) {
  const { active, refs } = useChapterIndex(values.length);
  const activeValue = values[active];

  return (
    <div className="relative lg:hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={activeValue?.tint ?? "bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 90% 50% at 50% 0%, ${activeValue?.tint ?? "#7c3aed"}18, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      <div className="sticky top-[4.75rem] z-30 border-b border-border/50 bg-background/85 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            {activeValue?.kicker ?? `Belief ${String(active + 1).padStart(2, "0")}`}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
            Keep scrolling
            <ArrowRight className="h-3.5 w-3.5 rotate-90 animate-pulse text-accent" />
          </span>
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="font-mono text-[10px] tabular-nums text-muted">
            {String(active + 1).padStart(2, "0")}/{String(values.length).padStart(2, "0")}
          </span>
          <div className="flex flex-1 gap-1">
            {values.map((v, i) => (
              <motion.span
                key={v.title}
                animate={{
                  width: i === active ? 32 : 8,
                  backgroundColor: i === active ? v.tint : undefined,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={cn("h-1 rounded-full", i !== active && "bg-border")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="snap-y snap-proximity">
        {values.map((v, i) => (
          <ValueMobileChapter
            key={v.title}
            v={v}
            index={i}
            setRef={(el) => {
              refs.current[i] = el;
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Stats: horizontal snap rail ─────────────────────────────────────── */

function StatSnapCard({ s, i }: { s: Stat; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.55"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.78, 1]), {
    stiffness: 120,
    damping: 22,
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -4 : 4, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, rotate, y }}
      className="relative snap-center w-[78vw] max-w-xs shrink-0 overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-xl shadow-black/5 dark:shadow-black/25"
    >
      {!reduce && <HoloSheen progress={scrollYProgress} />}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="font-display text-5xl font-bold tracking-tight text-foreground">
        {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
      </div>
      <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {s.label}
      </div>
    </motion.div>
  );
}

export function StatsMobileRail({ stats }: { stats: Stat[] }) {
  return (
    <Container className="py-14 md:hidden">
      <p className="mb-2 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        At a glance
      </p>
      <p className="mb-6 text-center text-sm text-muted">Swipe the numbers →</p>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stats.map((s, i) => (
          <StatSnapCard key={s.label} s={s} i={i} />
        ))}
      </div>
    </Container>
  );
}

/* ── Mission: editorial scrub blocks ─────────────────────────────────── */

export function MissionMobileEditorial({ eyebrow, headline, highlight, paragraphs }: MissionMobileProps) {
  return (
    <div className="overflow-hidden md:hidden">
      <MobileScrubBlock className="px-6" tall={false}>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-surface p-8 shadow-2xl shadow-black/5 dark:shadow-black/30">
          <span className="mb-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
          <span className="mb-5 block h-1 w-14 rounded-full bg-gradient-to-r from-primary to-accent" />
          <h2 className="text-balance font-display text-[2rem] font-bold leading-[1.06] tracking-tight text-foreground">
            {headline}{" "}
            <span className="text-gradient-brand">{highlight}</span>
          </h2>
        </div>
      </MobileScrubBlock>

      {paragraphs.map((text, i) => (
        <MobileScrubBlock key={i} className="px-6">
          <div className="relative rounded-2xl border border-border/80 bg-surface-2/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ScrollWordReveal
              text={text}
              className="mt-3 text-lg leading-relaxed"
            />
            <span className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
          </div>
        </MobileScrubBlock>
      ))}
    </div>
  );
}

/* ── Team: horizontal film strip ─────────────────────────────────────── */

function TeamSnapCard({ m, i }: { m: TeamMember; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.6"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.86, 1]), {
    stiffness: 110,
    damping: 24,
  });
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -2 : 2, 0]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, y, rotate }}
      className="relative snap-center w-[72vw] max-w-[17rem] shrink-0"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-border">
        {!reduce && <HoloSheen progress={scrollYProgress} />}
        <span
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white"
          style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
        >
          {initials(m.name)}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={m.img}
          alt={m.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 h-full w-full object-cover grayscale-[30%]"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-display text-lg font-semibold text-white">{m.name}</div>
          <div className="mt-0.5 text-sm text-white/75">{m.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TeamMobileFilmstrip({ team }: { team: TeamMember[] }) {
  return (
    <div className="pb-8 md:hidden">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="Meet the Flowlians"
          subtitle="Six senior builders from Linear, Notion, Stripe, and Figma — swipe through the people behind the product."
        />
      </Container>
      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {team.map((m, i) => (
          <TeamSnapCard key={m.name} m={m} i={i} />
        ))}
      </div>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Swipe to meet everyone →
      </p>
    </div>
  );
}

/* ── Milestones: horizontal film tape ──────────────────────────────────── */

type Milestone = {
  year: string;
  title: string;
  body: string;
};

function MilestoneTapeCard({ m, i }: { m: Milestone; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.55"],
  });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.84, 1]), {
    stiffness: 110,
    damping: 22,
  });
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const yearScale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, y }}
      className="relative snap-center w-[82vw] max-w-sm shrink-0"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-2xl shadow-black/10 dark:shadow-black/35">
        <FilmPerforations />
        {!reduce && <HoloSheen progress={scrollYProgress} />}
        <div className="px-6 pb-6 pt-8">
          <motion.span
            style={reduce ? undefined : { scale: yearScale }}
            className="block font-display text-6xl font-bold leading-none tracking-tight text-gradient-brand"
          >
            {m.year}
          </motion.span>
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{m.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
          <span className="mt-5 inline-flex font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Stop {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function MilestonesMobileTape({ milestones }: { milestones: Milestone[] }) {
  return (
    <section className="relative py-16 md:hidden">
      <Container>
        <SectionHeading
          eyebrow="The journey"
          title="Five years, five chapters"
          subtitle="Swipe the timeline like film — each card is a moment that shaped Flowly."
        />
      </Container>
      <div className="relative mt-10">
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 right-6 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent"
        />
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {milestones.map((m, i) => (
            <MilestoneTapeCard key={m.year} m={m} i={i} />
          ))}
        </div>
      </div>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        Swipe through our story →
      </p>
    </section>
  );
}
