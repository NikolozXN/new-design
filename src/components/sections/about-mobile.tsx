"use client";

import { type ComponentType, type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Counter } from "@/components/ui/counter";
import {
  HorizontalReveal,
  ScrollReveal,
  ScrollRevealOnce,
} from "@/components/ui/scroll-reveal";
import { revealIn, revealUp } from "@/lib/motion";

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

type Milestone = {
  year: string;
  title: string;
  body: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** Simple vertical reveal wrapper — used by founder note on About. */
export function MobileRevealBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal variants={revealIn} className={className}>
      {children}
    </ScrollReveal>
  );
}

/* ── Values: stacked cards with scroll reveal ─────────────────────────── */

export function ValuesMobileList({ values }: { values: Value[] }) {
  return (
    <div className="space-y-5 px-6 pb-16 lg:hidden">
      {values.map((v, i) => {
        const Icon = v.icon;
        const displayTitle = v.headline ?? v.title;
        return (
          <ScrollReveal key={v.title} variants={revealIn} custom={i}>
            <article
              className="relative overflow-hidden rounded-[1.5rem] border border-border bg-surface p-6 shadow-lg shadow-black/5 dark:shadow-black/25"
              style={{ boxShadow: `0 20px 40px -24px ${v.tint}55` }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ background: `linear-gradient(145deg, ${v.tint}14, transparent 55%)` }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-bold leading-none text-foreground/[0.05]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {v.kicker ? (
                <span
                  className="relative mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: v.tint }}
                >
                  {v.kicker}
                </span>
              ) : null}
              <span
                className="relative grid h-12 w-12 place-items-center rounded-xl text-white"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 55%, #000))`,
                }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                {displayTitle}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}

/* ── Stats: horizontal snap rail ─────────────────────────────────────── */

function StatCard({ s }: { s: Stat }) {
  return (
    <div className="w-[76vw] max-w-xs shrink-0 rounded-[1.5rem] border border-border bg-surface p-7 shadow-lg shadow-black/5 dark:shadow-black/25">
      <div className="font-display text-5xl font-bold tracking-tight text-foreground">
        {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
      </div>
      <div className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {s.label}
      </div>
    </div>
  );
}

export function StatsMobileRail({ stats }: { stats: Stat[] }) {
  return (
    <Container className="py-14 md:hidden">
      <ScrollReveal variants={revealUp}>
        <p className="mb-6 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          By the numbers · swipe →
        </p>
      </ScrollReveal>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stats.map((s, i) => (
          <HorizontalReveal key={s.label} custom={i} className="snap-center shrink-0">
            <StatCard s={s} />
          </HorizontalReveal>
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
  return (
    <div className="space-y-5 px-6 pb-4 md:hidden">
      <ScrollReveal variants={revealIn}>
        <div className="rounded-[1.5rem] border border-border bg-surface p-7 shadow-lg shadow-black/5 dark:shadow-black/30">
          <span className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </span>
          <span className="mb-4 block h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent" />
          <h2 className="text-balance font-display text-[1.75rem] font-bold leading-[1.08] tracking-tight text-foreground">
            {headline} <span className="text-gradient-brand">{highlight}</span>
          </h2>
        </div>
      </ScrollReveal>

      {paragraphs.map((text, i) => (
        <ScrollReveal key={i} variants={revealIn} custom={i}>
          <div className="relative rounded-2xl border border-border bg-surface-2/50 p-5">
            <span className="font-mono text-xs font-semibold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-base leading-relaxed text-muted">{text}</p>
            <span className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-primary to-accent" />
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

/* ── Team filmstrip ──────────────────────────────────────────────────── */

function TeamCard({ m, i }: { m: TeamMember; i: number }) {
  return (
    <div className="w-[70vw] max-w-[16rem] shrink-0">
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
          className="absolute inset-0 h-full w-full object-cover grayscale-[25%]"
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
  return (
    <div className="pb-8 md:hidden">
      <Container>
        <SectionHeading
          eyebrow="The team"
          title="Meet the Flowlians"
          subtitle="Swipe through the people behind Flowly."
        />
      </Container>
      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {team.map((m, i) => (
          <HorizontalReveal key={m.name} custom={i} className="snap-center shrink-0">
            <TeamCard m={m} i={i} />
          </HorizontalReveal>
        ))}
      </div>
    </div>
  );
}

/* ── Milestones: vertical timeline with reveals ──────────────────────── */

function MilestoneRow({ m, i }: { m: Milestone; i: number }) {
  return (
    <ScrollReveal variants={revealIn} custom={i} className="relative pl-12">
      <span className="absolute left-[0.65rem] top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent shadow-[0_0_10px_var(--primary)]" />
      <span className="block font-display text-4xl font-bold leading-none tracking-tight text-gradient-brand">
        {m.year}
      </span>
      <div className="mt-3 rounded-xl border border-border bg-surface p-5 shadow-md shadow-black/5 dark:shadow-black/25">
        <h3 className="font-display text-lg font-semibold text-foreground">{m.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
      </div>
    </ScrollReveal>
  );
}

export function MilestonesMobileTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <section className="relative py-16 md:hidden">
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
        <div className="relative mx-auto mt-10 max-w-xl">
          <ScrollRevealOnce
            from={{ scaleY: 0 }}
            to={{ scaleY: 1 }}
            className="absolute left-[0.65rem] top-0 h-full w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary to-accent"
          />
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <MilestoneRow key={m.year} m={m} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
