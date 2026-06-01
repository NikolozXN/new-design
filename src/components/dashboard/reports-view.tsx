import { TrendingUp, TrendingDown, Download } from "lucide-react";
import { DashboardShell } from "./shell";
import { Avatar, MEMBERS, type Who } from "./people";
import { cn } from "@/lib/utils";

const KPIS = [
  { k: "Completed", v: "38", delta: "+12%", up: true, sub: "vs last sprint" },
  { k: "Velocity", v: "41", unit: "pts", delta: "+6%", up: true, sub: "8-sprint avg 37" },
  { k: "Cycle time", v: "2.4", unit: "d", delta: "-0.5d", up: true, sub: "time in progress" },
  { k: "On-time rate", v: "92", unit: "%", delta: "-3%", up: false, sub: "of due tasks" },
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
const THROUGHPUT_MAX = 45;

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

function Card({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-card border border-border bg-surface p-5", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {action}
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function ReportsView() {
  return (
    <DashboardShell breadcrumb="Projects / Website Revamp" title="Reports" status="On track">
      <div className="space-y-6 p-4 sm:p-6">
        {/* Intro */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-bold text-foreground">Sprint 14 overview</h2>
            <p className="mt-0.5 text-xs text-muted">May 19 – Jun 1 · Website Revamp</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted">Last 14 days</span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {KPIS.map((s) => (
            <div
              key={s.k}
              className="group relative overflow-hidden rounded-card border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 sm:p-5"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-accent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="text-xs text-muted">{s.k}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">{s.v}</span>
                {s.unit && <span className="text-sm font-medium text-muted">{s.unit}</span>}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    s.up ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                  )}
                >
                  {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {s.delta}
                </span>
                <span className="truncate text-[11px] text-muted">{s.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Throughput */}
        <Card
          title="Throughput — tasks completed per week"
          action={<span className="hidden text-[11px] text-muted sm:block">Peak 41 · avg 29</span>}
        >
          <div>
            <div className="relative h-52">
              <div className="pointer-events-none absolute inset-0 flex flex-col-reverse justify-between">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className={cn("border-t", i === 0 ? "border-border" : "border-dashed border-border/50")} />
                ))}
              </div>
              <div className="relative flex h-full items-end gap-1.5 px-0.5 sm:gap-3">
                {THROUGHPUT.map((d, i) => {
                  const last = i === THROUGHPUT.length - 1;
                  return (
                    <div key={d.w} className="group/bar relative flex h-full flex-1 items-end">
                      <div
                        className={cn(
                          "relative w-full rounded-t-lg transition-colors",
                          last ? "bg-gradient-to-t from-primary to-accent" : "bg-primary/25 group-hover/bar:bg-primary/45"
                        )}
                        style={{ height: `${(d.v / THROUGHPUT_MAX) * 100}%` }}
                      >
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-muted opacity-0 transition-opacity group-hover/bar:opacity-100">
                          {d.v}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 flex gap-1.5 px-0.5 sm:gap-3">
              {THROUGHPUT.map((d) => (
                <div key={d.w} className="flex-1 text-center text-[10px] text-muted">{d.w}</div>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
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
                    <span className="ml-auto font-semibold text-foreground">{Math.round((s.v / STATUS_TOTAL) * 100)}%</span>
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
