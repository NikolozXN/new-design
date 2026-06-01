"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Inbox,
  CalendarDays,
  BarChart3,
  Settings,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  icon: typeof LayoutGrid;
  label: string;
  href: string;
  badge?: string;
};

export const DASH_NAV: NavItem[] = [
  { icon: LayoutGrid, label: "Boards", href: "/dashboard" },
  { icon: Inbox, label: "Inbox", href: "/dashboard/inbox", badge: "3" },
  { icon: CalendarDays, label: "Timeline", href: "/dashboard/timeline" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const PROJECTS: { name: string; color: string; active?: boolean }[] = [
  { name: "Website Revamp", color: "bg-violet-500", active: true },
  { name: "Mobile App", color: "bg-emerald-500" },
  { name: "Q3 Marketing", color: "bg-amber-500" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-surface-2 p-3 lg:flex">
      <Link
        href="/"
        className="mb-4 flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white">
          A
        </span>
        <span className="text-sm font-semibold text-foreground">Acme Inc</span>
        <ChevronDown className="ml-auto h-3.5 w-3.5 text-muted" />
      </Link>

      <nav className="flex flex-col gap-0.5">
        {DASH_NAV.map(({ icon: Icon, label, href, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors",
                active ? "bg-primary/10 font-semibold text-primary" : "text-muted hover:bg-surface hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
              {badge && (
                <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted">Projects</div>
      <div className="mt-1.5 flex flex-col gap-0.5">
        {PROJECTS.map((p) => (
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
        <Link
          href="/dashboard"
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-primary"
        >
          Try it <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </aside>
  );
}
