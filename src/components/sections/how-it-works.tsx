"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { PlugZap, Sparkles, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { revealIn } from "@/lib/motion";

type Step = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    icon: PlugZap,
    number: "01",
    title: "Connect your work",
    description:
      "Import tasks from Jira, Trello, or a spreadsheet in one click — or start fresh with a Flowly template built for your team.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "Plan with AI",
    description:
      "Describe your goal and let Flowly break it into sprints, assign owners, and set realistic timelines you can adjust in seconds.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ship and track",
    description:
      "Watch progress update in real time. Automations handle the busywork while live dashboards keep everyone aligned.",
  },
];

function StepVisual() {
  return (
    <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2 md:block">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-primary/30 blur-2xl" />
      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        {[90, 70, 80].map((wpct, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3"
          >
            <span className="h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-primary to-accent" />
            <span
              className="h-2 rounded bg-muted/30"
              style={{ width: `${wpct}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBody({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <>
      <div className="group flex items-center gap-4">
        <IconTile icon={Icon} size="lg" />
        <span className="font-display text-6xl font-bold text-outline-muted">
          {step.number}
        </span>
      </div>
      <h3 className="mt-7 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {step.title}
      </h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
        {step.description}
      </p>
    </>
  );
}

function StackCard({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const end = (index + 1) / total;
  const scale = useTransform(progress, [end - 0.25, end], [1, 0.93]);

  return (
    <div
      className="sticky"
      style={{ top: `calc(7rem + ${index * 1.6}rem)` }}
    >
      <motion.div
        style={reduce ? undefined : { scale }}
        className="gradient-border overflow-hidden rounded-[2rem]"
      >
        <div className="grid items-center gap-8 bg-surface p-8 sm:p-12 md:grid-cols-2">
          <div>
            <StepBody step={step} />
          </div>
          <StepVisual />
        </div>
      </motion.div>
    </div>
  );
}

function MobileSteps() {
  return (
    <div className="mt-16 flex flex-col gap-6 md:hidden">
      {STEPS.map((step, i) => (
        <ScrollReveal key={step.number} variants={revealIn} custom={i}>
          <div className="gradient-border overflow-hidden rounded-[2rem]">
            <div className="bg-surface p-8">
              <StepBody step={step} />
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

function DesktopStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <Container className="mt-16 hidden md:block">
      <div ref={ref} className="mx-auto flex max-w-4xl flex-col gap-8 pb-[12vh]">
        {STEPS.map((step, i) => (
          <StackCard
            key={step.number}
            step={step}
            index={i}
            total={STEPS.length}
            progress={scrollYProgress}
            reduce={reduce}
          />
        ))}
      </div>
    </Container>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-surface-2/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Up and running in three steps"
          subtitle="From scattered to shipping in an afternoon. No lengthy onboarding, no consultants required."
        />
      </Container>

      <MobileSteps />
      <DesktopStack />
    </section>
  );
}
