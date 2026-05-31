"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Zap,
  Globe,
  Compass,
  ArrowUpRight,
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
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

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

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
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
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BACKERS.map((b) => (
              <span key={b} className="font-display text-lg font-bold tracking-tight text-foreground/35 transition-colors hover:text-foreground/70">
                {b}
              </span>
            ))}
          </div>
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
            <motion.div key={s.label} variants={fadeUp} className="bg-surface p-6 text-center sm:p-8">
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

      {/* Milestones timeline */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Aurora className="opacity-60" />
        <Container>
          <SectionHeading eyebrow="Milestones" title="How we got here" />
          <div className="relative mx-auto mt-14 max-w-2xl">
            {/* vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-transparent sm:left-1/2" />
            <div className="flex flex-col gap-10">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative pl-10 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_2px_var(--primary)] sm:left-auto ${
                      i % 2 === 0 ? "sm:-right-2" : "sm:-left-2"
                    }`}
                  />
                  <div className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {m.year}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

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
    </>
  );
}
