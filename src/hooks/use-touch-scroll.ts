"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type ScrollOffset = { enter: number; exit: number };

/** Scroll progress 0→1 as element crosses viewport. iOS-safe scroll + touch fallback. */
export function useTouchScrollProgress(
  ref: RefObject<HTMLElement | null>,
  offset: ScrollOffset = { enter: 0.92, exit: 0.38 }
): MotionValue<number> {
  const reduce = useReducedMotion();
  const manual = useMotionValue(0);
  const smooth = useSpring(manual, { stiffness: 110, damping: 28, restDelta: 0.001 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${offset.enter}`, `start ${offset.exit}`],
  });

  useEffect(() => {
    if (reduce) {
      manual.set(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startLine = vh * offset.enter;
      const endLine = vh * offset.exit;
      const span = startLine - endLine;
      if (span <= 0) return;
      manual.set(Math.min(1, Math.max(0, (startLine - rect.top) / span)));
    };

    calc();
    const unsub = scrollYProgress.on("change", (v) => manual.set(v));
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    window.addEventListener("touchmove", calc, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
      window.removeEventListener("touchmove", calc);
    };
  }, [ref, reduce, manual, scrollYProgress, offset.enter, offset.exit]);

  return smooth;
}

/** Progress 0→1 across a tall pinned section; returns active step index. */
export function useTouchSectionProgress(
  sectionRef: RefObject<HTMLElement | null>,
  steps: number
): { progress: MotionValue<number>; active: number } {
  const reduce = useReducedMotion();
  const manual = useMotionValue(0);
  const progress = useSpring(manual, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (reduce) {
      manual.set(1);
      setActive(steps - 1);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const calc = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        manual.set(0);
        return;
      }
      const raw = Math.min(1, Math.max(0, -rect.top / total));
      manual.set(raw);
      setActive(Math.min(steps - 1, Math.max(0, Math.floor(raw * steps))));
    };

    calc();
    const unsub = scrollYProgress.on("change", (v) => {
      manual.set(v);
      setActive(Math.min(steps - 1, Math.max(0, Math.floor(v * steps))));
    });
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    window.addEventListener("touchmove", calc, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
      window.removeEventListener("touchmove", calc);
    };
  }, [sectionRef, reduce, manual, scrollYProgress, steps]);

  return { progress, active };
}

/** Card progress inside horizontal rail — scrubs continuously on swipe. */
export function useHorizontalScrub(
  cardRef: RefObject<HTMLElement | null>,
  railRef: RefObject<HTMLElement | null>
): MotionValue<number> {
  const reduce = useReducedMotion();
  const progress = useMotionValue(0.85);

  useEffect(() => {
    const card = cardRef.current;
    const rail = railRef.current;
    if (!card || !rail) return;

    if (reduce) {
      progress.set(1);
      return;
    }

    const update = () => {
      const cr = card.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      const cardMid = cr.left + cr.width / 2;
      const railMid = rr.left + rr.width / 2;
      const dist = Math.abs(cardMid - railMid);
      const falloff = rr.width * 0.38;
      progress.set(Math.max(0, Math.min(1, 1 - dist / falloff)));
    };

    update();
    rail.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("touchmove", update, { passive: true });

    return () => {
      rail.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("touchmove", update);
    };
  }, [cardRef, railRef, reduce, progress]);

  return progress;
}

export function stepOpacity(progress: MotionValue<number>, index: number, total: number) {
  const segment = 1 / total;
  const enter = index * segment;
  const exit = (index + 1) * segment;
  const pad = segment * 0.22;
  return useTransform(
    progress,
    [Math.max(0, enter - pad), enter + pad * 0.35, exit - pad * 0.35, Math.min(1, exit + pad)],
    [0, 1, 1, 0]
  );
}

export function stepY(progress: MotionValue<number>, index: number, total: number) {
  const segment = 1 / total;
  const enter = index * segment;
  const exit = (index + 1) * segment;
  const pad = segment * 0.2;
  return useTransform(
    progress,
    [Math.max(0, enter - pad), enter + segment * 0.5, exit - pad * 0.4, Math.min(1, exit + pad)],
    [72, 0, 0, -48]
  );
}

export function stepScale(progress: MotionValue<number>, index: number, total: number) {
  const segment = 1 / total;
  const enter = index * segment;
  const exit = (index + 1) * segment;
  const pad = segment * 0.2;
  return useTransform(
    progress,
    [Math.max(0, enter - pad), enter + segment * 0.45, exit - pad * 0.4, Math.min(1, exit + pad)],
    [0.88, 1, 1, 0.92]
  );
}
