"use client";

import { useEffect, useState } from "react";
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
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    // Enable only on the client once we know the device has a fine pointer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest("a, button, [data-cursor='hover'], input, textarea")
      );
    };
    window.addEventListener("mousemove", move);
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
