"use client";

import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
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
import { IconTile } from "@/components/ui/icon-tile";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/ui/aurora";
import { Marquee } from "@/components/ui/marquee";
import { EASE, fadeUp, inView, scaleUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
   Values — an interactive expanding strip. Hover (or tap) a panel and it
   unfurls while its neighbours fold away. One living object, not six cards.
   Panels rise + uncloak on scroll (staggered); flex-grow is CSS-transitioned
   so it can coexist with the entrance animation.
--------------------------------------------------------------------------- */
const panelReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.92, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function ValuesShowcase() {
  const [active, setActive] = useState(0);

  return (
    <motion.div
      variants={staggerContainer(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className="mt-12 flex h-[34rem] flex-col gap-2.5 sm:mt-14 md:h-[27rem] md:flex-row md:gap-3"
    >
      {VALUES.map((v, i) => {
        const isActive = i === active;
        const Icon = v.icon;
        return (
          <motion.button
            key={v.title}
            type="button"
            variants={panelReveal}
            aria-expanded={isActive}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            className="group relative min-h-0 basis-0 overflow-hidden rounded-card border border-border bg-surface text-left outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{
              flexGrow: isActive ? 3.4 : 1,
              transition: "flex-grow 0.5s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: isActive ? `0 28px 60px -30px ${v.tint}` : undefined,
            }}
          >
            <motion.span
              aria-hidden
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute inset-0"
              style={{ background: `linear-gradient(150deg, ${v.tint}26, transparent 65%)` }}
            />
            <motion.span
              aria-hidden
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-0 h-1 origin-left"
              style={{ background: `linear-gradient(90deg, ${v.tint}, transparent)` }}
            />
            <span className="pointer-events-none absolute right-4 top-2 font-display text-5xl font-bold leading-none text-foreground/[0.05]">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative flex h-full w-full flex-col p-4 sm:p-5">
              <motion.span
                animate={{ scale: isActive ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${v.tint}, color-mix(in srgb, ${v.tint} 55%, #000))`,
                  boxShadow: `0 10px 24px -10px ${v.tint}`,
                }}
              >
                <Icon className="h-5 w-5" />
              </motion.span>

              {/* vertical label shown only on collapsed desktop panels */}
              {!isActive && (
                <span
                  className="absolute bottom-5 left-1/2 hidden whitespace-nowrap font-display text-base font-semibold tracking-tight text-foreground/80 [writing-mode:vertical-rl] md:block"
                  style={{ transform: "translateX(-50%) rotate(180deg)" }}
                >
                  {v.title}
                </span>
              )}

              <div className="mt-auto min-w-0">
                <h3
                  className={cn(
                    "font-display text-lg font-semibold tracking-tight text-foreground sm:text-xl",
                    isActive ? "md:block" : "md:hidden"
                  )}
                >
                  {v.title}
                </h3>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{v.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Team — editorial portrait cards. Entrance + a continuous parallax drift are
   driven by scroll position (works on touch), and on pointer devices the card
   also tilts in 3D with a cursor-tracked glare.
--------------------------------------------------------------------------- */
function TeamTilt({ m, i }: { m: (typeof TEAM)[number]; i: number }) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-linked entrance + parallax (the "cool" motion that also plays on mobile)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const depth = i % 3 === 1 ? 72 : 46;
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [depth, -depth]), {
    stiffness: 120,
    damping: 30,
  });
  const opacity = useTransform(scrollYProgress, [0, 0.16], [0, 1]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.85, 1]), {
    stiffness: 140,
    damping: 26,
  });
  const blurN = useTransform(scrollYProgress, [0, 0.18], [12, 0]);
  const filter = useMotionTemplate`blur(${blurN}px)`;

  // Pointer-tracked 3D tilt (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["18%", "82%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["18%", "82%"]);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), transparent 60%)`;

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
    <motion.div
      ref={cardRef}
      style={reduce ? undefined : { y, opacity, scale, filter }}
      className={cn("group", i % 3 === 1 && "sm:mt-10")}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl ring-1 ring-border [transform-style:preserve-3d]"
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
          className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition-[filter] duration-500 group-hover:grayscale-0"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-0"
          style={{ backgroundImage: `linear-gradient(150deg, ${m.from}, ${m.to})` }}
        />
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <span className="absolute left-4 top-4 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4" style={{ transform: "translateZ(45px)" }}>
          <div className="font-display text-base font-semibold text-white">{m.name}</div>
          <div className="h-4 overflow-hidden">
            <div className="translate-y-5 text-xs text-white/75 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {m.role}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Milestones — a scroll-linked timeline that lives in NORMAL page flow: no
   pinning, no reserved viewport height, nothing to "load late". The rail fills
   as you scroll, the nodes ignite, and each entry rises in. Centred &
   alternating on desktop, a left rail on phones. Content never drops below
   ~45% opacity, so it's always visible even before hydration.
--------------------------------------------------------------------------- */
function MilestoneRow({ m, i }: { m: (typeof MILESTONES)[number]; i: number }) {
  const left = i % 2 === 0; // which side of the centre rail (desktop only)
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.45, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const dotGlow = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  const card = (
    <motion.div style={{ opacity, y }} className={cn("md:max-w-sm", left && "md:ml-auto md:text-right")}>
      <span className="font-display text-4xl font-bold leading-none tracking-tight text-gradient-brand sm:text-5xl">
        {m.year}
      </span>
      <div className="mt-2.5 rounded-card border border-border bg-surface/80 p-4 shadow-lg shadow-black/5 backdrop-blur sm:p-5 dark:shadow-black/30">
        <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">{m.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="relative pb-12 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-14 md:pl-0">
      <motion.span
        style={{ scale: dotScale }}
        className="absolute left-[1.15rem] top-1.5 z-10 h-5 w-5 -translate-x-1/2 md:left-1/2"
      >
        <motion.span aria-hidden style={{ opacity: dotGlow }} className="absolute -inset-2 rounded-full bg-primary blur-md" />
        <span className="absolute inset-0 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
      </motion.span>

      {left ? (
        <>
          {card}
          <div aria-hidden className="hidden md:block" />
        </>
      ) : (
        <>
          <div aria-hidden className="hidden md:block" />
          {card}
        </>
      )}
    </div>
  );
}

function MilestonesTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.65"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <Aurora className="opacity-50" />
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          {/* rail track + scroll-driven fill (left on mobile, centred on desktop) */}
          <span className="absolute left-[1.15rem] top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />
          <motion.span
            style={{ scaleY: fill }}
            className="absolute left-[1.15rem] top-0 h-full w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary to-accent shadow-[0_0_12px_2px_var(--primary)] md:left-1/2"
          />
          {MILESTONES.map((m, i) => (
            <MilestoneRow key={m.year} m={m} i={i} />
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
  // `useReducedMotion` returns null on the server and first client render, so
  // both render the same tree (no hydration mismatch). It only swaps to the
  // plain static list afterwards for visitors who prefer reduced motion.
  const reduce = useReducedMotion();
  return reduce ? <MilestonesStatic /> : <MilestonesTimeline />;
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
      <Container className="py-16 sm:py-24">
        <SectionHeading eyebrow="Our values" title="What we care about" />
        <ValuesShowcase />
      </Container>

      {/* Team */}
      <Container className="pb-24 sm:pb-32">
        <SectionHeading
          eyebrow="The team"
          title="The people behind Flowly"
          subtitle="A senior team from Linear, Notion, Stripe, and Figma — obsessed with the craft of great software."
        />
        <div className="mt-14 grid grid-cols-2 items-start gap-4 sm:grid-cols-3 sm:gap-6">
          {TEAM.map((m, i) => (
            <TeamTilt key={m.name} m={m} i={i} />
          ))}
        </div>
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
