"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar } from "./people";
import { DASH_NAV } from "./sidebar";
import { cn } from "@/lib/utils";

export function DashboardTopbar({
  breadcrumb,
  title,
  status,
  right,
}: {
  breadcrumb: string;
  title: string;
  status?: string;
  right?: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <div className="truncate text-[11px] text-muted">{breadcrumb}</div>
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <span className="truncate">{title}</span>
            {status && (
              <span className="hidden shrink-0 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300 sm:inline">
                {status}
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {right}

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
        </div>
      </div>

      {/* Mobile page nav — the full sidebar is desktop only */}
      <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">
        {DASH_NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                active ? "bg-primary/10 text-primary" : "text-muted hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
