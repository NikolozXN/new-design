"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Marquee } from "@/components/ui/marquee";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Head of Product",
    company: "Northwind",
    quote:
      "Flowly replaced three tools for us. Sprint planning went from a two-hour meeting to a ten-minute review. The AI suggestions are scary good.",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    role: "Engineering Manager",
    company: "Globex",
    quote:
      "The automations alone save my team hours every week. Tasks route themselves and nothing falls through the cracks anymore.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Founder & CEO",
    company: "Lumen Labs",
    quote:
      "We onboarded the whole company in a day. Powerful enough for engineering, simple enough for everyone else.",
    rating: 5,
  },
  {
    name: "David Okafor",
    role: "Operations Lead",
    company: "Acme Co",
    quote:
      "Live dashboards mean I finally have a real-time view of capacity. No more chasing people for status updates.",
    rating: 4,
  },
  {
    name: "Elena Rossi",
    role: "Design Director",
    company: "Initech",
    quote:
      "It's genuinely beautiful software. My team actually wants to open it, which I can't say for anything we used before.",
    rating: 5,
  },
  {
    name: "Tom Becker",
    role: "CTO",
    company: "Hooli",
    quote:
      "Security and SSO were table stakes for us, and Flowly nailed them. Rolling it out to 400 engineers was painless.",
    rating: 5,
  },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
      {initials}
    </span>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-card border border-border bg-surface p-6 shadow-sm sm:w-[400px]">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={
              i < t.rating
                ? "h-4 w-4 fill-amber-400 text-amber-400"
                : "h-4 w-4 text-muted/40"
            }
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={t.name} />
        <div>
          <div className="text-sm font-semibold text-foreground">{t.name}</div>
          <div className="text-xs text-muted">
            {t.role}, {t.company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rowA = TESTIMONIALS.slice(0, 3);
  const rowB = TESTIMONIALS.slice(3, 6);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-surface-2 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by teams everywhere"
          subtitle="Over 12,000 teams trust Flowly to plan their work and ship on time. Here's what a few of them have to say."
        />
      </Container>

      <div className="mt-16 flex flex-col gap-5">
        <Marquee>
          {rowA.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee reverse>
          {rowB.map((t) => (
            <Card key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
