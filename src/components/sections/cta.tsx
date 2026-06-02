"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { CanvasGradient } from "@/components/ui/canvas-gradient";
import { StaggerReveal } from "@/components/ui/scroll-reveal";
import { revealUp } from "@/lib/motion";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface px-6 py-24 text-center sm:px-16">
          {/* Signature interactive gradient */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-90">
            <CanvasGradient />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay" />

          <StaggerReveal stagger={0.12} className="relative mx-auto max-w-2xl">
            <motion.h2
              variants={revealUp}
              className="text-balance font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Ready to put your team{" "}
              <span className="text-gradient-brand">in flow?</span>
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="mx-auto mt-5 max-w-xl text-lg text-muted"
            >
              Join 12,000+ teams shipping faster with Flowly. Start your free
              trial today — no credit card, no commitment.
            </motion.p>
            <motion.div variants={revealUp} className="mt-9 flex justify-center">
              <Magnetic>
                <Button href="/signup" size="lg">
                  Start free trial
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Magnetic>
            </motion.div>
          </StaggerReveal>
        </div>
      </Container>
    </section>
  );
}
