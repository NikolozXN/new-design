"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * Custom cursor: a small dot + a trailing ring that grows over interactive
 * elements. Uses mix-blend-difference so it reads on any background.
 * Only active on fine pointers (desktop); no-ops on touch / reduced motion.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 280, damping: 32, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 280, damping: 32, mass: 0.35 });
  const hoveringRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      const next = !!el.closest("a, button, [data-cursor='hover'], input, textarea");
      if (next !== hoveringRef.current) {
        hoveringRef.current = next;
        setHovering(next);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden mix-blend-difference md:block">
      {/* dot */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <span className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
      {/* trailing ring */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.span
          initial={false}
          animate={{ width: hovering ? 56 : 30, height: hovering ? 56 : 30 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        />
      </motion.div>
    </div>
  );
}
