"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { staggerContainer, touchView, EASE } from "@/lib/motion";

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  children: ReactNode;
  variants: Variants;
  custom?: number;
};

/** Reliable scroll reveal — useInView + animate (more reliable than whileInView on iOS). */
export function ScrollReveal({ children, variants, custom, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, touchView);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      custom={custom}
      initial="hidden"
      animate={reduce || inView ? "show" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerRevealProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  children: ReactNode;
  stagger?: number;
  delay?: number;
};

/** Staggered children reveal — parent triggers when scrolled into view. */
export function StaggerReveal({
  children,
  stagger = 0.1,
  delay = 0,
  ...props
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, touchView);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={reduce || inView ? "show" : "hidden"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Single-element reveal without variant children (opacity / transform props). */
export function ScrollRevealOnce({
  children,
  className,
  from = { opacity: 0, y: 36, scale: 0.96 },
  to = { opacity: 1, y: 0, scale: 1 },
  transition = { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
}: {
  children?: ReactNode;
  className?: string;
  from?: Record<string, number>;
  to?: Record<string, number>;
  transition?: { duration?: number; ease?: typeof EASE; delay?: number };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, touchView);
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={from}
      animate={reduce || inView ? to : from}
      transition={{ duration: 0.65, ease: EASE, ...transition }}
      aria-hidden={children ? undefined : true}
    >
      {children}
    </motion.div>
  );
}
