"use client";

import { useEffect, useState } from "react";
import {
  motion,
  animate,
  useReducedMotion,
} from "framer-motion";
import { Check, Sparkles, Zap, Building2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { inView, scaleUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  icon: LucideIcon;
  monthly: number | null; // null = custom pricing
  annual: number | null; // per-month price when billed annually
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Free",
    icon: Rocket,
    monthly: 0,
    annual: 0,
    description: "For individuals and small side projects getting organized.",
    features: [
      "Up to 3 projects",
      "Unlimited tasks",
      "Board & list views",
      "Mobile apps",
      "Community support",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    icon: Zap,
    monthly: 15,
    annual: 12,
    description: "For growing teams that need automation and insights.",
    features: [
      "Everything in Free",
      "Unlimited projects",
      "AI sprint planning",
      "Automated workflows",
      "Real-time dashboards",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    monthly: null,
    annual: null,
    description: "For organizations that need scale, security, and control.",
    features: [
      "Everything in Pro",
      "SSO & SCIM provisioning",
      "Advanced permissions",
      "Dedicated success manager",
      "99.9% uptime SLA",
    ],
    cta: "Contact sales",
  },
];

const GUARANTEES = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
];

/** Price that tweens smoothly when the value changes (e.g. billing toggle). */
function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(display, value, {
      duration: reduce ? 0 : 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  return <>${Math.round(display)}</>;
}

function PlanCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const isCustom = plan.monthly === null;
  const price = annual ? plan.annual : plan.monthly;

  return (
    <div className="flex h-full flex-col p-6">
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/30">
          <Sparkles className="h-3 w-3" />
          Most Popular
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {plan.name}
          </h3>
          <p className="mt-1.5 max-w-[15rem] text-[13px] leading-relaxed text-muted">
            {plan.description}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset",
            plan.highlighted
              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground ring-white/20"
              : "bg-primary/10 text-primary ring-primary/20"
          )}
        >
          <plan.icon className="h-[18px] w-[18px]" />
        </span>
      </div>

      {/* Price */}
      <div className="mt-5 flex items-end gap-1.5">
        {isCustom ? (
          <span className="font-display text-4xl font-bold tracking-tight text-foreground">
            Custom
          </span>
        ) : (
          <>
            <span className="font-display text-5xl font-bold leading-none tracking-tight text-foreground">
              <AnimatedPrice value={price as number} />
            </span>
            <span className="pb-1 text-sm text-muted">/mo</span>
          </>
        )}
      </div>
      <p className="mt-2 min-h-4 text-xs text-muted">
        {isCustom
          ? "Volume pricing — let's talk"
          : price === 0
            ? "Free forever"
            : annual
              ? `per user · billed annually ($${(price as number) * 12}/yr)`
              : "per user · billed monthly"}
      </p>

      <Button
        href={isCustom ? "#" : "#"}
        variant={plan.highlighted ? "primary" : "secondary"}
        size="sm"
        className="mt-5 w-full"
      >
        {plan.cta}
      </Button>

      <div className="my-5 h-px bg-border" />

      <ul className="flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[13px]">
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                plan.highlighted
                  ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                  : "bg-primary/10 text-primary"
              )}
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BillingToggle({
  annual,
  setAnnual,
}: {
  annual: boolean;
  setAnnual: (v: boolean) => void;
}) {
  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <div className="inline-flex items-center rounded-full border border-border bg-surface p-1">
        {[
          { label: "Monthly", value: false },
          { label: "Annual", value: true },
        ].map((opt) => {
          const active = annual === opt.value;
          return (
            <button
              key={opt.label}
              type="button"
              onClick={() => setAnnual(opt.value)}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium"
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <span
                className={cn(
                  "relative z-10 transition-colors",
                  active ? "text-background" : "text-muted"
                )}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      <span className="inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-ink">
        Save 20%
      </span>
    </div>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* Subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_55%_at_50%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="Start free and upgrade as your team grows. No hidden fees, no surprises — cancel anytime."
        />

        <BillingToggle annual={annual} setAnnual={setAnnual} />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto mt-12 grid max-w-5xl items-stretch gap-5 lg:grid-cols-3"
        >
          {PLANS.map((plan) =>
            plan.highlighted ? (
              <motion.div
                key={plan.name}
                variants={scaleUp}
                className="relative lg:-translate-y-3 lg:scale-[1.03]"
              >
                <div className="absolute -inset-2 -z-10 rounded-[1.7rem] bg-gradient-to-b from-primary/40 to-accent/20 opacity-60 blur-2xl" />
                <div
                  className="gradient-border relative h-full rounded-card"
                  style={{ animation: "spin-border 7s linear infinite" }}
                >
                  <PlanCard plan={plan} annual={annual} />
                </div>
              </motion.div>
            ) : (
              <motion.div key={plan.name} variants={scaleUp} className="relative">
                <SpotlightCard className="h-full">
                  <PlanCard plan={plan} annual={annual} />
                </SpotlightCard>
              </motion.div>
            )
          )}
        </motion.div>

        {/* Trust strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {GUARANTEES.map((g) => (
            <span key={g} className="inline-flex items-center gap-2 text-sm text-muted">
              <Check className="h-4 w-4 text-accent" strokeWidth={3} />
              {g}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
