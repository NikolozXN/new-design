"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Clock,
  Star,
  Globe,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { IconTile } from "@/components/ui/icon-tile";
import { Aurora } from "@/components/ui/aurora";
import { fadeUp, inView, staggerContainer } from "@/lib/motion";

const CHANNELS = [
  { icon: Mail, title: "Talk to sales", body: "See a live demo and get a plan tailored to your team.", link: "sales@flowly.com" },
  { icon: Headphones, title: "Customer support", body: "Already a customer? Our team replies within a few hours.", link: "support@flowly.com" },
  { icon: MessageSquare, title: "Press & partners", body: "Media requests, partnerships, and everything else.", link: "hello@flowly.com" },
];

const TRUST = [
  { icon: Clock, label: "Avg. first reply", value: "< 2 hours" },
  { icon: Star, label: "Support rating", value: "4.9 / 5" },
  { icon: Globe, label: "Coverage", value: "14 time zones" },
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
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {TRUST.map((t) => (
            <span key={t.label} className="inline-flex items-center gap-2 text-sm text-muted">
              <t.icon className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{t.value}</span>
              {t.label}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="relative overflow-hidden pb-24 sm:pb-32">
        <Aurora className="opacity-50" />
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={inView}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-card border border-border bg-surface p-6 shadow-xl shadow-black/5 sm:p-8 dark:shadow-black/30"
            >
              <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.7rem] bg-gradient-to-b from-primary/20 to-accent/10 opacity-50 blur-2xl" />
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">Message sent</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Thanks for reaching out. A member of our team will get back to you shortly at
                      the email you provided.
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
                    <h2 className="font-display text-xl font-semibold text-foreground">Send us a message</h2>
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
            </motion.div>

            {/* Channels */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="flex flex-col gap-4"
            >
              {CHANNELS.map((c) => (
                <motion.a
                  key={c.title}
                  variants={fadeUp}
                  href={`mailto:${c.link}`}
                  className="group flex items-start gap-4 rounded-card border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30"
                >
                  <IconTile icon={c.icon} size="sm" />
                  <div>
                    <h3 className="font-semibold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm text-muted">{c.body}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {c.link}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </motion.a>
              ))}
              <motion.div variants={fadeUp} className="rounded-card border border-border bg-surface-2 p-5 text-sm text-muted">
                <span className="font-semibold text-foreground">HQ.</span> 2261 Market St, San
                Francisco, CA — remote-first across 14 time zones.
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
