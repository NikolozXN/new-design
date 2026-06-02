"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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

/** CSS-only gradient — zero JS loop, used on mobile and reduced motion. */
export function StaticGradient({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute left-[8%] top-[-12%] h-[55%] w-[55%] rounded-full bg-primary/30 blur-[72px]" />
      <div className="absolute right-[4%] top-[8%] h-[48%] w-[48%] rounded-full bg-accent/18 blur-[72px]" />
      <div className="absolute bottom-[-8%] left-1/4 h-[52%] w-[52%] rounded-full bg-primary/22 blur-[72px]" />
    </div>
  );
}

/**
 * Interactive gradient field. Desktop + fine pointer: lightweight canvas.
 * Everything else: static CSS blobs (no RAF, no blank wait on hydration).
 */
export function CanvasGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const ok =
      !reduce &&
      window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimated(ok);
  }, [reduce]);

  useEffect(() => {
    if (!animated) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = [
      { hue: 265, sat: 85, light: 60, alpha: 0.55 },
      { hue: 286, sat: 90, light: 65, alpha: 0.45 },
      { hue: 78, sat: 95, light: 62, alpha: 0.32 },
      { hue: 250, sat: 80, light: 55, alpha: 0.4 },
    ];

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const frameMs = 1000 / 30;
    let lastFrame = 0;
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
    let running = true;
    const loop = (now: number) => {
      if (!running) return;
      if (now - lastFrame >= frameMs) {
        draw();
        lastFrame = now;
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
        running = entry.isIntersecting && !document.hidden;
        if (running) raf = requestAnimationFrame(loop);
        else cancelAnimationFrame(raf);
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, [animated]);

  if (!animated) {
    return <StaticGradient className={className} />;
  }

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
