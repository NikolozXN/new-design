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
} from "lucide-react";

/**
 * A theme-aware, data-rich mock of the Flowly app shown in the hero.
 * Replace this with a real screenshot (<Image />) when you have one.
 */

type Member = { initials: string; from: string; to: string };

const MEMBERS: Record<string, Member> = {
  SC: { initials: "SC", from: "#7c3aed", to: "#a855f7" },
  ML: { initials: "ML", from: "#0ea5e9", to: "#22d3ee" },
  PN: { initials: "PN", from: "#f59e0b", to: "#f97316" },
  DO: { initials: "DO", from: "#10b981", to: "#34d399" },
  ER: { initials: "ER", from: "#ec4899", to: "#f43f5e" },
};

function Avatar({ who, className = "" }: { who: keyof typeof MEMBERS; className?: string }) {
  const m = MEMBERS[who];
  return (
    <span
      className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-2 ring-surface ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, ${m.from}, ${m.to})` }}
    >
      {m.initials}
    </span>
  );
}

const LABELS = {
  Design: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
  Eng: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
  Research: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
  Content: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  Growth: "bg-rose-500/15 text-rose-600 dark:text-rose-300",
} as const;

type Task = {
  label: keyof typeof LABELS;
  title: string;
  who: (keyof typeof MEMBERS)[];
  due?: string;
  comments?: number;
  subtasks?: string;
  done?: boolean;
};

const COLUMNS: { title: string; dot: string; tasks: Task[] }[] = [
  {
    title: "Backlog",
    dot: "bg-muted/40",
    tasks: [
      { label: "Research", title: "Audit competitor pricing pages", who: ["PN"], subtasks: "0/3" },
      { label: "Eng", title: "Set up product analytics events", who: ["ML"], comments: 2 },
    ],
  },
  {
    title: "In progress",
    dot: "bg-primary",
    tasks: [
      {
        label: "Design",
        title: "Redesign onboarding flow",
        who: ["SC", "ER"],
        due: "Jun 4",
        subtasks: "2/5",
        comments: 4,
      },
      { label: "Eng", title: "Build pricing API endpoint", who: ["ML"], due: "Jun 6", comments: 3 },
    ],
  },
  {
    title: "In review",
    dot: "bg-amber-500",
    tasks: [
      { label: "Content", title: "Homepage hero copy v2", who: ["DO"], comments: 1 },
      { label: "Design", title: "Mobile nav prototype", who: ["ER"], subtasks: "4/4" },
    ],
  },
  {
    title: "Done",
    dot: "bg-emerald-500",
    tasks: [
      { label: "Design", title: "Brand color palette", who: ["SC"], done: true },
      { label: "Growth", title: "Q2 referral program", who: ["PN"], done: true },
    ],
  },
];

export function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface text-left shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-4 hidden flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-muted sm:flex">
          <span className="h-2.5 w-2.5 rounded-full border border-emerald-500/60 bg-emerald-500/20" />
          app.flowly.com/acme/website-revamp
        </div>
      </div>

      {/* App body */}
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-3 hidden flex-col border-r border-border bg-surface-2 p-3 lg:flex">
          {/* Workspace switcher */}
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
              A
            </span>
            <span className="text-sm font-semibold text-foreground">Acme Inc</span>
            <ChevronDown className="ml-auto h-3.5 w-3.5 text-muted" />
          </div>

          <nav className="flex flex-col gap-0.5">
            {[
              { icon: LayoutGrid, label: "Boards", active: true },
              { icon: Inbox, label: "Inbox", badge: "3" },
              { icon: CalendarDays, label: "Timeline" },
              { icon: BarChart3, label: "Reports" },
              { icon: Settings, label: "Settings" },
            ].map(({ icon: Icon, label, active, badge }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${
                  active ? "bg-primary/10 font-semibold text-primary" : "text-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {badge && (
                  <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {badge}
                  </span>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Projects
          </div>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {[
              { name: "Website Revamp", color: "bg-violet-500", active: true },
              { name: "Mobile App", color: "bg-emerald-500" },
              { name: "Q3 Marketing", color: "bg-amber-500" },
            ].map((p) => (
              <div
                key={p.name}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] ${
                  p.active ? "font-medium text-foreground" : "text-muted"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${p.color}`} />
                {p.name}
              </div>
            ))}
          </div>

          {/* Plan nudge */}
          <div className="mt-auto rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-3">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Flowly AI
            </div>
            <p className="mt-1 text-[10px] leading-snug text-muted">
              Auto-summarize this sprint and flag at-risk tasks.
            </p>
          </div>
        </aside>

        {/* Main */}
        <div className="col-span-12 lg:col-span-9">
          {/* Top bar */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <div className="text-[11px] text-muted">Projects / Website Revamp</div>
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                Sprint 14 · Board
                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-600 dark:text-emerald-300">
                  On track
                </span>
              </div>
            </div>

            <div className="ml-auto hidden items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-muted sm:flex">
              <Search className="h-3.5 w-3.5" />
              Search tasks
            </div>

            <div className="flex -space-x-1.5">
              <Avatar who="SC" />
              <Avatar who="ML" />
              <Avatar who="ER" />
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-surface-2 text-[9px] font-semibold text-muted ring-2 ring-surface">
                +5
              </span>
            </div>

            <Bell className="hidden h-4 w-4 text-muted sm:block" />

            <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-semibold text-white">
              <Plus className="h-3.5 w-3.5" /> New
            </span>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-3 gap-3 border-b border-border px-4 py-3">
            {[
              { k: "Completed", v: "68%", sub: "+12% this week" },
              { k: "Tasks left", v: "23", sub: "5 due today" },
              { k: "Velocity", v: "41 pts", sub: "Sprint 14" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-border bg-background px-3 py-2">
                <div className="text-[10px] text-muted">{s.k}</div>
                <div className="text-base font-bold text-foreground">{s.v}</div>
                <div className="text-[9px] text-muted">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Board */}
          <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-0.5">
                  <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                  <span className="text-xs font-semibold text-foreground">{col.title}</span>
                  <span className="rounded-full bg-surface-2 px-1.5 text-[9px] font-semibold text-muted">
                    {col.tasks.length}
                  </span>
                </div>

                {col.tasks.map((t) => (
                  <div
                    key={t.title}
                    className="rounded-xl border border-border bg-background p-2.5 shadow-sm"
                  >
                    <span
                      className={`inline-flex rounded-md px-1.5 py-0.5 text-[9px] font-semibold ${LABELS[t.label]}`}
                    >
                      {t.label}
                    </span>
                    <p
                      className={`mt-1.5 text-[12px] font-medium leading-snug ${
                        t.done ? "text-muted line-through" : "text-foreground"
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        {t.who.map((w) => (
                          <Avatar key={w} who={w} />
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-2 text-[9px] text-muted">
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
                        {t.due && (
                          <span className="rounded-md bg-surface-2 px-1.5 py-0.5 font-medium">
                            {t.due}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
