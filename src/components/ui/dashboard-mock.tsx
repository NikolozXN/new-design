import {
  CheckCircle2,
  Circle,
  Clock,
  LayoutDashboard,
  Inbox,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

/**
 * A lightweight, theme-aware mock of the Flowly app shown in the hero.
 * Replace this with a real screenshot (<Image />) when you have one.
 */
export function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/10 ring-1 ring-black/5 dark:shadow-black/40">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <div className="ml-4 hidden flex-1 items-center rounded-md border border-border bg-background px-3 py-1 text-xs text-muted sm:flex">
          app.flowly.com/board
        </div>
      </div>

      {/* App body */}
      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <aside className="col-span-3 hidden flex-col gap-1 border-r border-border bg-surface-2 p-4 md:flex">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: Inbox, label: "Inbox" },
            { icon: Calendar, label: "Timeline" },
            { icon: BarChart3, label: "Reports" },
            { icon: Settings, label: "Settings" },
          ].map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-primary/10 font-semibold text-primary"
                  : "text-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </aside>

        {/* Board */}
        <div className="col-span-12 p-5 md:col-span-9">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="h-3 w-28 rounded bg-foreground/80" />
              <div className="mt-2 h-2 w-40 rounded bg-muted/40" />
            </div>
            <div className="h-8 w-24 rounded-lg bg-primary/90" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { title: "To do", items: [Circle, Circle], tint: "bg-muted/40" },
              {
                title: "In progress",
                items: [Clock, Clock, Circle],
                tint: "bg-primary/60",
              },
              { title: "Done", items: [CheckCircle2, CheckCircle2], tint: "bg-green-500/60" },
            ].map((col) => (
              <div key={col.title} className="rounded-xl border border-border bg-background p-3">
                <div className="mb-3 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.tint}`} />
                  <span className="text-xs font-semibold text-foreground">
                    {col.title}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {col.items.map((Icon, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-border bg-surface p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-muted" />
                        <div className="h-2 w-full rounded bg-muted/30" />
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/30" />
                        <div className="h-2 w-16 rounded bg-muted/25" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
