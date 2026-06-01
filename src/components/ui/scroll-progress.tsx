"use client";

import { motion, useScroll } from "framer-motion";

/** Thin gradient bar at the very top that tracks page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-accent to-primary will-change-transform"
    />
  );
}
