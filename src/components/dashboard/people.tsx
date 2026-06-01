import { cn } from "@/lib/utils";

export const MEMBERS = {
  SC: { from: "#7c3aed", to: "#a855f7", name: "Sara Chen" },
  ML: { from: "#0ea5e9", to: "#22d3ee", name: "Marco Liu" },
  PN: { from: "#f59e0b", to: "#f97316", name: "Priya Nair" },
  DO: { from: "#10b981", to: "#34d399", name: "Devon Okafor" },
  ER: { from: "#ec4899", to: "#f43f5e", name: "Elena Ruiz" },
  JW: { from: "#6366f1", to: "#818cf8", name: "Jonas Wirth" },
} as const;

export type Who = keyof typeof MEMBERS;
export const MEMBER_KEYS = Object.keys(MEMBERS) as Who[];

export function Avatar({ who, className = "" }: { who: Who; className?: string }) {
  const m = MEMBERS[who];
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-surface",
        className
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
    >
      {who}
    </span>
  );
}
