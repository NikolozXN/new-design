"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  AnimatePresence,
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
import { IconTile } from "@/components/ui/icon-tile";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Aurora } from "@/components/ui/aurora";
import { Marquee } from "@/components/ui/marquee";
import { Scramble } from "@/components/ui/scramble";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
/** Safe scroll height before JS measures the pinned track — prevents blank gaps. */
const PINNED_EST_SCROLL = 3000;

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
function ValuesShowcase() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 flex h-[34rem] flex-col gap-2.5 sm:mt-14 md:h-[27rem] md:flex-row md:gap-3">
      {VALUES.map((v, i) => {
        const isActive = i === active;
        const Icon = v.icon;
        return (
          <motion.button
            key={v.title}
            type="button"
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
    </div>
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
  const parallaxY = useSpring(useTransform(scrollYProgress, [0, 1], [depth, -depth]), {
    stiffness: 120,
    damping: 30,
  });

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
      initial={{ opacity: 0, y: 48, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
      className={cn("group", i % 3 === 1 && "sm:mt-10")}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 900,
          y: reduce ? undefined : parallaxY,
        }}
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
          <div className="mt-0.5 text-xs text-white/75 sm:overflow-hidden">
            <span className="sm:block sm:translate-y-5 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
              {m.role}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Milestones — DESKTOP: horizontal scroll-pinned journey (landing-grade).
   Cards never drop below 45% opacity; section gets estimated height instantly
   so nothing below goes blank while JS measures the track.
--------------------------------------------------------------------------- */
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
  const cardOpacity = useTransform(progress, [slot - 0.16, slot - 0.02], [0.45, 1]);
  const cardY = useTransform(progress, [slot - 0.16, slot - 0.02], [above ? -28 : 28, 0]);
  const yearY = useTransform(progress, [slot - 0.16, slot - 0.02], [above ? -56 : 56, 0]);
  const yearOpacity = useTransform(progress, [slot - 0.12, slot], [0.45, 1]);
  const cardScale = useTransform(progress, [slot - 0.16, slot - 0.02], [0.94, 1]);
  const blurN = useTransform(progress, [slot - 0.16, slot - 0.02], [10, 0]);
  const filter = useMotionTemplate`blur(${blurN}px)`;

  const card = (
    <motion.div style={{ opacity: cardOpacity, y: cardY, scale: cardScale, filter }} className="w-[80vw] max-w-[20rem] sm:w-[22rem]">
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
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

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

  const sectionHeight =
    vh && distance > 0 ? distance + vh : `calc(100dvh + ${PINNED_EST_SCROLL}px)`;

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative hidden md:block">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <Aurora className="opacity-50" />
        <div className="flex h-full items-center pb-12 pt-24 sm:pt-28">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full max-h-[620px] items-stretch gap-4 px-[8vw] sm:gap-8"
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

/* MOBILE: cinematic vertical timeline — parallax years, de-blur, rail fill */
function MilestoneRowMobile({ m, i }: { m: (typeof MILESTONES)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.42"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const yearX = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? -24 : 24, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const blurN = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const filter = useMotionTemplate`blur(${blurN}px)`;
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const dotGlow = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  return (
    <div ref={ref} className="relative pb-14 pl-14 last:pb-0">
      <motion.span style={{ scale: dotScale }} className="absolute left-[1.15rem] top-2 z-10 h-5 w-5 -translate-x-1/2">
        <motion.span aria-hidden style={{ opacity: dotGlow }} className="absolute -inset-2 rounded-full bg-primary blur-md" />
        <span className="absolute inset-0 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
      </motion.span>
      <motion.div style={{ opacity, y, scale, filter }}>
        <motion.span style={{ x: yearX }} className="block font-display text-5xl font-bold leading-none tracking-tight text-gradient-brand">
          {m.year}
        </motion.span>
        <div className="mt-3 rounded-card border border-border bg-surface/80 p-4 shadow-xl shadow-black/5 backdrop-blur dark:shadow-black/30">
          <h3 className="font-display text-lg font-semibold text-foreground">{m.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
        </div>
      </motion.div>
    </div>
  );
}

function MilestonesMobile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="relative overflow-hidden py-16 md:hidden">
      <Aurora className="opacity-50" />
      <Container>
        <SectionHeading eyebrow="Milestones" title="How we got here" />
        <div ref={ref} className="relative mx-auto mt-12 max-w-xl">
          <span className="absolute left-[1.15rem] top-0 h-full w-px -translate-x-1/2 bg-border" />
          <motion.span
            style={{ scaleY: fill }}
            className="absolute left-[1.15rem] top-0 h-full w-0.5 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary to-accent shadow-[0_0_12px_2px_var(--primary)]"
          />
          {MILESTONES.map((m, i) => (
            <MilestoneRowMobile key={m.year} m={m} i={i} />
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
      <MilestonesMobile />
      <MilestonesPinned />
    </>
  );
}

/* ---------------------------------------------------------------------------
   Mission — scroll-linked split: headline parallax + paragraphs scrub in
--------------------------------------------------------------------------- */
function MissionStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.35"] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.5, 1, 1, 0.85]);
  const lineScale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const PARAS = [
    "In 2021, our founders were running engineering and product at fast-growing startups — and watching their teams lose hours every week to status meetings, scattered docs, and tools that didn't talk to each other.",
    "They were convinced there was a better way: one workspace where planning, tracking, and shipping lived together, where the busywork was automated, and where opening the app felt calm instead of chaotic.",
    "Today, Flowly helps more than 12,000 teams across 60 countries plan sprints, automate workflows, and ship faster — without the noise. We're a small, independent team that cares deeply about craft, and we're just getting started.",
  ];

  return (
    <div ref={ref}>
      <Container className="py-12 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative lg:sticky lg:top-32 lg:self-start">
          <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
            <motion.span
              style={{ scaleX: lineScale }}
              className="mb-6 block h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary to-accent"
            />
            <h2 className="text-balance font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              We believe software should give teams their{" "}
              <span className="text-gradient-brand">focus back.</span>
            </h2>
          </motion.div>
        </div>
        <div className="space-y-8">
          {PARAS.map((text, i) => (
            <MissionParagraph key={i} text={text} index={i} parentProgress={scrollYProgress} />
          ))}
        </div>
        </div>
      </Container>
    </div>
  );
}

function MissionParagraph({
  text,
  index,
  parentProgress,
}: {
  text: string;
  index: number;
  parentProgress: MotionValue<number>;
}) {
  const start = 0.12 + index * 0.18;
  const end = start + 0.22;
  const opacity = useTransform(parentProgress, [start, end], [0.45, 1]);
  const x = useTransform(parentProgress, [start, end], [index % 2 === 0 ? 48 : -48, 0]);
  const blurN = useTransform(parentProgress, [start, end], [10, 0]);
  const filter = useMotionTemplate`blur(${blurN}px)`;

  return (
    <motion.p style={{ opacity, x, filter }} className="text-lg leading-relaxed text-muted">
      {text}
    </motion.p>
  );
}

/* ---------------------------------------------------------------------------
   Stats — scroll-scrubbed band with a glowing divider that draws across
--------------------------------------------------------------------------- */
function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "start 0.45"] });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 28,
  });

  return (
    <div ref={ref}>
      <Container className="py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-card border border-border bg-border">
        <motion.div
          style={{ scaleX: fill }}
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-primary via-accent to-primary shadow-[0_0_16px_2px_var(--primary)]"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <StatCell key={s.label} s={s} i={i} progress={scrollYProgress} />
          ))}
        </div>
        </div>
      </Container>
    </div>
  );
}

function StatCell({
  s,
  i,
  progress,
}: {
  s: (typeof STATS)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const slot = 0.15 + i * 0.18;
  const scale = useTransform(progress, [slot, slot + 0.2], [0.88, 1]);
  const opacity = useTransform(progress, [slot, slot + 0.2], [0.5, 1]);
  const y = useTransform(progress, [slot, slot + 0.2], [24, 0]);

  return (
    <motion.div
      style={{ scale, opacity, y }}
      className="border-border bg-surface p-6 text-center sm:border-l sm:p-8 sm:first:border-l-0"
    >
      <div className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
      </div>
      <div className="mt-1.5 text-sm text-muted">{s.label}</div>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Team — DESKTOP: horizontal scroll-pinned portrait gallery
--------------------------------------------------------------------------- */
function TeamPortrait({ m, progress, i, n }: { m: (typeof TEAM)[number]; progress: MotionValue<number>; i: number; n: number }) {
  const slot = (i + 0.5) / n;
  const opacity = useTransform(progress, [slot - 0.12, slot], [0.5, 1]);
  const y = useTransform(progress, [slot - 0.12, slot], [48, 0]);
  const scale = useTransform(progress, [slot - 0.12, slot], [0.9, 1]);
  const rotate = useTransform(progress, [slot - 0.12, slot], [i % 2 === 0 ? -4 : 4, 0]);

  return (
    <motion.div style={{ opacity, y, scale, rotate }} className="h-[26rem] w-[16rem] shrink-0 sm:w-[18rem]">
      <div className="group relative h-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-border">
        <span
          className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-white"
          style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
        >
          {initials(m.name)}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.img} alt={m.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} className="absolute inset-0 h-full w-full object-cover grayscale-[20%] transition-[filter] duration-500 group-hover:grayscale-0" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="font-display text-lg font-semibold text-white">{m.name}</div>
          <div className="text-sm text-white/75">{m.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

function TeamPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 });
  const x = useTransform(progress, [0, 1], [0, -distance]);

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
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const sectionHeight =
    vh && distance > 0 ? distance + vh : `calc(100dvh + ${PINNED_EST_SCROLL}px)`;

  return (
    <section ref={sectionRef} style={{ height: sectionHeight }} className="relative mt-14 hidden md:block">
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden pb-12 pt-24">
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-6 px-[8vw]">
          <div className="w-[28vw] shrink-0 sm:w-[22rem]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
              <Scramble text="The team" />
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              The people behind{" "}
              <span className="text-gradient-brand">Flowly</span>
            </h2>
            <p className="mt-4 text-muted">Scroll to meet the team.</p>
            <ArrowRight className="mt-6 h-5 w-5 animate-pulse text-accent" />
          </div>
          {TEAM.map((m, i) => (
            <TeamPortrait key={m.name} m={m} progress={progress} i={i} n={TEAM.length} />
          ))}
          <div aria-hidden className="w-[8vw] shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

function FounderNote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.92, 1]), { stiffness: 120, damping: 28 });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 0]);
  const borderGlow = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <div ref={ref}>
      <Container className="pb-6 sm:pb-10">
        <motion.figure
        style={{ scale, opacity, y, rotate }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-card border border-border bg-surface p-8 text-center shadow-xl shadow-black/5 sm:p-12 dark:shadow-black/30"
      >
        <motion.span
          aria-hidden
          style={{ opacity: borderGlow }}
          className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-primary/30"
        />
        <motion.div
          aria-hidden
          style={{ opacity: borderGlow }}
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl"
        />
        <Quote className="mx-auto h-8 w-8 text-primary/70" />
        <blockquote className="mt-5 text-balance font-display text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl md:text-[1.75rem]">
          &ldquo;We&apos;re not building another tool to add to the pile. We&apos;re building the one
          that makes the pile disappear.&rdquo;
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
    </div>
  );
}

function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const bar = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 30 });

  return (
    <div ref={ref}>
      <Container className="py-16 sm:py-24">
      <SectionHeading eyebrow="Our values" title="What we care about" />
      <motion.div
        style={{ scaleX: bar }}
        className="mx-auto mt-8 h-0.5 max-w-xs origin-left rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_12px_var(--primary)]"
      />
        <ValuesShowcase />
      </Container>
    </div>
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

      {/* Stats band — scroll-scrubbed */}
      <StatsBand />

      {/* Mission — scroll-linked split */}
      <MissionStory />

      {/* Founder's note — scroll scale reveal */}
      <FounderNote />

      {/* Milestones — horizontal scroll-pinned timeline */}
      <Milestones />

      {/* Values */}
      <ValuesSection />

      {/* Team — pinned gallery on desktop, tilt grid on mobile */}
      <div className="pb-24 sm:pb-32">
        <div className="md:hidden">
          <Container>
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
        </div>
        <TeamPinned />
      </div>

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
