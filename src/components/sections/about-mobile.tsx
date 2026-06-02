"use client";

import { useRef, type ComponentType, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import { cn } from "@/lib/utils";
import {
  useTouchScrollProgress,
  useTouchSectionProgress,
  useHorizontalScrub,
  stepOpacity,
  stepY,
  stepScale,
} from "@/hooks/use-touch-scroll";

type Value = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
  tint: string;
  kicker?: string;
  headline?: string;
};

type Stat = { value: number; suffix?: string; label: string; plain?: string };

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

type Milestone = { year: string; title: string; body: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/* ── Scroll-scrub block (vertical) ───────────────────────────────────── */

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
  const progress = useTouchScrollProgress(ref, { enter: 0.94, exit: 0.42 });
  const opacity = useTransform(progress, [0, 0.35, 1], [0.45, 1, 1]);
  const y = useTransform(progress, [0, 0.55], [56, 0]);
  const scale = useTransform(progress, [0, 0.55], [0.91, 1]);
  const rotate = useTransform(progress, [0, 0.55], [3, 0]);

  if (reduce) {
    return (
      <div ref={ref} className={cn(tall && "py-10", className)}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("py-8", tall && "min-h-[55dvh]", className)}>
      <motion.div style={{ opacity, y, scale, rotate }} className="w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/* ── Values: pinned scroll-scrub crossfade ─────────────────────────────── */

function ValueScrollPanel({
  v,
  index,
  total,
  progress,
}: {
  v: Value;
  index: number;
  total: number;
  progress: ReturnType<typeof useTouchSectionProgress>["progress"];
}) {
  const Icon = v.icon;
  const displayTitle = v.headline ?? v.title;
  const opacity = stepOpacity(progress, index, total);
  const y = stepY(progress, index, total);
  const scale = stepScale(progress, index, total);
  const iconRotate = useTransform(progress, [index / total, (index + 0.5) / total], [-12, 0]);

  return (
    <motion.article
      style={{ opacity, y, scale }}
      className="absolute inset-0 will-change-transform"
      aria-hidden={index !== 0}
    >
      <div
        className="relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-border bg-surface p-7 shadow-2xl shadow-black/10 dark:shadow-black/35"
        style={{ boxShadow: `0 28px 56px -28px ${v.tint}66` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `linear-gradient(155deg, ${v.tint}22, transparent 58%)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-2 top-2 font-display text-[5.5rem] font-bold leading-none tracking-tighter"
          style={{ color: `${v.tint}18` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {v.kicker ? (
          <span
            className="relative mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: v.tint }}
          >
            {v.kicker}
          </span>
        ) : null}
        <motion.span style={{ rotate: iconRotate }} className="relative grid h-14 w-14 place-items-center rounded-2xl text-white">
          <span
            className="grid h-full w-full place-items-center rounded-2xl"
            style={{
              backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 50%, #000))`,
              boxShadow: `0 16px 32px -14px ${v.tint}`,
            }}
          >
            <Icon className="h-6 w-6" />
          </span>
        </motion.span>
        <h3 className="relative mt-5 font-display text-2xl font-bold tracking-tight text-foreground">
          {displayTitle}
        </h3>
        <p className="relative mt-3 text-base leading-relaxed text-muted">{v.body}</p>
      </div>
    </motion.article>
  );
}

export function ValuesMobileScroll({ values }: { values: Value[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { progress, active } = useTouchSectionProgress(sectionRef, values.length);
  const activeValue = values[active];
  const sectionHeight = `calc(${values.length * 52 + 40}dvh)`;

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative lg:hidden">
      <div className="sticky top-[4.5rem] z-30 border-b border-border/60 bg-background/90 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            {activeValue?.kicker ?? `Value ${String(active + 1).padStart(2, "0")}`}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted">
            Scroll
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
                animate={{ width: i === active ? 28 : 8, backgroundColor: i === active ? v.tint : undefined }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn("h-1 rounded-full", i !== active && "bg-border")}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-[7.75rem] flex h-[calc(100dvh-7.75rem)] items-center px-6 pb-10">
        <div className="relative mx-auto w-full max-w-lg min-h-[22rem]">
          {values.map((v, i) => (
            <ValueScrollPanel key={v.title} v={v} index={i} total={values.length} progress={progress} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Horizontal scrub card ───────────────────────────────────────────── */

function HorizontalScrubCard({
  children,
  railRef,
  className,
}: {
  children: ReactNode;
  railRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const scrub = useHorizontalScrub(cardRef, railRef);
  const scale = useTransform(scrub, [0, 1], [0.84, 1]);
  const opacity = useTransform(scrub, [0, 0.4, 1], [0.5, 1, 1]);
  const y = useTransform(scrub, [0, 1], [28, 0]);
  const rotate = useTransform(scrub, [0, 1], [-5, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={reduce ? undefined : { scale, opacity, y, rotate }}
      className={cn("snap-center shrink-0 will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

/* ── Stats rail ──────────────────────────────────────────────────────── */

export function StatsMobileRail({ stats }: { stats: Stat[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <Container className="py-14 md:hidden">
      <MobileScrubBlock tall={false} className="mb-2">
        <p className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          By the numbers · swipe to scrub →
        </p>
      </MobileScrubBlock>
      <div
        ref={railRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stats.map((s) => (
          <HorizontalScrubCard key={s.label} railRef={railRef}>
            <div className="w-[76vw] max-w-xs rounded-[1.5rem] border border-border bg-surface p-7 shadow-xl shadow-black/5 dark:shadow-black/25">
              <div className="font-display text-5xl font-bold tracking-tight text-foreground">
                {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                {s.label}
              </div>
            </div>
          </HorizontalScrubCard>
        ))}
      </div>
    </Container>
  );
}

/* ── Mission ─────────────────────────────────────────────────────────── */

export function MissionMobileEditorial({
  eyebrow,
  headline,
  highlight,
  paragraphs,
}: MissionMobileProps) {
  const headRef = useRef<HTMLDivElement>(null);
  const headProgress = useTouchScrollProgress(headRef, { enter: 0.9, exit: 0.5 });
  const headY = useTransform(headProgress, [0, 1], [48, 0]);
  const headScale = useTransform(headProgress, [0, 1], [0.92, 1]);
  const lineW = useTransform(headProgress, [0.2, 1], [0, 1]);

  return (
    <div className="overflow-hidden pb-4 md:hidden">
      <div ref={headRef} className="px-6 py-8">
        <motion.div style={{ y: headY, scale: headScale }} className="will-change-transform">
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface p-7 shadow-xl shadow-black/5 dark:shadow-black/30">
            <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              {eyebrow}
            </span>
            <motion.span
              style={{ scaleX: lineW }}
              className="mb-5 block h-1 w-full max-w-[5rem] origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
            <h2 className="text-balance font-display text-[1.85rem] font-bold leading-[1.06] tracking-tight text-foreground">
              {headline} <span className="text-gradient-brand">{highlight}</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {paragraphs.map((text, i) => (
        <ParagraphScrub key={i} index={i} text={text} />
      ))}
    </div>
  );
}

function ParagraphScrub({ text, index }: { text: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useTouchScrollProgress(ref, { enter: 0.93, exit: 0.4 });
  const opacity = useTransform(progress, [0, 0.4, 1], [0.4, 1, 1]);
  const x = useTransform(progress, [0, 0.55], [index % 2 === 0 ? -40 : 40, 0]);
  const barH = useTransform(progress, [0, 0.7], [0, 1]);

  return (
    <div ref={ref} className="min-h-[42dvh] px-6 py-6">
      <motion.div style={{ opacity, x }} className="relative rounded-2xl border border-border bg-surface-2/50 p-6 will-change-transform">
        <span className="font-mono text-xs font-semibold text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="mt-3 text-lg leading-relaxed text-muted">{text}</p>
        <motion.span
          style={{ scaleY: barH }}
          className="absolute bottom-0 left-0 top-0 w-1 origin-top rounded-full bg-gradient-to-b from-primary to-accent"
        />
      </motion.div>
    </div>
  );
}

/* ── Team filmstrip ──────────────────────────────────────────────────── */

function TeamCard({ m, i }: { m: TeamMember; i: number }) {
  return (
    <div className="w-[70vw] max-w-[16rem]">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-xl ring-1 ring-border">
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
          className="absolute inset-0 h-full w-full object-cover grayscale-[20%]"
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
    </div>
  );
}

export function TeamMobileFilmstrip({ team }: { team: TeamMember[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  return (
    <div className="pb-8 md:hidden">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="Meet the Flowlians"
          subtitle="Swipe — cards scale and lift as they hit center."
        />
      </Container>
      <div
        ref={railRef}
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {team.map((m, i) => (
          <HorizontalScrubCard key={m.name} railRef={railRef}>
            <TeamCard m={m} i={i} />
          </HorizontalScrubCard>
        ))}
      </div>
    </div>
  );
}

/* ── Milestones: scroll-scrub timeline ───────────────────────────────── */

function MilestoneScrubRow({ m, i }: { m: Milestone; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useTouchScrollProgress(ref, { enter: 0.92, exit: 0.45 });
  const opacity = useTransform(progress, [0, 0.45, 1], [0.4, 1, 1]);
  const x = useTransform(progress, [0, 0.55], [i % 2 === 0 ? -48 : 48, 0]);
  const yearScale = useTransform(progress, [0, 0.55], [0.82, 1]);
  const dotScale = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-[38dvh] pl-12">
      <motion.span
        style={{ scale: dotScale }}
        className="absolute left-[0.65rem] top-8 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_var(--primary)]"
      />
      <motion.div style={{ opacity, x }} className="will-change-transform">
        <motion.span
          style={{ scale: yearScale }}
          className="inline-block font-display text-5xl font-bold leading-none tracking-tight text-gradient-brand"
        >
          {m.year}
        </motion.span>
        <div className="mt-3 rounded-xl border border-border bg-surface p-5 shadow-lg shadow-black/5 dark:shadow-black/25">
          <h3 className="font-display text-lg font-semibold text-foreground">{m.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function MilestonesMobileTimeline({ milestones }: { milestones: Milestone[] }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineProgress = useTouchScrollProgress(lineRef, { enter: 0.95, exit: 0.15 });

  return (
    <section className="relative py-16 md:hidden">
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
      </Container>
      <div ref={lineRef} className="relative mx-auto mt-10 max-w-xl px-6">
        <motion.span
          style={{ scaleY: lineProgress }}
          className="absolute left-[1.4rem] top-0 h-full w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary to-accent shadow-[0_0_10px_var(--primary)]"
        />
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <MilestoneScrubRow key={m.year} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Founder note wrapper */
export function MobileRevealBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <MobileScrubBlock tall={false} className={className}>
      {children}
    </MobileScrubBlock>
  );
}
