"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Inbox,
  CalendarDays,
  BarChart3,
  Settings,
  Search,
  Plus,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Filter,
  Rows3,
  GanttChartSquare,
  Trash2,
  X,
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
const MEMBER_KEYS = Object.keys(MEMBERS) as Who[];

const LABELS = {
  Design: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  Eng: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  Research: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Content: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Growth: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
} as const;
type Label = keyof typeof LABELS;
const LABEL_KEYS = Object.keys(LABELS) as Label[];

type Status = "backlog" | "inprogress" | "review" | "done";
const STATUS_ORDER: Status[] = ["backlog", "inprogress", "review", "done"];

type Priority = "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  status: Status;
  label: Label;
  who: Who[];
  due: string;
  priority: Priority;
  progress: number;
  comments?: number;
  subtasks?: string;
  span: [number, number];
};

const INITIAL_TASKS: Task[] = [
  { id: "FLO-128", title: "Onboarding flow redesign", status: "inprogress", label: "Design", who: ["SC", "ER"], due: "Jun 4", priority: "High", progress: 60, comments: 4, subtasks: "2/5", span: [2, 4] },
  { id: "FLO-131", title: "Pricing API endpoint", status: "inprogress", label: "Eng", who: ["ML"], due: "Jun 6", priority: "High", progress: 35, comments: 3, span: [3, 5] },
  { id: "FLO-126", title: "Homepage hero copy", status: "review", label: "Content", who: ["DO"], due: "Jun 2", priority: "Medium", progress: 90, comments: 1, span: [1, 2] },
  { id: "FLO-119", title: "Mobile nav prototype", status: "review", label: "Design", who: ["ER"], due: "Jun 3", priority: "Medium", progress: 100, subtasks: "4/4", span: [2, 3] },
  { id: "FLO-140", title: "Competitor pricing audit", status: "backlog", label: "Research", who: ["PN"], due: "Jun 9", priority: "Low", progress: 0, subtasks: "0/3", span: [4, 6] },
  { id: "FLO-142", title: "Analytics events setup", status: "backlog", label: "Eng", who: ["ML"], due: "Jun 11", priority: "Medium", progress: 0, comments: 2, span: [5, 7] },
  { id: "FLO-101", title: "Brand color palette", status: "done", label: "Design", who: ["SC"], due: "May 28", priority: "Medium", progress: 100, span: [1, 2] },
  { id: "FLO-094", title: "Q2 referral program", status: "done", label: "Growth", who: ["PN"], due: "May 26", priority: "Low", progress: 100, span: [1, 3] },
];

const COLUMNS: { key: Status; title: string; dot: string }[] = [
  { key: "backlog", title: "Backlog", dot: "bg-muted/40" },
  { key: "inprogress", title: "In progress", dot: "bg-primary" },
  { key: "review", title: "In review", dot: "bg-amber-500" },
  { key: "done", title: "Done", dot: "bg-emerald-500" },
];
const statusMeta = (s: Status) => COLUMNS.find((c) => c.key === s)!;

const PRIORITY: Record<Priority, string> = {
  High: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
  Medium: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Low: "bg-slate-500/15 text-slate-500 dark:text-slate-300",
};

const ACTIVITY = [
  { who: "ER" as Who, text: "moved Mobile nav prototype to In review", time: "12m" },
  { who: "ML" as Who, text: "commented on Pricing API endpoint", time: "48m" },
  { who: "SC" as Who, text: "completed Brand color palette", time: "2h" },
  { who: "DO" as Who, text: "created Homepage hero copy", time: "5h" },
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

type Handlers = {
  onToggleDone: (id: string) => void;
  onMove: (id: string, dir: -1 | 1) => void;
  onDelete: (id: string) => void;
};

function TaskCard({ t, h }: { t: Task; h: Handlers }) {
  const idx = STATUS_ORDER.indexOf(t.status);
  const done = t.status === "done";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group/card rounded-xl border border-border bg-surface p-3.5 shadow-sm transition-colors hover:border-primary/30"
    >
      <div className="flex items-start gap-2.5">
        <button
          type="button"
          onClick={() => h.onToggleDone(t.id)}
          aria-label={done ? "Mark as not done" : "Mark as done"}
          className="mt-0.5 shrink-0"
        >
          {done ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : (
            <Circle className="h-4 w-4 text-muted transition-colors hover:text-primary" />
          )}
        </button>
        <p
          title={t.title}
          className={cn(
            "line-clamp-2 min-h-[2.4rem] flex-1 text-sm font-medium leading-snug",
            done ? "text-muted line-through" : "text-foreground"
          )}
        >
          {t.title}
        </p>
        <button
          type="button"
          onClick={() => h.onDelete(t.id)}
          aria-label="Delete task"
          className="-mr-1 mt-0.5 text-muted opacity-0 transition-opacity hover:text-rose-500 group-hover/card:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={cn("inline-flex rounded-md px-1.5 py-0.5 text-[10px] font-semibold", LABELS[t.label])}>
            {t.label}
          </span>
          <div className="flex -space-x-1.5">
            {t.who.map((w) => (
              <Avatar key={w} who={w} className="h-5 w-5" />
            ))}
          </div>
        </div>

        {/* Due (default) → move controls on hover */}
        <span className="text-[11px] text-muted group-hover/card:hidden">{t.due}</span>
        <div className="hidden items-center gap-1 group-hover/card:flex">
          <button
            type="button"
            disabled={idx === 0}
            onClick={() => h.onMove(t.id, -1)}
            aria-label="Move left"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            disabled={idx === STATUS_ORDER.length - 1}
            onClick={() => h.onMove(t.id, 1)}
            aria-label="Move right"
            className="flex h-6 w-6 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------------------------- views ----------------------------- */

function BoardView({ tasks, h, onAdd }: { tasks: Task[]; h: Handlers; onAdd: (s: Status) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {COLUMNS.map((col) => {
        const items = tasks.filter((t) => t.status === col.key);
        return (
          <div key={col.key} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-0.5">
              <span className={cn("h-2 w-2 rounded-full", col.dot)} />
              <span className="text-sm font-semibold text-foreground">{col.title}</span>
              <span className="rounded-full bg-surface-2 px-1.5 text-[10px] font-semibold text-muted">{items.length}</span>
              <button
                type="button"
                onClick={() => onAdd(col.key)}
                className="ml-auto text-muted transition-colors hover:text-foreground"
                aria-label={`Add task to ${col.title}`}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <AnimatePresence initial={false}>
                {items.map((t) => (
                  <TaskCard key={t.id} t={t} h={h} />
                ))}
              </AnimatePresence>
              {items.length === 0 && (
                <button
                  type="button"
                  onClick={() => onAdd(col.key)}
                  className="rounded-xl border border-dashed border-border py-6 text-xs text-muted transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  + Add task
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ListView({ tasks, h }: { tasks: Task[]; h: Handlers }) {
  return (
    <div className="overflow-hidden rounded-card border border-border">
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border bg-surface-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
        <span>Task</span>
        <span className="hidden sm:block">Assignee</span>
        <span className="hidden sm:block">Priority</span>
        <span className="hidden sm:block">Due</span>
        <span className="text-right sm:text-left">Status</span>
      </div>
      <AnimatePresence initial={false}>
        {tasks.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-0 hover:bg-surface-2/50 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <button type="button" onClick={() => h.onToggleDone(t.id)} aria-label="Toggle done" className="shrink-0">
                {t.status === "done" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Circle className="h-4 w-4 text-muted hover:text-primary" />
                )}
              </button>
              <span className={cn("inline-flex shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold", LABELS[t.label])}>
                {t.label}
              </span>
              <span className={cn("truncate text-sm font-medium", t.status === "done" ? "text-muted line-through" : "text-foreground")}>
                {t.title}
              </span>
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
              <span className={cn("h-1.5 w-1.5 rounded-full", statusMeta(t.status).dot)} />
              <span className="text-xs text-muted">{statusMeta(t.status).title}</span>
              <button
                type="button"
                onClick={() => h.onDelete(t.id)}
                aria-label="Delete"
                className="ml-2 text-muted opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function TimelineView({ tasks }: { tasks: Task[] }) {
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
        {tasks.map((t) => (
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

/* --------------------------- new task modal --------------------------- */

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function NewTaskModal({
  open,
  defaultStatus,
  onClose,
  onCreate,
}: {
  open: boolean;
  defaultStatus: Status;
  onClose: () => void;
  onCreate: (t: Omit<Task, "id" | "span">) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <TaskForm defaultStatus={defaultStatus} onClose={onClose} onCreate={onCreate} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TaskForm({
  defaultStatus,
  onClose,
  onCreate,
}: {
  defaultStatus: Status;
  onClose: () => void;
  onCreate: (t: Omit<Task, "id" | "span">) => void;
}) {
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState<Label>("Design");
  const [who, setWho] = useState<Who>("SC");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [due, setDue] = useState("");
  const [status, setStatus] = useState<Status>(defaultStatus);

  return (
          <motion.form
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              if (!title.trim()) return;
              onCreate({
                title: title.trim(),
                label,
                who: [who],
                priority,
                due: due.trim() || "—",
                status,
                progress: status === "done" ? 100 : 0,
              });
              onClose();
            }}
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-surface p-5 shadow-2xl sm:max-h-[88vh] sm:rounded-2xl sm:p-6"
          >
            {/* Mobile grab handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />

            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-foreground">New task</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4">
              <div>
                <label htmlFor="t-title" className="mb-1.5 block text-sm font-medium text-foreground">
                  Title
                </label>
                <input
                  id="t-title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Draft Q3 launch plan"
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="t-label" className="mb-1.5 block text-sm font-medium text-foreground">
                    Label
                  </label>
                  <select id="t-label" value={label} onChange={(e) => setLabel(e.target.value as Label)} className={fieldClass}>
                    {LABEL_KEYS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="t-assignee" className="mb-1.5 block text-sm font-medium text-foreground">
                    Assignee
                  </label>
                  <select id="t-assignee" value={who} onChange={(e) => setWho(e.target.value as Who)} className={fieldClass}>
                    {MEMBER_KEYS.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="t-priority" className="mb-1.5 block text-sm font-medium text-foreground">
                    Priority
                  </label>
                  <select id="t-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={fieldClass}>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="t-status" className="mb-1.5 block text-sm font-medium text-foreground">
                    Status
                  </label>
                  <select id="t-status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className={fieldClass}>
                    {COLUMNS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="t-due" className="mb-1.5 block text-sm font-medium text-foreground">
                  Due date
                </label>
                <input id="t-due" value={due} onChange={(e) => setDue(e.target.value)} placeholder="e.g. Jun 12" className={fieldClass} />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-primary to-primary-hover px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/30 hover:-translate-y-0.5"
              >
                <Plus className="h-4 w-4" />
                Create task
              </button>
            </div>
          </motion.form>
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
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [query, setQuery] = useState("");
  const [hideDone, setHideDone] = useState(false);
  const [seq, setSeq] = useState(143);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<Status>("backlog");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter(
      (t) => (!q || t.title.toLowerCase().includes(q)) && (!hideDone || t.status !== "done")
    );
  }, [tasks, query, hideDone]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "inprogress").length;
    return {
      total,
      done,
      inProgress,
      left: total - done,
      pct: total ? Math.round((done / total) * 100) : 0,
    };
  }, [tasks]);

  const handlers: Handlers = {
    onToggleDone: (id) =>
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id
            ? t.status === "done"
              ? { ...t, status: "inprogress", progress: 60 }
              : { ...t, status: "done", progress: 100 }
            : t
        )
      ),
    onMove: (id, dir) =>
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const i = STATUS_ORDER.indexOf(t.status);
          const ni = Math.min(STATUS_ORDER.length - 1, Math.max(0, i + dir));
          const status = STATUS_ORDER[ni];
          return { ...t, status, progress: status === "done" ? 100 : t.progress };
        })
      ),
    onDelete: (id) => setTasks((prev) => prev.filter((t) => t.id !== id)),
  };

  const createTask = (data: Omit<Task, "id" | "span">) => {
    setTasks((prev) => [{ ...data, id: `FLO-${seq}`, span: [1, 2] }, ...prev]);
    setSeq((n) => n + 1);
  };

  const openModal = (status: Status) => {
    setModalStatus(status);
    setModalOpen(true);
  };

  const KPIS = [
    { k: "Completed", v: `${stats.pct}%` },
    { k: "In progress", v: `${stats.inProgress}` },
    { k: "Tasks left", v: `${stats.left}` },
    { k: "Velocity", v: "41 pts" },
  ];

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
            <button
              key={label}
              type="button"
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px]",
                active ? "bg-primary/10 font-semibold text-primary" : "text-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badge && (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">{badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="mt-5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Projects</div>
        <div className="mt-1.5 flex flex-col gap-0.5">
          {[
            { name: "Website Revamp", color: "bg-violet-500", active: true },
            { name: "Mobile App", color: "bg-emerald-500" },
            { name: "Q3 Marketing", color: "bg-amber-500" },
          ].map((p) => (
            <button
              key={p.name}
              type="button"
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px]",
                p.active ? "font-medium text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", p.color)} />
              {p.name}
            </button>
          ))}
        </div>

        <div className="mt-auto rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-3">
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Flowly AI
          </div>
          <p className="mt-1 text-[11px] leading-snug text-muted">Summarize this sprint and flag at-risk tasks.</p>
          <button
            type="button"
            onClick={() => openModal("backlog")}
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary"
          >
            Try it <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-border bg-background/80 px-4 py-3 backdrop-blur sm:gap-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] text-muted">Projects / Website Revamp</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="truncate">Sprint 14 · Board</span>
              <span className="hidden shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300 sm:inline">
                On track
              </span>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs lg:flex">
              <Search className="h-3.5 w-3.5 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks"
                className="w-28 bg-transparent text-foreground placeholder:text-muted outline-none"
              />
            </div>

            <div className="hidden -space-x-1.5 md:flex">
              <Avatar who="SC" />
              <Avatar who="ML" />
              <Avatar who="ER" />
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-surface-2 text-[10px] font-semibold text-muted ring-2 ring-surface">
                +5
              </span>
            </div>

            <button className="hidden text-muted transition-colors hover:text-foreground sm:block" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => openModal("backlog")}
              className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-b from-primary to-primary-hover px-2.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/30 sm:px-3"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 gap-6 p-4 sm:p-6">
          <div className="min-w-0 flex-1">
            {/* KPIs */}
            <div className="grid grid-cols-2 overflow-hidden rounded-card border border-border bg-surface sm:grid-cols-4">
              {KPIS.map((s, i) => (
                <div
                  key={s.k}
                  className={cn(
                    "px-5 py-4",
                    i % 2 === 1 && "border-l border-border",
                    i >= 2 && "border-t border-border sm:border-t-0",
                    i !== 0 && "sm:border-l sm:border-border"
                  )}
                >
                  <div className="text-xs text-muted">{s.k}</div>
                  <div className="mt-1 font-display text-2xl font-bold text-foreground">{s.v}</div>
                </div>
              ))}
            </div>

            {/* Toolbar */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
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

              <button
                type="button"
                onClick={() => setHideDone((v) => !v)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  hideDone
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-surface text-muted hover:text-foreground"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
                {hideDone ? "Showing active" : "Hide done"}
              </button>

              {/* Mobile search */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs md:hidden">
                <Search className="h-3.5 w-3.5 text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="w-24 bg-transparent text-foreground placeholder:text-muted outline-none"
                />
              </div>

              <span className="ml-auto text-xs text-muted">{filtered.length} tasks</span>
            </div>

            {/* View */}
            <div className="mt-5">
              {view === "board" && <BoardView tasks={filtered} h={handlers} onAdd={openModal} />}
              {view === "list" && <ListView tasks={filtered} h={handlers} />}
              {view === "timeline" && <TimelineView tasks={filtered} />}
            </div>
          </div>

          {/* Right rail */}
          <aside className="hidden w-72 shrink-0 xl:block">
            <div className="rounded-card border border-border bg-surface p-5">
              <h3 className="text-sm font-semibold text-foreground">Recent activity</h3>
              <ul className="mt-5 flex flex-col gap-5">
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
          </aside>
        </div>
      </div>

      <NewTaskModal open={modalOpen} defaultStatus={modalStatus} onClose={() => setModalOpen(false)} onCreate={createTask} />
    </div>
  );
}
