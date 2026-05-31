import { Sparkles, Check } from "lucide-react";
import type { ReactNode, ReactElement } from "react";

/**
 * Custom mini-illustrations for each feature — small themed "scenes" that read
 * like product screenshots. Pure CSS + inline SVG, themed via --primary /
 * --accent. Each fills its parent (absolute inset-0).
 */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/25 blur-2xl" />
      <div className="absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />
      <div className="relative flex h-full w-full items-center justify-center p-5">
        {children}
      </div>
    </div>
  );
}

function AiArt() {
  return (
    <Frame>
      <div className="w-full max-w-[15rem] space-y-2.5">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/90 px-3 py-2 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-xs font-medium text-foreground">
            Plan a 2-week sprint
          </span>
        </div>
        <div className="flex items-end gap-1.5">
          {[45, 70, 55, 88, 62, 95, 74, 60].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary"
              style={{ height: `${h * 0.55}px` }}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function WorkflowArt() {
  return (
    <Frame>
      <svg viewBox="0 0 220 130" className="w-full max-w-[15rem]">
        <defs>
          <linearGradient id="wf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--primary)" />
            <stop offset="1" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
        <path
          d="M40 65 H95 M125 35 H160 M125 95 H160"
          stroke="var(--border)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M95 65 C110 65 110 35 125 35 M95 65 C110 65 110 95 125 95"
          stroke="url(#wf)"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="40" cy="65" r="6" fill="url(#wf)">
          <animate attributeName="r" values="6;8;6" dur="2.4s" repeatCount="indefinite" />
        </circle>
        {[
          [110, 65],
          [185, 35],
          [185, 95],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <rect
              x={cx - 26}
              y={cy - 13}
              width="52"
              height="26"
              rx="8"
              fill="var(--surface)"
              stroke="var(--border)"
            />
            <rect x={cx - 16} y={cy - 4} width="32" height="3" rx="1.5" fill="var(--muted)" opacity="0.5" />
          </g>
        ))}
        <circle r="3.5" fill="var(--accent)">
          <animateMotion dur="3s" repeatCount="indefinite" path="M95 65 C110 65 110 35 125 35" />
        </circle>
      </svg>
    </Frame>
  );
}

function InsightsArt() {
  return (
    <Frame>
      <div className="w-full max-w-[15rem] rounded-xl border border-border bg-surface/90 p-3 shadow-sm backdrop-blur">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Velocity</span>
          <span className="text-xs font-bold text-foreground">+24%</span>
        </div>
        <svg viewBox="0 0 200 70" className="w-full">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0.45" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 55 L30 45 L60 50 L90 30 L120 35 L150 18 L200 10 L200 70 L0 70 Z" fill="url(#area)" />
          <path
            d="M0 55 L30 45 L60 50 L90 30 L120 35 L150 18 L200 10"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="150" cy="18" r="4" fill="var(--accent)" />
        </svg>
      </div>
    </Frame>
  );
}

function NotificationsArt() {
  return (
    <Frame>
      <div className="relative w-full max-w-[15rem] space-y-2">
        <div className="absolute -top-3 left-1/2 h-16 w-16 -translate-x-1/2">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
          <span className="absolute inset-3 rounded-full bg-accent/20" />
        </div>
        {[
          { t: "Task assigned to you", a: "var(--primary)" },
          { t: "Sprint review at 2pm", a: "var(--accent)" },
        ].map((n, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface/95 px-3 py-2 shadow-sm backdrop-blur"
            style={{ marginLeft: i * 14 }}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: n.a }} />
            <span className="truncate text-xs font-medium text-foreground">{n.t}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function CollaborationArt() {
  const people = ["SC", "ML", "PN", "DO"];
  return (
    <Frame>
      <div className="w-full max-w-[15rem] space-y-3">
        <div className="flex -space-x-3">
          {people.map((p, i) => (
            <span
              key={p}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-surface bg-gradient-to-br from-primary to-accent text-xs font-semibold text-primary-foreground"
              style={{ zIndex: people.length - i }}
            >
              {p}
            </span>
          ))}
          <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-surface bg-surface-2 text-xs font-semibold text-muted">
            +9
          </span>
        </div>
        <div className="ml-6 w-fit rounded-2xl rounded-tl-sm border border-border bg-surface/95 px-3 py-2 text-xs text-foreground shadow-sm backdrop-blur">
          Shipped it 🚀 nice work team
        </div>
      </div>
    </Frame>
  );
}

function SecurityArt() {
  return (
    <Frame>
      <div className="relative">
        <svg viewBox="0 0 120 130" className="h-32 w-auto">
          <defs>
            <linearGradient id="sh" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--primary)" />
              <stop offset="1" stopColor="var(--accent)" />
            </linearGradient>
          </defs>
          <path
            d="M60 8 L106 26 V64 C106 96 86 116 60 124 C34 116 14 96 14 64 V26 Z"
            fill="url(#sh)"
            opacity="0.18"
          />
          <path
            d="M60 8 L106 26 V64 C106 96 86 116 60 124 C34 116 14 96 14 64 V26 Z"
            fill="none"
            stroke="url(#sh)"
            strokeWidth="2.5"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg">
            <Check className="h-6 w-6" strokeWidth={3} />
          </span>
        </span>
        <span className="absolute -right-2 top-2 rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-muted shadow-sm">
          SOC 2
        </span>
      </div>
    </Frame>
  );
}

const ART: Record<string, () => ReactElement> = {
  ai: AiArt,
  workflow: WorkflowArt,
  insights: InsightsArt,
  notifications: NotificationsArt,
  collaboration: CollaborationArt,
  security: SecurityArt,
};

export function FeatureArt({ id }: { id: string }) {
  const Art = ART[id] ?? AiArt;
  return <Art />;
}
