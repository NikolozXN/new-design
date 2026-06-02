"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { staggerContainer, touchView, EASE } from "@/lib/motion";

/** useInView + scroll fallback — iOS Safari often misses IntersectionObserver on first paint. */
function useRevealVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, touchView);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) {
      setVisible(true);
      return;
    }
    if (inView) setVisible(true);
  }, [inView, reduce]);

  useEffect(() => {
    if (reduce || visible) return;
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > window.innerHeight * 0.04) {
        setVisible(true);
      }
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [reduce, visible]);

  return { ref, show: Boolean(reduce || visible || inView) };
}

type RevealProps = Omit<HTMLMotionProps<"div">, "initial" | "animate" | "whileInView"> & {
  children: ReactNode;
  variants: Variants;
  custom?: number;
};

/** Reliable scroll reveal — useInView + animate (more reliable than whileInView on iOS). */
export function ScrollReveal({ children, variants, custom, ...props }: RevealProps) {
  const { ref, show } = useRevealVisible();

  return (
    <motion.div
      ref={ref}
      variants={variants}
      custom={custom}
      initial="hidden"
      animate={show ? "show" : "hidden"}
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
  const { ref, show } = useRevealVisible();

  return (
    <motion.div
      ref={ref}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={show ? "show" : "hidden"}
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
  const { ref, show } = useRevealVisible();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={from}
      animate={show ? to : from}
      transition={{ duration: 0.65, ease: EASE, ...transition }}
      aria-hidden={children ? undefined : true}
    >
      {children}
    </motion.div>
  );
}
