"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Zap,
  GitBranch,
  BarChart3,
  Bell,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Scramble } from "@/components/ui/scramble";
import { IconTile } from "@/components/ui/icon-tile";
import { FeatureArt } from "@/components/ui/feature-art";
import { Aurora } from "@/components/ui/aurora";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Feature = {
  id: string;
  icon: LucideIcon;
  num: string;
  title: string;
  description: string;
};

const FEATURES: Feature[] = [
  {
    id: "ai",
    icon: Zap,
    num: "01",
    title: "AI sprint planning",
    description:
      "Describe a goal in plain language and Flowly drafts the whole sprint — balancing workloads, flagging risks, and proposing realistic deadlines in seconds.",
  },
  {
    id: "workflow",
    icon: GitBranch,
    num: "02",
    title: "Automated workflows",
    description:
      "No-code automations move tasks, assign owners, and notify the right people the moment anything changes.",
  },
  {
    id: "insights",
    icon: BarChart3,
    num: "03",
    title: "Real-time insights",
    description:
      "Velocity, burndown, and capacity dashboards that update live — no spreadsheets, no manual exports.",
  },
  {
    id: "notifications",
    icon: Bell,
    num: "04",
    title: "Smart notifications",
    description:
      "Cut the noise. Flowly only pings you about the work that actually needs you, right when it matters.",
  },
  {
    id: "collaboration",
    icon: Users,
    num: "05",
    title: "Team collaboration",
    description:
      "Comment, mention, and share context in line with the work. No endless status meetings required.",
  },
  {
    id: "security",
    icon: ShieldCheck,
    num: "06",
    title: "Enterprise security",
    description:
      "SOC 2 Type II, SSO & SCIM, granular permissions, and end-to-end encryption — safe and compliant at any scale.",
  },
];

function estimateDistance() {
  if (typeof window === "undefined") return 3400;
  const intro = window.innerWidth < 640 ? window.innerWidth * 0.84 : 420;
  const panel = window.innerWidth < 640 ? window.innerWidth * 0.84 : 432;
  return Math.max(0, intro + FEATURES.length * panel - window.innerWidth + 32);
}

function Panel({ f }: { f: Feature }) {
  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col p-6">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-2/50">
          <FeatureArt id={f.id} />
          <span className="absolute right-3 top-2 font-display text-4xl font-bold text-outline-muted">
            {f.num}
          </span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <IconTile icon={f.icon} size="sm" />
          <h3 className="font-display text-xl font-semibold text-foreground">{f.title}</h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.description}</p>
        <div className="mt-auto pt-6">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}

function IntroPanel() {
  return (
    <div className="flex h-full w-[84vw] shrink-0 flex-col justify-center sm:w-[26rem] md:w-[30rem]">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
        <Scramble text="Features" />
      </span>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-5xl md:text-6xl">
        Built for teams that{" "}
        <span className="text-gradient-brand">ship</span>
      </h2>
      <p className="mt-5 max-w-sm text-lg text-muted">
        Six tools in one. Scroll sideways to explore everything Flowly does for you.
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm text-muted">
        <span>Scroll</span>
        <ArrowRight className="h-4 w-4 animate-pulse text-accent" />
      </div>
    </div>
  );
}

/** Each feature card + rail node — scroll-linked reveal like the About timeline. */
function FeatureSlide({
  f,
  i,
  n,
  progress,
}: {
  f: Feature;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  const slot = (i + 1) / (n + 1);
  const cardOpacity = useTransform(progress, [slot - 0.14, slot - 0.02], [0.45, 1]);
  const cardY = useTransform(progress, [slot - 0.14, slot - 0.02], [40, 0]);
  const cardScale = useTransform(progress, [slot - 0.14, slot - 0.02], [0.9, 1]);
  const numScale = useTransform(progress, [slot - 0.1, slot], [0.85, 1]);
  const numOpacity = useTransform(progress, [slot - 0.1, slot], [0.35, 1]);
  const dotScale = useTransform(progress, [slot - 0.08, slot], [0.35, 1]);
  const dotGlow = useTransform(progress, [slot - 0.06, slot, slot + 0.12], [0, 1, 0.45]);

  return (
    <div className="relative flex h-full w-[84vw] shrink-0 flex-col sm:w-[26rem] md:w-[27rem]">
      {/* card */}
      <motion.div
        style={{ opacity: cardOpacity, y: cardY, scale: cardScale }}
        className="relative z-10 min-h-[28rem] flex-1 sm:min-h-[32rem]"
      >
        <motion.span
          style={{ scale: numScale, opacity: numOpacity }}
          className="pointer-events-none absolute -left-1 -top-2 z-20 font-display text-7xl font-bold leading-none text-outline-muted sm:text-8xl"
        >
          {f.num}
        </motion.span>
        <Panel f={f} />
      </motion.div>

      {/* rail node */}
      <div className="relative mt-4 flex h-10 shrink-0 items-center justify-center sm:mt-6">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
        <motion.span style={{ scale: dotScale }} className="relative z-10 h-4 w-4 sm:h-5 sm:w-5">
          <motion.span
            aria-hidden
            style={{ opacity: dotGlow }}
            className="absolute -inset-2 rounded-full bg-primary blur-md sm:-inset-2.5"
          />
          <span className="absolute inset-0 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
        </motion.span>
      </div>
    </div>
  );
}

/** Mobile / reduced motion: responsive grid fallback. */
function FeaturesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
            <Scramble text="Features" />
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
            Built for teams that{" "}
            <span className="text-gradient-brand">ship</span>
          </h2>
          <p className="mt-5 max-w-sm text-lg text-muted">
            Six tools in one — everything Flowly does for your team, in one place.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.num} className="min-h-[28rem]">
              <Panel f={f} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Signature landing animation — horizontal scroll-pinned showcase. */
function FeaturesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(estimateDistance);
  const [vh, setVh] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 32, restDelta: 0.001 });
  const x = useTransform(progress, [0, 1], [0, -distance]);
  const fillWidth = useTransform(progress, [0, 1], ["0%", "100%"]);
  const introOpacity = useTransform(progress, [0, 0.12], [1, 0.72]);
  const introY = useTransform(progress, [0, 0.12], [0, -24]);

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
        <Aurora className="opacity-45" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay" />

        <div className="relative flex h-full items-center pb-16 pt-24 sm:pb-20 sm:pt-28">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-end gap-5 px-[6vw] will-change-transform sm:gap-8 sm:px-[8vw]"
          >
            <motion.div style={{ opacity: introOpacity, y: introY }} className="self-center">
              <IntroPanel />
            </motion.div>

            <div className="relative flex items-end gap-5 sm:gap-8">
              {/* master rail — fills as you scroll */}
              <div className="pointer-events-none absolute inset-x-0 bottom-5 h-px bg-border sm:bottom-6" />
              <motion.div
                style={{ width: fillWidth }}
                className="pointer-events-none absolute bottom-5 left-0 h-0.5 rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_14px_3px_var(--primary)] sm:bottom-6"
              />

              {FEATURES.map((f, i) => (
                <FeatureSlide key={f.num} f={f} i={i} n={FEATURES.length} progress={progress} />
              ))}
            </div>

            <div aria-hidden className="w-[6vw] shrink-0 sm:w-[8vw]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id="features">
        <FeaturesGrid />
      </div>
    );
  }

  return (
    <div id="features">
      {/* Mobile: snap carousel (smooth, no scroll-jank) */}
      <div className="md:hidden">
        <section className="relative overflow-hidden py-20">
          <Aurora className="opacity-40" />
          <Container className="relative">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
              <Scramble text="Features" />
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground">
              Built for teams that{" "}
              <span className="text-gradient-brand">ship</span>
            </h2>
            <p className="mt-4 text-sm text-muted">Swipe to explore →</p>
            <div className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FEATURES.map((f) => (
                <div key={f.num} className="w-[88vw] max-w-md shrink-0 snap-center">
                  <Panel f={f} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>

      {/* Desktop+: full scroll-pinned horizontal journey */}
      <div className="hidden md:block">
        <FeaturesPinned />
      </div>
    </div>
  );
}
