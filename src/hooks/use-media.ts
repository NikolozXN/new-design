"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `matchMedia` hook. SSR-safe: starts `false` on the server / first
 * paint, then syncs on mount and on every change. Use for branching animation
 * complexity by device class.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Phones (and narrow viewports) — drop the heaviest scroll/3D effects here. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}

/**
 * Touch / weaker-GPU class: coarse pointer OR small-to-mid viewport.
 * Use to throttle continuous canvas/raf work so phones stay at 60fps.
 */
export function useIsLiteDevice(): boolean {
  return useMediaQuery("(max-width: 1024px), (pointer: coarse)");
}
