"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
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
import { cn } from "@/lib/utils";

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

function Panel({ f }: { f: Feature }) {
  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col p-6">
        {/* Mini illustration */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-surface-2/50">
          <FeatureArt id={f.id} />
          <span className="absolute right-3 top-2 font-display text-4xl font-bold text-outline-muted">
            {f.num}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <IconTile icon={f.icon} size="sm" />
          <h3 className="font-display text-xl font-semibold text-foreground">
            {f.title}
          </h3>
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          {f.description}
        </p>
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

function IntroPanel({ pinned = false }: { pinned?: boolean }) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col justify-center",
        pinned ? "h-full w-[82vw] sm:w-[420px]" : "w-full max-w-2xl"
      )}
    >
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
        <Scramble text="Features" />
      </span>
      <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
        Built for teams that{" "}
        <span className="text-gradient-brand">ship</span>
      </h2>
      <p className="mt-5 max-w-sm text-lg text-muted">
        {pinned
          ? "Six tools in one. Scroll sideways to explore everything Flowly does for you."
          : "Six tools in one — everything Flowly does for your team, in one place."}
      </p>
      {pinned && (
        <div className="mt-8 flex items-center gap-2 text-sm text-muted">
          <span>Scroll</span>
          <ArrowRight className="h-4 w-4 animate-pulse text-accent" />
        </div>
      )}
    </div>
  );
}

/** Mobile / reduced-motion fallback: a normal responsive grid. */
function FeaturesGrid() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <Container>
        <IntroPanel />
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

/** Desktop: horizontal scroll-pinned showcase. Its scroll ref is always
 *  attached because this component only mounts when pinning is active. */
function FeaturesPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [vh, setVh] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

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
    <section
      id="features"
      ref={sectionRef}
      style={{ height: vh ? distance + vh : undefined }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch gap-6 px-6 lg:px-8"
        >
          <IntroPanel pinned />
          {FEATURES.map((f) => (
            <div key={f.num} className="h-[32rem] w-[82vw] shrink-0 sm:w-[27rem]">
              <Panel f={f} />
            </div>
          ))}
          <div aria-hidden className="w-2 shrink-0" />
        </motion.div>
      </div>
    </section>
  );
}

export function Features() {
  const reduce = useReducedMotion();
  // Start with the grid so SSR + first client paint match; upgrade to the
  // pinned variant on desktop after mount.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const check = () =>
      setPinned(!reduce && window.matchMedia("(min-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [reduce]);

  return pinned ? <FeaturesPinned /> : <FeaturesGrid />;
}
