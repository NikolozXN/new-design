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
  MapPin,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
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

const OFFICES = [
  { city: "San Francisco", hq: true, address: "2261 Market St, CA 94114", tz: "PST · UTC−8" },
  { city: "London", hq: false, address: "70 Wilson St, EC2A 2DB", tz: "GMT · UTC+0" },
  { city: "Singapore", hq: false, address: "12 Marina Blvd, 018982", tz: "SGT · UTC+8" },
];

const FAQS = [
  { q: "How fast will I hear back?", a: "Most messages get a reply within one business day. Sales demos are usually scheduled within a few hours." },
  { q: "Do you help with onboarding?", a: "Yes — every paid plan includes guided onboarding and free migration assistance from your current tool." },
  { q: "Can I get a tailored demo?", a: "Absolutely. Choose “Talk to sales” and we'll build a walkthrough around your team's exact workflow." },
  { q: "Is my data secure?", a: "Flowly is SOC 2 Type II certified, with SSO, granular permissions, and encryption at rest and in transit." },
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
            <span className="text-gradient-hero">flow</span>
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
                    <div>
                      <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-foreground">
                        I&apos;m reaching out about
                      </label>
                      <select id="topic" name="topic" defaultValue="" className={inputClass}>
                        <option value="" disabled>
                          Select a topic…
                        </option>
                        <option>Talk to sales</option>
                        <option>Product support</option>
                        <option>Partnership</option>
                        <option>Press &amp; media</option>
                        <option>Something else</option>
                      </select>
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
            </motion.div>
          </div>

          {/* Offices */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3"
          >
            {OFFICES.map((o) => (
              <motion.div
                key={o.city}
                variants={fadeUp}
                className="rounded-card border border-border bg-surface p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">{o.city}</span>
                  {o.hq && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">HQ</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted">{o.address}</p>
                <p className="mt-1 font-mono text-xs text-muted/80">{o.tz}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ */}
          <div className="mt-20 sm:mt-28">
            <SectionHeading eyebrow="FAQ" title="Before you reach out" />
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2"
            >
              {FAQS.map((f) => (
                <motion.div
                  key={f.q}
                  variants={fadeUp}
                  className="rounded-card border border-border bg-surface p-6"
                >
                  <h3 className="font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
