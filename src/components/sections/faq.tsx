"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Do I need a credit card to start?",
    a: "No. You can start the 14-day Pro trial without entering any payment details. We'll only ask for a card if you decide to keep Flowly after your trial ends.",
  },
  {
    q: "Can I import data from my current tool?",
    a: "Yes. Flowly imports directly from Jira, Trello, Asana, and CSV files. Most teams migrate their full workspace in under an hour with our guided importer.",
  },
  {
    q: "How does the AI sprint planning work?",
    a: "Describe your goal in plain language and Flowly breaks it into tasks, estimates effort, balances workloads across your team, and proposes a realistic timeline you can adjust with a drag.",
  },
  {
    q: "Is Flowly secure enough for my company?",
    a: "Absolutely. We're SOC 2 Type II compliant, support SSO and SCIM, encrypt data in transit and at rest, and offer granular role-based permissions on every plan above Free.",
  },
  {
    q: "What happens when my trial ends?",
    a: "Your workspace automatically switches to the Free plan — you never lose your data. You can upgrade to Pro at any time to unlock automations, AI planning, and unlimited projects.",
  },
  {
    q: "Can I change or cancel my plan anytime?",
    a: "Yes. You can upgrade, downgrade, or cancel from your billing settings whenever you like. Changes are prorated, and there are no cancellation fees.",
  },
  {
    q: "Do you offer discounts for startups or nonprofits?",
    a: "We do. Eligible early-stage startups and registered nonprofits receive 50% off Pro for the first year. Reach out to our sales team to apply.",
  },
  {
    q: "What kind of support is included?",
    a: "Free plans get community support, Pro plans include priority email support with fast response times, and Enterprise customers get a dedicated success manager and SLA.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-card border bg-surface transition-colors duration-300",
        open ? "border-primary/40 bg-surface-2/50" : "border-border"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-medium text-foreground">{q}</span>
        <span
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors",
            open
              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
              : "bg-primary/10 text-primary"
          )}
        >
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            {open ? (
              <Minus className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          subtitle="Everything you need to know about Flowly. Can't find what you're looking for? Reach out to our team."
        />

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-3">
          {FAQS.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
