import { cn } from "@/lib/utils";

/**
 * Animated mesh-gradient "aurora" backdrop made of blurred blobs.
 * Drop it inside a `relative overflow-hidden` parent as a -z layer.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      <div className="absolute left-[10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-primary/30 blur-[130px] animate-aurora" />
      <div
        className="absolute right-[8%] top-[5%] h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[130px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-15%] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px] animate-aurora"
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}

/** Fixed, full-screen film grain. Mount once near the page root. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-0 z-[55] opacity-[0.035] mix-blend-overlay dark:opacity-[0.05]"
    />
  );
}
