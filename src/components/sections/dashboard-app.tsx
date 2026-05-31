"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Inbox,
  CalendarDays,
  BarChart3,
  Settings,
  Search,
  Plus,
  Bell,
  MessageSquare,
  ListChecks,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Filter,
  Rows3,
  GanttChartSquare,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

/* ----------------------------- data ----------------------------- */

const MEMBERS = {
  SC: { from: "#7c3aed", to: "#a855f7" },
  ML: { from: "#0ea5e9", to: "#22d3ee" },
  PN: { from: "#f59e0b", to: "#f97316" },
  DO: { from: "#10b981", to: "#34d399" },
  ER: { from: "#ec4899", to: "#f43f5e" },
  JW: { from: "#6366f1", to: "#818cf8" },
} as const;

type Who = keyof typeof MEMBERS;

const LABELS = {
  Design: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  Eng: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  Research: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Content: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Growth: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
} as const;

type Status = "backlog" | "inprogress" | "review" | "done";

type Task = {
  id: string;
  title: string;
  status: Status;
  label: keyof typeof LABELS;
  who: Who[];
  due: string;
  priority: "High" | "Medium" | "Low";
  progress: number;
  comments?: number;
  subtasks?: string;
  span: [number, number]; // timeline weeks (1-8)
};

const TASKS: Task[] = [
  { id: "FLO-128", title: "Redesign onboarding flow", status: "inprogress", label: "Design", who: ["SC", "ER"], due: "Jun 4", priority: "High", progress: 60, comments: 4, subtasks: "2/5", span: [2, 4] },
  { id: "FLO-131", title: "Build pricing API endpoint", status: "inprogress", label: "Eng", who: ["ML"], due: "Jun 6", priority: "High", progress: 35, comments: 3, span: [3, 5] },
  { id: "FLO-126", title: "Homepage hero copy v2", status: "review", label: "Content", who: ["DO"], due: "Jun 2", priority: "Medium", progress: 90, comments: 1, span: [1, 2] },
  { id: "FLO-119", title: "Mobile nav prototype", status: "review", label: "Design", who: ["ER"], due: "Jun 3", priority: "Medium", progress: 100, subtasks: "4/4", span: [2, 3] },
  { id: "FLO-140", title: "Audit competitor pricing pages", status: "backlog", label: "Research", who: ["PN"], due: "Jun 9", priority: "Low", progress: 0, subtasks: "0/3", span: [4, 6] },
  { id: "FLO-142", title: "Set up product analytics events", status: "backlog", label: "Eng", who: ["ML"], due: "Jun 11", priority: "Medium", progress: 0, comments: 2, span: [5, 7] },
  { id: "FLO-101", title: "Brand color palette", status: "done", label: "Design", who: ["SC"], due: "May 28", priority: "Medium", progress: 100, span: [1, 2] },
  { id: "FLO-094", title: "Q2 referral program", status: "done", label: "Growth", who: ["PN"], due: "May 26", priority: "Low", progress: 100, span: [1, 3] },
];

const COLUMNS: { key: Status; title: string; dot: string }[] = [
  { key: "backlog", title: "Backlog", dot: "bg-muted/40" },
  { key: "inprogress", title: "In progress", dot: "bg-primary" },
  { key: "review", title: "In review", dot: "bg-amber-500" },
  { key: "done", title: "Done", dot: "bg-emerald-500" },
];

const ACTIVITY = [
  { who: "ER" as Who, text: "moved Mobile nav prototype to In review", time: "12m" },
  { who: "ML" as Who, text: "commented on Build pricing API endpoint", time: "48m" },
  { who: "SC" as Who, text: "completed Brand color palette", time: "2h" },
  { who: "DO" as Who, text: "created Homepage hero copy v2", time: "5h" },
  { who: "PN" as Who, text: "closed Q2 referral program", time: "1d" },
];

const KPIS = [
  { k: "Completed", v: "68%", sub: "+12% vs last sprint", icon: CheckCircle2, accent: "text-emerald-500" },
  { k: "In progress", v: "2", sub: "across 2 people", icon: TrendingUp, accent: "text-primary" },
  { k: "Due this week", v: "5", sub: "1 overdue", icon: Clock, accent: "text-amber-500" },
  { k: "Sprint velocity", v: "41 pts", sub: "target 38", icon: BarChart3, accent: "text-sky-500" },
];

/* --------------------------- primitives --------------------------- */

function Avatar({ who, className = "" }: { who: Who; className?: string }) {
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

const PRIORITY: Record<Task["priority"], string> = {
  High: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Low: "bg-slate-500/15 text-slate-500 dark:text-slate-300",
};

function TaskCard({ t }: { t: Task }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3 shadow-sm transition-colors hover:border-primary/30">
      <div className="flex items-center justify-between">
        <span className={cn("inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold", LABELS[t.label])}>
          {t.label}
        </span>
        <span className="text-[10px] font-medium text-muted">{t.id}</span>
      </div>
      <p className={cn("mt-2 text-sm font-medium leading-snug", t.status === "done" ? "text-muted line-through" : "text-foreground")}>
        {t.title}
      </p>

      {t.progress > 0 && t.progress < 100 && (
        <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${t.progress}%` }} />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {t.who.map((w) => (
            <Avatar key={w} who={w} className="h-5 w-5" />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted">
          {t.subtasks && (
            <span className="flex items-center gap-0.5">
              <ListChecks className="h-3 w-3" />
              {t.subtasks}
            </span>
          )}
          {t.comments && (
            <span className="flex items-center gap-0.5">
              <MessageSquare className="h-3 w-3" />
              {t.comments}
            </span>
          )}
          <span className="rounded-md bg-surface-2 px-1.5 py-0.5 font-medium">{t.due}</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- views ----------------------------- */

function BoardView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((col) => {
        const items = TASKS.filter((t) => t.status === col.key);
        return (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-0.5">
              <span className={cn("h-2 w-2 rounded-full", col.dot)} />
              <span className="text-sm font-semibold text-foreground">{col.title}</span>
              <span className="rounded-full bg-surface-2 px-1.5 text-[10px] font-semibold text-muted">{items.length}</span>
              <button className="ml-auto text-muted transition-colors hover:text-foreground" aria-label="Add task">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {items.map((t) => (
              <TaskCard key={t.id} t={t} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function ListView() {
  return (
    <div className="overflow-hidden rounded-card border border-border">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border bg-surface-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <span>Task</span>
        <span className="hidden sm:block">Assignee</span>
        <span className="hidden sm:block">Priority</span>
        <span className="hidden sm:block">Due</span>
        <span className="text-right sm:text-left">Status</span>
      </div>
      {TASKS.map((t) => (
        <div
          key={t.id}
          className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 hover:bg-surface-2/50 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className={cn("inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold", LABELS[t.label])}>
              {t.label}
            </span>
            <span className="truncate text-sm font-medium text-foreground">{t.title}</span>
          </div>
          <div className="hidden -space-x-1.5 sm:flex">
            {t.who.map((w) => (
              <Avatar key={w} who={w} className="h-5 w-5" />
            ))}
          </div>
          <div className="hidden sm:block">
            <span className={cn("inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold", PRIORITY[t.priority])}>
              {t.priority}
            </span>
          </div>
          <span className="hidden text-sm text-muted sm:block">{t.due}</span>
          <div className="flex items-center justify-end gap-1.5 sm:justify-start">
            <span className={cn("h-1.5 w-1.5 rounded-full", COLUMNS.find((c) => c.key === t.status)?.dot)} />
            <span className="text-xs text-muted">{COLUMNS.find((c) => c.key === t.status)?.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function TimelineView() {
  const weeks = Array.from({ length: 8 }, (_, i) => i + 1);
  return (
    <div className="overflow-x-auto rounded-card border border-border">
      <div className="min-w-[680px]">
        <div className="grid grid-cols-[200px_1fr] border-b border-border bg-surface-2">
          <div className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">Task</div>
          <div className="grid grid-cols-8">
            {weeks.map((w) => (
              <div key={w} className="px-2 py-2.5 text-center text-[11px] font-medium text-muted">
                W{w}
              </div>
            ))}
          </div>
        </div>
        {TASKS.map((t) => (
          <div key={t.id} className="grid grid-cols-[200px_1fr] items-center border-b border-border last:border-0">
            <div className="truncate px-4 py-3 text-sm font-medium text-foreground">{t.title}</div>
            <div className="relative grid grid-cols-8 py-3">
              {weeks.map((w) => (
                <div key={w} className="h-7 border-l border-border/50" />
              ))}
              <div
                className="absolute top-1/2 flex h-6 -translate-y-1/2 items-center rounded-full bg-gradient-to-r from-primary to-accent px-2 text-[10px] font-semibold text-primary-foreground shadow-sm"
                style={{
                  left: `${((t.span[0] - 1) / 8) * 100}%`,
                  width: `${((t.span[1] - t.span[0] + 1) / 8) * 100}%`,
                }}
              >
                <span className="truncate">{t.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- shell ----------------------------- */

const VIEWS = [
  { key: "board", label: "Board", icon: LayoutGrid },
  { key: "list", label: "List", icon: Rows3 },
  { key: "timeline", label: "Timeline", icon: GanttChartSquare },
] as const;

export function DashboardApp() {
  const [view, setView] = useState<(typeof VIEWS)[number]["key"]>("board");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface-2 p-3 lg:flex">
        <Link href="/" className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
            A
          </span>
          <span className="text-sm font-semibold text-foreground">Acme Inc</span>
          <ChevronDown className="ml-auto h-3.5 w-3.5 text-muted" />
        </Link>

        <nav className="flex flex-col gap-0.5">
          {[
            { icon: LayoutGrid, label: "Boards", active: true },
            { icon: Inbox, label: "Inbox", badge: "3" },
            { icon: CalendarDays, label: "Timeline" },
            { icon: BarChart3, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map(({ icon: Icon, label, active, badge }) => (
            <a
              key={label}
              href="/dashboard"
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px]",
                active ? "bg-primary/10 font-semibold text-primary" : "text-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badge && (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">{badge}</span>
              )}
            </a>
          ))}
        </nav>

        <div className="mt-5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Projects</div>
        <div className="mt-1.5 flex flex-col gap-0.5">
          {[
            { name: "Website Revamp", color: "bg-violet-500", active: true },
            { name: "Mobile App", color: "bg-emerald-500" },
            { name: "Q3 Marketing", color: "bg-amber-500" },
          ].map((p) => (
            <a
              key={p.name}
              href="/dashboard"
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px]",
                p.active ? "font-medium text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", p.color)} />
              {p.name}
            </a>
          ))}
        </div>

        <div className="mt-auto rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-3">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Flowly AI
          </div>
          <p className="mt-1 text-[11px] leading-snug text-muted">Summarize this sprint and flag at-risk tasks.</p>
          <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
            Try it <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur sm:px-6">
          <div className="min-w-0">
            <div className="text-[11px] text-muted">Projects / Website Revamp</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              Sprint 14 · Board
              <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">
                On track
              </span>
            </div>
          </div>

          <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted md:flex">
            <Search className="h-3.5 w-3.5" />
            Search tasks
            <kbd className="ml-2 rounded border border-border bg-surface-2 px-1 text-[10px]">⌘K</kbd>
          </div>

          <div className="hidden -space-x-1.5 sm:flex">
            <Avatar who="SC" />
            <Avatar who="ML" />
            <Avatar who="ER" />
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-muted ring-2 ring-surface">
              +5
            </span>
          </div>

          <button className="text-muted transition-colors hover:text-foreground" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <button className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-b from-primary to-primary-hover px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/30">
            <Plus className="h-3.5 w-3.5" /> New
          </button>
        </header>

        {/* Content */}
        <div className="flex flex-1 gap-6 p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            {/* KPIs */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {KPIS.map((s) => (
                <div key={s.k} className="rounded-card border border-border bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted">{s.k}</span>
                    <s.icon className={cn("h-4 w-4", s.accent)} />
                  </div>
                  <div className="mt-1.5 font-display text-2xl font-bold text-foreground">{s.v}</div>
                  <div className="mt-0.5 text-[11px] text-muted">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex items-center gap-3">
              <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5">
                {VIEWS.map((v) => {
                  const active = view === v.key;
                  return (
                    <button
                      key={v.key}
                      type="button"
                      onClick={() => setView(v.key)}
                      className="relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium"
                    >
                      {active && (
                        <motion.span
                          layoutId="view-pill"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          className="absolute inset-0 rounded-md bg-surface-2"
                        />
                      )}
                      <span className={cn("relative z-10 inline-flex items-center gap-1.5", active ? "text-foreground" : "text-muted")}>
                        <v.icon className="h-3.5 w-3.5" />
                        {v.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </button>
            </div>

            {/* View */}
            <div className="mt-5">
              {view === "board" && <BoardView />}
              {view === "list" && <ListView />}
              {view === "timeline" && <TimelineView />}
            </div>
          </div>

          {/* Right rail */}
          <aside className="hidden w-72 shrink-0 xl:block">
            <div className="rounded-card border border-border bg-surface p-4">
              <h3 className="text-sm font-semibold text-foreground">Activity</h3>
              <ul className="mt-4 flex flex-col gap-4">
                {ACTIVITY.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <Avatar who={a.who} className="mt-0.5 h-6 w-6" />
                    <div className="min-w-0">
                      <p className="text-[13px] leading-snug text-foreground/90">
                        <span className="font-semibold">{a.who}</span> {a.text}
                      </p>
                      <span className="text-[11px] text-muted">{a.time} ago</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-card border border-border bg-surface p-4">
              <h3 className="text-sm font-semibold text-foreground">Sprint progress</h3>
              <div className="mt-3 flex items-end justify-between">
                <span className="font-display text-3xl font-bold text-foreground">68%</span>
                <span className="text-xs text-emerald-500">+12%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: "68%" }} />
              </div>
              <p className="mt-2 text-[11px] text-muted">23 of 34 tasks complete · ends in 4 days</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
