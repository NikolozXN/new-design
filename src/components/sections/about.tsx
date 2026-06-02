"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
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
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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
  { icon: Sparkles, title: "Craft over noise", tint: "#7c3aed", body: "Every pixel and interaction earns its place. We sweat the details so your team feels calm, not cluttered." },
  { icon: ShieldCheck, title: "Trust by default", tint: "#0ea5e9", body: "Security and privacy aren't add-ons. We build for the strictest teams from day one — SOC 2, SSO, the works." },
  { icon: Zap, title: "Bias for momentum", tint: "#f59e0b", body: "We ship small, ship often, and listen hard. Your feedback becomes product faster than anywhere you've worked." },
  { icon: Users, title: "Teams first", tint: "#ec4899", body: "Software for humans who work together. We design for the messy reality of real teams, not idealized org charts." },
  { icon: Globe, title: "Work in the open", tint: "#10b981", body: "A public roadmap, a public changelog, and a community that shapes what we build next. No black boxes." },
  { icon: Compass, title: "Long-term thinking", tint: "#6366f1", body: "We're independent and profitable by design — so we can make the right call, not the quarterly one." },
];

const TEAM = [
  { name: "Sofia Chen", role: "Co-founder & CEO", from: "#7c3aed", to: "#a855f7", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Marcus Lee", role: "Co-founder & CTO", from: "#0ea5e9", to: "#22d3ee", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Priya Nair", role: "VP Product", from: "#f59e0b", to: "#f97316", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Diego Ortega", role: "Head of Design", from: "#10b981", to: "#34d399", img: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Elena Rossi", role: "VP Engineering", from: "#ec4899", to: "#f43f5e", img: "https://randomuser.me/api/portraits/women/65.jpg" },
  { name: "Jonas Weber", role: "Head of Growth", from: "#6366f1", to: "#818cf8", img: "https://randomuser.me/api/portraits/men/15.jpg" },
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

/* ---------------------------------------------------------------------------
   Values — premium spotlight cards. Desktop: 3×2 grid with scroll stagger.
   Mobile: horizontal snap carousel (full cards, not collapsed accordion strips).
--------------------------------------------------------------------------- */
const valueReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ValueCard({ v, i }: { v: (typeof VALUES)[number]; i: number }) {
  const Icon = v.icon;
  return (
    <motion.div
      variants={valueReveal}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="h-full"
    >
      <SpotlightCard className="group h-full">
        <div className="relative h-full overflow-hidden p-6 sm:p-7">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: `linear-gradient(90deg, ${v.tint}, transparent)` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: v.tint }}
          />
          <span className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-bold leading-none text-foreground/[0.05]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            style={{
              backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 50%, #000))`,
              boxShadow: `0 12px 28px -12px ${v.tint}`,
            }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-foreground">
            {v.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.body}</p>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

function ValuesSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Aurora className="opacity-35" />
      <Container className="relative">
        <SectionHeading eyebrow="Our values" title="What we care about" />

        {/* Mobile — swipeable snap carousel */}
        <div className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {VALUES.map((v, i) => (
            <div key={v.title} className="w-[88vw] max-w-sm shrink-0 snap-center">
              <ValueCard v={v} i={i} />
            </div>
          ))}
        </div>

        {/* Desktop — staggered grid */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} v={v} i={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Team — editorial portrait wall with scroll reveal + 3D tilt on desktop.
--------------------------------------------------------------------------- */
const teamReveal = {
  hidden: { opacity: 0, y: 48, clipPath: "inset(12% 0% 12% 0% round 28px)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function TeamPortrait({ m, i }: { m: (typeof TEAM)[number]; i: number }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 65%)`;

  function onMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div variants={teamReveal} className={cn("group", i % 3 === 1 && "lg:mt-12")}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border [transform-style:preserve-3d]"
      >
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
          className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0 grayscale-[25%]"
        />
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-display text-lg font-semibold text-white">{m.name}</div>
          <div className="mt-0.5 text-sm text-white/75">{m.role}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeamSection() {
  return (
    <section className="relative overflow-hidden pb-24 sm:pb-32">
      <Aurora className="opacity-30" />
      <Container className="relative">
        <SectionHeading
          eyebrow="The team"
          title="The people behind Flowly"
          subtitle="A senior team from Linear, Notion, Stripe, and Figma — obsessed with the craft of great software."
        />
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3"
        >
          {TEAM.map((m, i) => (
            <TeamPortrait key={m.name} m={m} i={i} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Milestones — desktop: horizontal scroll-pinned journey (the signature anim).
   Mobile: vertical scroll-linked timeline. Reduced motion: static list.
--------------------------------------------------------------------------- */

function estimateMilestoneDistance() {
  if (typeof window === "undefined") return 4200;
  const intro = window.innerWidth * 0.84;
  const stations = MILESTONES.length * (window.innerWidth < 640 ? window.innerWidth * 0.84 : 416);
  return Math.max(0, intro + stations - window.innerWidth + 32);
}

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
  const slot = (i + 1) / (n + 1);
  const nodeScale = useTransform(progress, [slot - 0.1, slot], [0.3, 1]);
  const glow = useTransform(progress, [slot - 0.1, slot, slot + 0.18], [0, 1, 0.55]);
  const cardOpacity = useTransform(progress, [slot - 0.16, slot - 0.02], [0.55, 1]);
  const cardY = useTransform(progress, [slot - 0.16, slot - 0.02], [above ? -28 : 28, 0]);
  const yearY = useTransform(progress, [slot - 0.16, slot - 0.02], [above ? -56 : 56, 0]);
  const yearOpacity = useTransform(progress, [slot - 0.12, slot], [0.4, 1]);

  const card = (
    <motion.div style={{ opacity: cardOpacity, y: cardY }} className="w-[80vw] max-w-[20rem] sm:w-[22rem]">
      <motion.div
        style={{ opacity: yearOpacity, y: yearY }}
        className="font-display text-5xl font-bold leading-none tracking-tight text-gradient-brand sm:text-6xl md:text-7xl"
      >
        {m.year}
      </motion.div>
      <div className="mt-3 rounded-card border border-border bg-surface/80 p-4 shadow-xl shadow-black/5 backdrop-blur sm:mt-4 sm:p-5 dark:shadow-black/30">
        <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">{m.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="grid h-full w-[84vw] shrink-0 grid-rows-[1fr_auto_1fr] sm:w-[26rem]">
      <div className="flex items-end justify-center pb-4 sm:pb-6">{above && card}</div>
      <div className="relative flex items-center justify-center">
        <div
          className={`absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 to-transparent ${
            above ? "bottom-1/2 rotate-180" : "top-1/2"
          }`}
        />
        <motion.span style={{ scale: nodeScale }} className="relative z-10 h-5 w-5">
          <motion.span aria-hidden style={{ opacity: glow }} className="absolute -inset-2.5 rounded-full bg-primary blur-md" />
          <span className="absolute inset-0 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
        </motion.span>
      </div>
      <div className="flex items-start justify-center pt-4 sm:pt-6">{!above && card}</div>
    </div>
  );
}

function MilestonesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(estimateMilestoneDistance);
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 });
  const x = useTransform(progress, [0, 1], [0, -distance]);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  useIsoLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 32));
      setVh(window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: distance + vh }} className="relative">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <Aurora className="opacity-50" />
        <div className="flex h-full items-center pb-12 pt-24 sm:pt-28">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full max-h-[620px] items-stretch gap-4 px-[8vw] will-change-transform sm:gap-8"
          >
            <MilestoneIntro />
            <div className="relative flex h-full items-stretch">
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
      </div>
    </section>
  );
}

/** Mobile — horizontal snap timeline (matches landing-page energy). */
function MilestonesMobile() {
  return (
    <section className="relative overflow-hidden py-16">
      <Aurora className="opacity-50" />
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
        <p className="mx-auto mt-4 max-w-sm text-center text-sm text-muted md:hidden">
          Swipe through our story →
        </p>
        <div className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MILESTONES.map((m) => (
            <div
              key={m.year}
              className="w-[88vw] max-w-md shrink-0 snap-center rounded-card border border-border bg-surface/80 p-6 shadow-xl backdrop-blur"
            >
              <span className="font-display text-5xl font-bold leading-none tracking-tight text-gradient-brand">
                {m.year}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.body}</p>
            </div>
          ))}
        </div>
      </Container>
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
  if (reduce) return <MilestonesStatic />;

  return (
    <>
      <div className="md:hidden">
        <MilestonesMobile />
      </div>
      <div className="hidden md:block">
        <MilestonesPinned />
      </div>
    </>
  );
}

export function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            The calm operating system{" "}
            <span className="text-gradient-hero">for modern teams</span>
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
            <motion.div
              key={s.label}
              variants={scaleUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group bg-surface p-6 text-center transition-colors hover:bg-surface-2/50 sm:p-8"
            >
              <div className="font-display text-3xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-5xl">
                {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-1.5 text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Mission + story */}
      <section className="relative overflow-hidden py-12 sm:py-20">
        <Aurora className="opacity-25" />
        <Container className="relative">
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
      </section>

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
                  className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white ring-2 ring-surface"
                  style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
                >
                  {initials(m.name)}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
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
      <ValuesSection />

      {/* Team */}
      <TeamSection />

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
