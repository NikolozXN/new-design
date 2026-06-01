"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AtSign,
  MessageSquare,
  UserPlus,
  CheckCircle2,
  Clock,
  CheckCheck,
  Inbox as InboxIcon,
} from "lucide-react";
import { DashboardShell } from "./shell";
import { Avatar, type Who } from "./people";
import { cn } from "@/lib/utils";

type NotifType = "mention" | "comment" | "assigned" | "status" | "due";

type Notif = {
  id: number;
  who: Who;
  type: NotifType;
  action: string;
  target: string;
  time: string;
  group: "Today" | "Earlier";
  unread: boolean;
};

const TYPE_META: Record<NotifType, { icon: typeof AtSign; tint: string }> = {
  mention: { icon: AtSign, tint: "bg-violet-500/15 text-violet-600 dark:text-violet-300" },
  comment: { icon: MessageSquare, tint: "bg-sky-500/15 text-sky-600 dark:text-sky-300" },
  assigned: { icon: UserPlus, tint: "bg-amber-500/15 text-amber-600 dark:text-amber-300" },
  status: { icon: CheckCircle2, tint: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" },
  due: { icon: Clock, tint: "bg-rose-500/15 text-rose-600 dark:text-rose-300" },
};

const INITIAL: Notif[] = [
  { id: 1, who: "ER", type: "mention", action: "mentioned you on", target: "Mobile nav prototype", time: "12m", group: "Today", unread: true },
  { id: 2, who: "ML", type: "comment", action: "replied to your comment on", target: "Pricing API endpoint", time: "48m", group: "Today", unread: true },
  { id: 3, who: "PN", type: "assigned", action: "assigned you to", target: "Competitor pricing audit", time: "2h", group: "Today", unread: true },
  { id: 4, who: "DO", type: "status", action: "moved to In review", target: "Homepage hero copy", time: "5h", group: "Today", unread: false },
  { id: 5, who: "SC", type: "comment", action: "left a note on", target: "Onboarding flow redesign", time: "Yesterday", group: "Earlier", unread: false },
  { id: 6, who: "JW", type: "due", action: "set a due date on", target: "Analytics events setup", time: "Yesterday", group: "Earlier", unread: false },
  { id: 7, who: "SC", type: "status", action: "completed", target: "Brand color palette", time: "2d", group: "Earlier", unread: false },
];

const TABS = ["All", "Unread", "Mentions"] as const;
type Tab = (typeof TABS)[number];

export function InboxView() {
  const [items, setItems] = useState<Notif[]>(INITIAL);
  const [tab, setTab] = useState<Tab>("All");

  const unreadCount = items.filter((n) => n.unread).length;

  const filtered = useMemo(() => {
    if (tab === "Unread") return items.filter((n) => n.unread);
    if (tab === "Mentions") return items.filter((n) => n.type === "mention");
    return items;
  }, [items, tab]);

  const groups = useMemo(() => {
    const order: Notif["group"][] = ["Today", "Earlier"];
    return order
      .map((g) => ({ group: g, rows: filtered.filter((n) => n.group === g) }))
      .filter((g) => g.rows.length > 0);
  }, [filtered]);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  const markRead = (id: number) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));

  return (
    <DashboardShell breadcrumb="Workspace / Notifications" title="Inbox" right={undefined}>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center rounded-lg border border-border bg-surface p-0.5">
            {TABS.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="relative inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium"
                >
                  {active && (
                    <motion.span
                      layoutId="inbox-tab"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-md bg-surface-2"
                    />
                  )}
                  <span className={cn("relative z-10", active ? "text-foreground" : "text-muted")}>
                    {t}
                    {t === "Unread" && unreadCount > 0 && (
                      <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={markAll}
            disabled={unreadCount === 0}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-card border border-dashed border-border bg-surface py-16 text-center">
            <InboxIcon className="h-8 w-8 text-muted" />
            <p className="mt-3 text-sm font-medium text-foreground">You&apos;re all caught up</p>
            <p className="mt-1 text-xs text-muted">No notifications in this view.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {groups.map(({ group, rows }) => (
              <div key={group}>
                <div className="px-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{group}</div>
                <div className="mt-2 overflow-hidden rounded-card border border-border bg-surface">
                  {rows.map((n, i) => {
                    const meta = TYPE_META[n.type];
                    const Icon = meta.icon;
                    return (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => markRead(n.id)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-2",
                          i !== 0 && "border-t border-border"
                        )}
                      >
                        <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", meta.tint)}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <Avatar who={n.who} className="hidden sm:flex" />
                        <p className="min-w-0 flex-1 text-[13px] leading-snug text-foreground/90">
                          <span className="font-semibold text-foreground">{n.who}</span> {n.action}{" "}
                          <span className="font-medium text-foreground">{n.target}</span>
                        </p>
                        <span className="shrink-0 text-[11px] text-muted">{n.time}</span>
                        <span
                          className={cn(
                            "h-2 w-2 shrink-0 rounded-full",
                            n.unread ? "bg-primary" : "bg-transparent"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
