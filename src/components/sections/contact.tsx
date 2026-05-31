"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Headphones, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { IconTile } from "@/components/ui/icon-tile";

const CHANNELS = [
  {
    icon: Mail,
    title: "Talk to sales",
    body: "See a live demo and get a plan tailored to your team.",
    link: "sales@flowly.com",
  },
  {
    icon: Headphones,
    title: "Customer support",
    body: "Already a customer? Our team replies within a few hours.",
    link: "support@flowly.com",
  },
  {
    icon: MessageSquare,
    title: "Press & partners",
    body: "Media requests, partnerships, and everything else.",
    link: "hello@flowly.com",
  },
];

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build your team&apos;s{" "}
            <span className="text-gradient-brand">flow</span>
          </>
        }
        subtitle="Questions about plans, security, or migrating your workspace? We'd love to help — usually within one business day."
      />

      <Container className="pb-24 sm:pb-32">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
          {/* Form */}
          <div className="rounded-card border border-border bg-surface p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    <CheckCircle2 className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted">
                    Thanks for reaching out. A member of our team will get back to you
                    shortly at the email you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm font-medium text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="flex flex-col gap-4"
                >
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Send us a message
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                        Full name
                      </label>
                      <input id="name" name="name" required placeholder="Jane Cooper" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                        Work email
                      </label>
                      <input id="email" name="email" type="email" required placeholder="jane@acme.com" className={inputClass} />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground">
                        Company
                      </label>
                      <input id="company" name="company" placeholder="Acme Inc" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="size" className="mb-1.5 block text-sm font-medium text-foreground">
                        Team size
                      </label>
                      <select id="size" name="size" defaultValue="" className={inputClass}>
                        <option value="" disabled>
                          Select…
                        </option>
                        <option>1–10</option>
                        <option>11–50</option>
                        <option>51–200</option>
                        <option>201–1,000</option>
                        <option>1,000+</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                      How can we help?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us a bit about your team and what you're looking for…"
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group relative mt-1 inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-primary to-primary-hover px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-inset ring-white/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/45"
                  >
                    Send message
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="text-xs text-muted">
                    By submitting, you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-foreground">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-4">
            {CHANNELS.map((c) => (
              <div
                key={c.title}
                className="group flex items-start gap-4 rounded-card border border-border bg-surface p-5 transition-colors hover:border-primary/30"
              >
                <IconTile icon={c.icon} size="sm" />
                <div>
                  <h3 className="font-semibold text-foreground">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.body}</p>
                  <a
                    href={`mailto:${c.link}`}
                    className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    {c.link}
                  </a>
                </div>
              </div>
            ))}
            <div className="rounded-card border border-border bg-surface-2 p-5 text-sm text-muted">
              <span className="font-semibold text-foreground">HQ.</span> 2261 Market St,
              San Francisco, CA — remote-first across 14 time zones.
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
