import { TrendingUp, TrendingDown } from "lucide-react";
import { DashboardShell } from "./shell";
import { Avatar, MEMBERS, type Who } from "./people";
import { cn } from "@/lib/utils";

const KPIS = [
  { k: "Completed", v: "38", delta: "+12%", up: true, sub: "vs last sprint" },
  { k: "Velocity", v: "41 pts", delta: "+6%", up: true, sub: "8-sprint avg 37" },
  { k: "Cycle time", v: "2.4d", delta: "-0.5d", up: true, sub: "time in progress" },
  { k: "On-time rate", v: "92%", delta: "-3%", up: false, sub: "of due tasks" },
];

const THROUGHPUT = [
  { w: "W1", v: 22 },
  { w: "W2", v: 28 },
  { w: "W3", v: 19 },
  { w: "W4", v: 31 },
  { w: "W5", v: 26 },
  { w: "W6", v: 35 },
  { w: "W7", v: 30 },
  { w: "W8", v: 41 },
];
const THROUGHPUT_MAX = Math.max(...THROUGHPUT.map((d) => d.v));

const LABELS = [
  { name: "Engineering", count: 14, color: "bg-sky-500" },
  { name: "Design", count: 11, color: "bg-violet-500" },
  { name: "Content", count: 7, color: "bg-emerald-500" },
  { name: "Growth", count: 5, color: "bg-rose-500" },
  { name: "Research", count: 4, color: "bg-amber-500" },
];
const LABEL_TOTAL = LABELS.reduce((a, b) => a + b.count, 0);

const STATUS = [
  { name: "Done", v: 38, color: "#10b981" },
  { name: "In progress", v: 12, color: "#7c3aed" },
  { name: "In review", v: 6, color: "#f59e0b" },
  { name: "Backlog", v: 8, color: "#94a3b8" },
];
const STATUS_TOTAL = STATUS.reduce((a, b) => a + b.v, 0);

const WORKLOAD: { who: Who; load: number }[] = [
  { who: "ML", load: 9 },
  { who: "SC", load: 7 },
  { who: "ER", load: 6 },
  { who: "DO", load: 5 },
  { who: "PN", load: 4 },
  { who: "JW", load: 3 },
];
const WORKLOAD_MAX = Math.max(...WORKLOAD.map((d) => d.load));

function donutGradient() {
  let acc = 0;
  const stops = STATUS.map((s) => {
    const start = (acc / STATUS_TOTAL) * 360;
    acc += s.v;
    const end = (acc / STATUS_TOTAL) * 360;
    return `${s.color} ${start}deg ${end}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

function Card({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card border border-border bg-surface p-5", className)}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function ReportsView() {
  return (
    <DashboardShell breadcrumb="Projects / Website Revamp" title="Reports" status="On track">
      <div className="space-y-6 p-4 sm:p-6">
        {/* KPI strip */}
        <div className="grid grid-cols-2 overflow-hidden rounded-card border border-border bg-surface lg:grid-cols-4">
          {KPIS.map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "px-5 py-4",
                i % 2 === 1 && "border-l border-border",
                i >= 2 && "border-t border-border lg:border-t-0",
                i !== 0 && "lg:border-l lg:border-border"
              )}
            >
              <div className="text-xs text-muted">{s.k}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-foreground">{s.v}</span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 text-[11px] font-semibold",
                    s.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                  )}
                >
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.delta}
                </span>
              </div>
              <div className="mt-0.5 text-[11px] text-muted">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Throughput */}
        <Card title="Throughput — tasks completed per week">
          <div className="flex h-44 items-end gap-2 sm:gap-3">
            {THROUGHPUT.map((d, i) => {
              const last = i === THROUGHPUT.length - 1;
              return (
                <div key={d.w} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-muted">{d.v}</span>
                  <div
                    className={cn(
                      "w-full rounded-t-md transition-colors",
                      last ? "bg-gradient-to-t from-primary to-accent" : "bg-primary/25"
                    )}
                    style={{ height: `${(d.v / THROUGHPUT_MAX) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted">{d.w}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Status donut */}
          <Card title="Status breakdown">
            <div className="flex items-center gap-5">
              <div className="relative h-28 w-28 shrink-0">
                <div className="h-full w-full rounded-full" style={{ background: donutGradient() }} />
                <div className="absolute inset-[18%] flex flex-col items-center justify-center rounded-full bg-surface">
                  <span className="font-display text-xl font-bold text-foreground">{STATUS_TOTAL}</span>
                  <span className="text-[10px] text-muted">tasks</span>
                </div>
              </div>
              <ul className="flex-1 space-y-2">
                {STATUS.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 text-xs">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted">{s.name}</span>
                    <span className="ml-auto font-semibold text-foreground">{s.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Work by label */}
          <Card title="Work by label">
            <ul className="space-y-3.5">
              {LABELS.map((l) => (
                <li key={l.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground/90">{l.name}</span>
                    <span className="text-muted">{l.count}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className={cn("h-full rounded-full", l.color)} style={{ width: `${(l.count / LABEL_TOTAL) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Team workload */}
          <Card title="Team workload">
            <ul className="space-y-3">
              {WORKLOAD.map((m) => (
                <li key={m.who} className="flex items-center gap-3">
                  <Avatar who={m.who} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="truncate text-foreground/90">{MEMBERS[m.who].name}</span>
                      <span className="text-muted">{m.load}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${(m.load / WORKLOAD_MAX) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
