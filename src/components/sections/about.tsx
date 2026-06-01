"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Zap,
  Globe,
  Compass,
  ArrowUpRight,
  ArrowRight,
  Quote,
  Plane,
  GraduationCap,
  BadgeDollarSign,
  HeartHandshake,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/ui/aurora";
import { Marquee } from "@/components/ui/marquee";
import { Scramble } from "@/components/ui/scramble";
import { EASE, fadeUp, inView, scaleUp, staggerContainer } from "@/lib/motion";

const BACKERS = ["Sequoia", "Accel", "Y Combinator", "Lightspeed", "First Round"];

const STATS = [
  { value: 2021, label: "Founded", plain: "2021" },
  { value: 12000, suffix: "+", label: "Teams onboard" },
  { value: 60, suffix: "+", label: "Countries" },
  { value: 48, label: "Flowlians" },
];

const MILESTONES = [
  { year: "2021", title: "Two builders, one frustration", body: "Sofia and Marcus leave their jobs running product and engineering to build the workspace they always wished they had." },
  { year: "2022", title: "First 1,000 teams", body: "Flowly launches publicly. Word spreads fast among design and engineering teams tired of tool sprawl." },
  { year: "2023", title: "Series A — $24M", body: "Led by Sequoia, with participation from Accel and a roster of operator angels, to grow the team and the platform." },
  { year: "2024", title: "Flowly AI ships", body: "AI sprint planning turns a sentence into a fully estimated, balanced plan — our fastest-adopted feature ever." },
  { year: "2026", title: "12,000+ teams, 60 countries", body: "Profitable, independent, and still obsessed with the same thing: giving teams their focus back." },
];

const VALUES = [
  { icon: Sparkles, title: "Craft over noise", body: "Every pixel and interaction earns its place. We sweat the details so your team feels calm, not cluttered." },
  { icon: ShieldCheck, title: "Trust by default", body: "Security and privacy aren't add-ons. We build for the strictest teams from day one — SOC 2, SSO, the works." },
  { icon: Zap, title: "Bias for momentum", body: "We ship small, ship often, and listen hard. Your feedback becomes product faster than anywhere you've worked." },
  { icon: Users, title: "Teams first", body: "Software for humans who work together. We design for the messy reality of real teams, not idealized org charts." },
  { icon: Globe, title: "Work in the open", body: "A public roadmap, a public changelog, and a community that shapes what we build next. No black boxes." },
  { icon: Compass, title: "Long-term thinking", body: "We're independent and profitable by design — so we can make the right call, not the quarterly one." },
];

const TEAM = [
  { name: "Sofia Chen", role: "Co-founder & CEO", from: "#7c3aed", to: "#a855f7" },
  { name: "Marcus Lee", role: "Co-founder & CTO", from: "#0ea5e9", to: "#22d3ee" },
  { name: "Priya Nair", role: "VP Product", from: "#f59e0b", to: "#f97316" },
  { name: "Diego Ortega", role: "Head of Design", from: "#10b981", to: "#34d399" },
  { name: "Elena Rossi", role: "VP Engineering", from: "#ec4899", to: "#f43f5e" },
  { name: "Jonas Weber", role: "Head of Growth", from: "#6366f1", to: "#818cf8" },
];

const PERKS = [
  { icon: Plane, title: "Remote-first", body: "Work from anywhere across 14 time zones." },
  { icon: BadgeDollarSign, title: "Meaningful equity", body: "Every Flowlian owns a real piece of the company." },
  { icon: GraduationCap, title: "$2k learning budget", body: "Books, courses, and conferences — on us." },
  { icon: HeartHandshake, title: "Health & wellness", body: "Top-tier coverage plus a monthly wellness stipend." },
];

const ROLES = [
  { title: "Senior Product Designer", team: "Design", location: "Remote" },
  { title: "Backend Engineer, Realtime", team: "Engineering", location: "SF / Remote" },
  { title: "Developer Advocate", team: "Growth", location: "Remote" },
  { title: "Customer Success Lead", team: "Success", location: "London" },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

/* ----- Milestones: horizontal scroll-pinned timeline (landing-grade) ----- */

function MilestoneIntro() {
  return (
    <div className="flex h-full w-[84vw] shrink-0 flex-col justify-center sm:w-[30rem]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
        <Scramble text="Milestones" />
      </span>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
        How we{" "}
        <span className="text-gradient-brand">got here</span>
      </h2>
      <p className="mt-5 max-w-sm text-lg text-muted">
        From two frustrated builders to 12,000+ teams. Scroll sideways to travel through the story.
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm text-muted">
        <span>Scroll</span>
        <ArrowRight className="h-4 w-4 animate-pulse text-accent" />
      </div>
    </div>
  );
}

function Station({
  m,
  i,
  n,
  progress,
}: {
  m: (typeof MILESTONES)[number];
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const above = i % 2 === 0;
  // Each station owns a slice of the scroll. Account for the intro panel
  // occupying roughly the first slot, so stations map to [1/(n+1) .. 1].
  const slot = (i + 1) / (n + 1);
  const nodeScale = useTransform(progress, [slot - 0.1, slot], [0.3, 1]);
  const glow = useTransform(progress, [slot - 0.1, slot, slot + 0.18], [0, 1, 0.55]);
  const cardOpacity = useTransform(progress, [slot - 0.16, slot - 0.02], [0, 1]);
  const cardY = useTransform(progress, [slot - 0.16, slot - 0.02], [above ? -36 : 36, 0]);
  const yearOpacity = useTransform(progress, [slot - 0.12, slot], [0.15, 1]);

  return (
    <div className="relative flex h-[62vh] max-h-[560px] w-[84vw] shrink-0 items-center justify-center sm:w-[26rem]">
      {/* node on the rail */}
      <motion.span style={{ scale: nodeScale }} className="absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
        <motion.span aria-hidden style={{ opacity: glow }} className="absolute -inset-2.5 rounded-full bg-primary blur-md" />
        <span className="absolute inset-0 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
      </motion.span>

      {/* vertical stem from rail to card */}
      <div
        className={`absolute left-1/2 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent ${
          above ? "bottom-1/2 rotate-180" : "top-1/2"
        }`}
      />

      {/* card */}
      <motion.div
        style={{ opacity: cardOpacity, y: cardY }}
        className={`absolute left-1/2 w-[80%] max-w-xs -translate-x-1/2 ${
          above ? "bottom-1/2 mb-14" : "top-1/2 mt-14"
        }`}
      >
        <motion.div
          style={{ opacity: yearOpacity }}
          className="font-display text-6xl font-bold leading-none tracking-tight text-gradient-brand sm:text-7xl"
        >
          {m.year}
        </motion.div>
        <div className="mt-4 rounded-card border border-border bg-surface/80 p-5 shadow-xl shadow-black/5 backdrop-blur dark:shadow-black/30">
          <h3 className="font-display text-xl font-semibold text-foreground">{m.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
        </div>
      </motion.div>
    </div>
  );
}

function MilestonesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 });
  const x = useTransform(progress, [0, 1], [0, -distance]);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 32));
      setVh(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section ref={sectionRef} style={{ height: vh ? distance + vh : undefined }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <Aurora className="opacity-50" />
        <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-4 px-[8vw] sm:gap-8">
          <MilestoneIntro />
          <div className="relative flex items-stretch">
            {/* rail + scroll-driven fill */}
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
            <motion.div
              style={{ width: fillWidth }}
              className="pointer-events-none absolute left-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_2px_var(--primary)]"
            />
            {MILESTONES.map((m, i) => (
              <Station key={m.year} m={m} i={i} n={MILESTONES.length} progress={progress} />
            ))}
          </div>
          <div aria-hidden className="w-[8vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

function MilestonesStatic() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Aurora className="opacity-50" />
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
        <div className="mx-auto mt-12 max-w-2xl border-l border-border pl-8">
          {MILESTONES.map((m) => (
            <div key={m.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.6rem] top-1 h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                {m.year}
              </span>
              <h3 className="mt-2.5 font-display text-xl font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Milestones() {
  const reduce = useReducedMotion();
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPinned(!reduce);
  }, [reduce]);

  return pinned ? <MilestonesPinned /> : <MilestonesStatic />;
}

export function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            The calm operating system{" "}
            <span className="text-gradient-brand">for modern teams</span>
          </>
        }
        subtitle="Flowly started with a simple frustration: great teams were drowning in tools that created more work than they removed. So we built the one we always wanted."
      >
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic>
            <Button href="/contact" size="lg">
              Join the team
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Magnetic>
          <Button href="/#features" variant="secondary" size="lg">
            See the product
          </Button>
        </div>
      </PageHero>

      {/* Backed by */}
      <Container className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Backed by the best
          </span>
          <Marquee className="w-full">
            {BACKERS.map((b) => (
              <span
                key={b}
                className="px-8 font-display text-lg font-bold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70"
              >
                {b}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </Container>

      {/* Stats band */}
      <Container className="py-16 sm:py-20">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={scaleUp} className="bg-surface p-6 text-center sm:p-8 transition-colors hover:bg-surface-2/50">
              <div className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-1.5 text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Mission + story */}
      <Container className="py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            We believe software should give teams their{" "}
            <span className="text-gradient-brand">focus back.</span>
          </motion.h2>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="space-y-5 text-lg leading-relaxed text-muted"
          >
            <motion.p variants={fadeUp}>
              In 2021, our founders were running engineering and product at fast-growing
              startups — and watching their teams lose hours every week to status meetings,
              scattered docs, and tools that didn&apos;t talk to each other.
            </motion.p>
            <motion.p variants={fadeUp}>
              They were convinced there was a better way: one workspace where planning,
              tracking, and shipping lived together, where the busywork was automated, and
              where opening the app felt calm instead of chaotic.
            </motion.p>
            <motion.p variants={fadeUp}>
              Today, Flowly helps more than 12,000 teams across 60 countries plan sprints,
              automate workflows, and ship faster — without the noise. We&apos;re a small,
              independent team that cares deeply about craft, and we&apos;re just getting started.
            </motion.p>
          </motion.div>
        </div>
      </Container>

      {/* Founder's note */}
      <Container className="pb-6 sm:pb-10">
        <motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-3xl overflow-hidden rounded-card border border-border bg-surface p-8 text-center shadow-xl shadow-black/5 sm:p-12 dark:shadow-black/30"
        >
          <motion.div
            aria-hidden
            initial={{ opacity: 0.3, scale: 0.9 }}
            whileInView={{ opacity: 0.6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          />
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.15 }}
          >
            <Quote className="mx-auto h-8 w-8 text-primary/70" />
          </motion.div>
          <blockquote className="mt-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.75rem]">
            “We&apos;re not building another tool to add to the pile. We&apos;re building the one
            that makes the pile disappear.”
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[TEAM[0], TEAM[1]].map((m) => (
                <span
                  key={m.name}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-surface"
                  style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
                >
                  {initials(m.name)}
                </span>
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-foreground">Sofia Chen &amp; Marcus Lee</div>
              <div className="text-xs text-muted">Co-founders, Flowly</div>
            </div>
          </figcaption>
        </motion.figure>
      </Container>

      {/* Milestones — horizontal scroll-pinned timeline */}
      <Milestones />

      {/* Values */}
      <Container className="py-16 sm:py-24">
        <SectionHeading eyebrow="Our values" title="What we care about" />
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={fadeUp} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
              <SpotlightCard className="group h-full">
                <div className="p-6">
                  <IconTile icon={v.icon} />
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Team */}
      <Container className="pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="The team"
          title="The people behind Flowly"
          subtitle="A senior team from Linear, Notion, Stripe, and Figma — obsessed with the craft of great software."
        />
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
        >
          {TEAM.map((m) => (
            <motion.div key={m.name} variants={fadeUp} className="group text-center">
              <span
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105"
                style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
              >
                {initials(m.name)}
              </span>
              <div className="mt-3 text-sm font-semibold text-foreground">{m.name}</div>
              <div className="text-xs text-muted">{m.role}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Careers */}
      <section className="relative overflow-hidden border-t border-border bg-surface-2/40 py-20 sm:py-28">
        <Aurora className="opacity-40" />
        <Container>
          <SectionHeading
            eyebrow="Careers"
            title="Build the future of work with us"
            subtitle="We're a small, senior team that ships fast and sweats the details. Come help us give millions of people their focus back."
          />

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PERKS.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="rounded-card border border-border bg-surface p-5 transition-transform hover:-translate-y-0.5"
              >
                <IconTile icon={p.icon} size="sm" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-card border border-border bg-surface"
          >
            <div className="border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              {ROLES.length} open roles
            </div>
            {ROLES.map((r) => (
              <motion.a
                key={r.title}
                variants={fadeUp}
                href="/contact"
                className="group flex items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-surface-2/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">{r.title}</div>
                  <div className="mt-0.5 text-xs text-muted">
                    {r.team} · {r.location}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Apply
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
              </motion.a>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center">
            <Button href="/contact" variant="secondary">
              See all open roles
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
