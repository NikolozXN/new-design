import { DashboardShell } from "./shell";
import { cn } from "@/lib/utils";

const WEEKS = 10;
const TODAY = 4.5; // current position, in weeks

type Bar = {
  name: string;
  team: keyof typeof TEAM;
  span: [number, number];
};

const TEAM = {
  Design: "from-violet-500 to-fuchsia-500",
  Engineering: "from-sky-500 to-cyan-500",
  Growth: "from-amber-500 to-orange-500",
} as const;

const SECTIONS: { team: keyof typeof TEAM; bars: Bar[] }[] = [
  {
    team: "Design",
    bars: [
      { name: "Onboarding flow redesign", team: "Design", span: [1, 4] },
      { name: "Mobile nav prototype", team: "Design", span: [2, 3] },
      { name: "Design system v2", team: "Design", span: [4, 8] },
    ],
  },
  {
    team: "Engineering",
    bars: [
      { name: "Pricing API endpoint", team: "Engineering", span: [2, 5] },
      { name: "Analytics events setup", team: "Engineering", span: [5, 7] },
      { name: "Realtime sync engine", team: "Engineering", span: [6, 10] },
    ],
  },
  {
    team: "Growth",
    bars: [
      { name: "Q2 referral program", team: "Growth", span: [1, 3] },
      { name: "Lifecycle email series", team: "Growth", span: [4, 6] },
      { name: "Launch campaign", team: "Growth", span: [8, 10] },
    ],
  },
];

const MILESTONES = [
  { name: "Beta", week: 5 },
  { name: "GA launch", week: 9 },
];

const pct = (w: number) => ((w - 1) / WEEKS) * 100;
const widthPct = (s: [number, number]) => ((s[1] - s[0] + 1) / WEEKS) * 100;

export function TimelineView() {
  return (
    <DashboardShell breadcrumb="Projects / Website Revamp" title="Timeline" status="On track">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
          <span className="font-medium text-foreground">Q3 Roadmap</span>
          {(Object.keys(TEAM) as (keyof typeof TEAM)[]).map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <span className={cn("h-2.5 w-2.5 rounded-full bg-gradient-to-r", TEAM[t])} />
              {t}
            </span>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-0.5 bg-primary" /> Today
          </span>
        </div>

        <div className="mt-4 overflow-x-auto rounded-card border border-border bg-surface">
          <div className="min-w-[760px]">
            {/* Week header */}
            <div className="grid grid-cols-[180px_1fr] border-b border-border bg-surface-2">
              <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">Workstream</div>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
                {Array.from({ length: WEEKS }, (_, i) => (
                  <div key={i} className="px-2 py-2.5 text-center text-[11px] font-medium text-muted">
                    W{i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="relative">
              {/* Today marker spanning all rows */}
              <div
                className="pointer-events-none absolute bottom-0 top-0 z-10 w-px bg-primary/70"
                style={{ left: `calc(180px + (100% - 180px) * ${TODAY / WEEKS})` }}
              >
                <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
              </div>

              {SECTIONS.map((section) => (
                <div key={section.team}>
                  <div className="grid grid-cols-[180px_1fr] border-b border-border bg-background/40">
                    <div className="px-4 py-1.5 text-[11px] font-semibold text-foreground">{section.team}</div>
                    <div />
                  </div>
                  {section.bars.map((bar) => (
                    <div
                      key={bar.name}
                      className="grid grid-cols-[180px_1fr] items-center border-b border-border last:border-0"
                    >
                      <div className="truncate px-4 py-3 text-[13px] text-foreground/90">{bar.name}</div>
                      <div className="relative py-3">
                        <div className="grid h-7" style={{ gridTemplateColumns: `repeat(${WEEKS}, minmax(0, 1fr))` }}>
                          {Array.from({ length: WEEKS }, (_, i) => (
                            <div key={i} className="border-l border-border/40" />
                          ))}
                        </div>
                        <div
                          className={cn(
                            "absolute top-1/2 h-6 -translate-y-1/2 rounded-full bg-gradient-to-r shadow-sm",
                            TEAM[bar.team]
                          )}
                          style={{ left: `${pct(bar.span[0])}%`, width: `${widthPct(bar.span)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Milestones row */}
              <div className="grid grid-cols-[180px_1fr] items-center bg-surface-2">
                <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Milestones</div>
                <div className="relative h-10">
                  {MILESTONES.map((m) => (
                    <div
                      key={m.name}
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${pct(m.week) + (100 / WEEKS) / 2}%` }}
                    >
                      <span className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">
                        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
                        {m.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
