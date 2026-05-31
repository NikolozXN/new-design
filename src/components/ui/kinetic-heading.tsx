"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const charVariants = {
  hidden: { y: "120%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.018 },
  }),
};

/**
 * Headline that reveals character-by-character from a clipped mask.
 * Pass words as an array; words marked `accent` get the brand gradient.
 */
export function KineticHeading({
  lines,
  className,
}: {
  lines: { text: string; accent?: boolean }[][];
  className?: string;
}) {
  let index = 0;
  return (
    <h1 className={cn("font-display", className)}>
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((word, wi) => (
            <Fragment key={wi}>
              <span className="inline-block overflow-hidden align-bottom pb-[0.12em]">
                {Array.from(word.text).map((ch) => {
                  const i = index++;
                  return (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={charVariants}
                      className={cn(
                        "inline-block",
                        word.accent && "text-gradient-brand"
                      )}
                    >
                      {ch}
                    </motion.span>
                  );
                })}
              </span>
              {/* breakable space so long lines wrap on small screens */}
              {wi < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </h1>
  );
}
