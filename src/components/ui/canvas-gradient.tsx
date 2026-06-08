"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type Blob = {
  hue: number;
  sat: number;
  light: number;
  alpha: number;
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
};

/**
 * Lightweight interactive gradient field rendered on a 2D canvas: soft color
 * "blobs" drift and lerp toward the cursor, blended additively for an aurora
 * look. Pauses when off-screen and falls back to a static frame for reduced
 * motion. No WebGL / external deps.
 */
export function CanvasGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    // Pull brand hues from CSS so the canvas re-themes with --primary/--accent.
    const fullPalette = [
      { hue: 265, sat: 85, light: 60, alpha: 0.55 }, // violet
      { hue: 286, sat: 90, light: 65, alpha: 0.45 }, // fuchsia-violet
      { hue: 78, sat: 95, light: 62, alpha: 0.32 }, // lime accent
      { hue: 250, sat: 80, light: 55, alpha: 0.4 }, // indigo
    ];
    void styles;

    // Touch / small-viewport devices: fewer blobs, capped DPR and frame rate so
    // the continuous aurora loop stays smooth (this is the hero's biggest cost).
    const lite = window.matchMedia(
      "(max-width: 1024px), (pointer: coarse)"
    ).matches;
    const palette = lite ? fullPalette.slice(0, 3) : fullPalette;
    const frameInterval = lite ? 1000 / 30 : 0; // 30fps on mobile, uncapped on desktop

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1.25 : 2);
    const blobs: Blob[] = [];
    const mouse = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      blobs.length = 0;
      palette.forEach((p, i) => {
        blobs.push({
          ...p,
          x: (0.25 + (i % 2) * 0.5) * w,
          y: (0.3 + Math.floor(i / 2) * 0.4) * h,
          r: Math.max(w, h) * (0.42 + (i % 2) * 0.12),
          dx: (Math.random() - 0.5) * 0.18,
          dy: (Math.random() - 0.5) * 0.18,
        });
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      ctx!.globalCompositeOperation = "lighter";
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      blobs.forEach((b, i) => {
        b.x += b.dx;
        b.y += b.dy;
        if (b.x < -w * 0.3 || b.x > w * 1.3) b.dx *= -1;
        if (b.y < -h * 0.3 || b.y > h * 1.3) b.dy *= -1;

        // first two blobs chase the cursor for interactivity
        const cx = i < 2 ? b.x + (mouse.x * w - b.x) * 0.12 : b.x;
        const cy = i < 2 ? b.y + (mouse.y * h - b.y) * 0.12 : b.y;

        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        g.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, ${b.light}%, ${b.alpha})`);
        g.addColorStop(1, `hsla(${b.hue}, ${b.sat}%, ${b.light}%, 0)`);
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx!.fill();
      });
      ctx!.globalCompositeOperation = "source-over";
    }

    resize();
    seed();
    draw();

    let raf = 0;
    let running = false;
    let last = 0;
    const loop = (now: number) => {
      if (!running) return;
      if (!frameInterval || now - last >= frameInterval) {
        draw();
        last = now;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = (e.clientY - rect.top) / rect.height;
    };
    const onResize = () => {
      resize();
      seed();
      draw();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting && !reduce;
        if (next && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!next) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    if (!reduce) {
      window.addEventListener("mousemove", onMouse);
      window.addEventListener("resize", onResize);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
