"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ$#*+=/<>";

/**
 * Decrypts text with a scramble animation when scrolled into view.
 * Falls back to plain text for reduced motion.
 */
export function Scramble({
  text,
  className,
  speed = 38,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const total = text.length;
    const id = setInterval(() => {
      frame++;
      const revealed = Math.floor(frame / 2);
      const next = text
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealed) return ch;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");
      setOutput(next);
      if (revealed >= total) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [inView, reduce, text, speed]);

  return (
    <span ref={ref} className={className}>
      {output}
    </span>
  );
}
