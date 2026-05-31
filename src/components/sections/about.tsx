"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Zap,
  Globe,
  Compass,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { IconTile } from "@/components/ui/icon-tile";
import { Counter } from "@/components/ui/counter";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

const STATS = [
  { value: 2021, label: "Founded", plain: "2021" },
  { value: 12000, suffix: "+", label: "Teams onboard" },
  { value: 60, suffix: "+", label: "Countries" },
  { value: 48, label: "Flowlians" },
];

const VALUES = [
  {
    icon: Sparkles,
    title: "Craft over noise",
    body: "Every pixel and interaction earns its place. We sweat the details so your team feels calm, not cluttered.",
  },
  {
    icon: ShieldCheck,
    title: "Trust by default",
    body: "Security and privacy aren't add-ons. We build for the strictest teams from day one — SOC 2, SSO, the works.",
  },
  {
    icon: Zap,
    title: "Bias for momentum",
    body: "We ship small, ship often, and listen hard. Your feedback becomes product faster than anywhere you've worked.",
  },
  {
    icon: Users,
    title: "Teams first",
    body: "Software for humans who work together. We design for the messy reality of real teams, not idealized org charts.",
  },
  {
    icon: Globe,
    title: "Work in the open",
    body: "A public roadmap, a public changelog, and a community that shapes what we build next. No black boxes.",
  },
  {
    icon: Compass,
    title: "Long-term thinking",
    body: "We're independent and profitable by design — so we can make the right call, not the quarterly one.",
  },
];

const TEAM = [
  { name: "Sofia Chen", role: "Co-founder & CEO", from: "#7c3aed", to: "#a855f7" },
  { name: "Marcus Lee", role: "Co-founder & CTO", from: "#0ea5e9", to: "#22d3ee" },
  { name: "Priya Nair", role: "VP Product", from: "#f59e0b", to: "#f97316" },
  { name: "Diego Ortega", role: "Head of Design", from: "#10b981", to: "#34d399" },
  { name: "Elena Rossi", role: "VP Engineering", from: "#ec4899", to: "#f43f5e" },
  { name: "Jonas Weber", role: "Head of Growth", from: "#6366f1", to: "#818cf8" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
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
      />

      {/* Stats band */}
      <Container>
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="bg-surface p-6 text-center">
              <div className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {s.plain ? s.plain : <Counter value={s.value} suffix={s.suffix} />}
              </div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Story */}
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.6 }}
            className="text-balance font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            We believe software should give teams their focus back.
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

      {/* Values */}
      <Container className="pb-20 sm:pb-28">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          What we value
        </motion.h2>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {VALUES.map((v) => (
            <motion.div key={v.title} variants={fadeUp}>
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6 }}
          className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          The people behind Flowly
        </motion.h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          A senior team from Linear, Notion, Stripe, and Figma — obsessed with the craft of
          great software.
        </p>
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6"
        >
          {TEAM.map((m) => (
            <motion.div key={m.name} variants={fadeUp} className="text-center">
              <span
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg"
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
    </>
  );
}
