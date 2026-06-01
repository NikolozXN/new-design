"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Send,
  ArrowLeft,
  Phone,
  Video,
  Info,
  CheckCheck,
  Plus,
} from "lucide-react";
import { DashboardShell } from "./shell";
import { Avatar, MEMBERS, type Who } from "./people";
import { cn } from "@/lib/utils";

type Msg = { id: number; from: "me" | "them"; text: string; time: string };

type Convo = {
  id: number;
  who: Who;
  online: boolean;
  lastActive: string;
  unread: number;
  messages: Msg[];
};

const INITIAL: Convo[] = [
  {
    id: 1,
    who: "ER",
    online: true,
    lastActive: "Active now",
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Hey! Pushed the new mobile nav prototype 🎉", time: "9:24 AM" },
      { id: 2, from: "them", text: "Can you take a look before standup?", time: "9:24 AM" },
      { id: 3, from: "me", text: "On it — looking now", time: "9:31 AM" },
      { id: 4, from: "them", text: "The hamburger animation feels much smoother now", time: "9:32 AM" },
      { id: 5, from: "them", text: "Let me know if the spacing reads okay on small screens", time: "9:33 AM" },
    ],
  },
  {
    id: 2,
    who: "ML",
    online: true,
    lastActive: "Active now",
    unread: 0,
    messages: [
      { id: 1, from: "me", text: "Pricing API is returning a 500 on /plans", time: "Yesterday" },
      { id: 2, from: "them", text: "Yep, caught it — bad cache key. Fix is in review", time: "Yesterday" },
      { id: 3, from: "me", text: "Legend, thank you 🙏", time: "Yesterday" },
    ],
  },
  {
    id: 3,
    who: "SC",
    online: false,
    lastActive: "Active 2h ago",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Brand palette is locked. Synced the tokens to Figma", time: "2h" },
      { id: 2, from: "me", text: "Perfect, I'll wire them into the theme today", time: "2h" },
    ],
  },
  {
    id: 4,
    who: "DO",
    online: false,
    lastActive: "Active 5h ago",
    unread: 1,
    messages: [
      { id: 1, from: "them", text: "Homepage hero copy is ready for review", time: "5h" },
    ],
  },
  {
    id: 5,
    who: "PN",
    online: false,
    lastActive: "Active yesterday",
    unread: 0,
    messages: [
      { id: 1, from: "them", text: "Sharing the competitor pricing audit shortly", time: "1d" },
      { id: 2, from: "me", text: "No rush — early next week is fine", time: "1d" },
    ],
  },
];

const firstName = (who: Who) => MEMBERS[who].name.split(" ")[0];

export function InboxView() {
  const [convos, setConvos] = useState<Convo[]>(INITIAL);
  const [activeId, setActiveId] = useState<number>(INITIAL[0].id);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [showThread, setShowThread] = useState(false); // mobile only
  const endRef = useRef<HTMLDivElement>(null);

  const active = convos.find((c) => c.id === activeId)!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return convos;
    return convos.filter(
      (c) =>
        MEMBERS[c.who].name.toLowerCase().includes(q) ||
        c.messages[c.messages.length - 1]?.text.toLowerCase().includes(q)
    );
  }, [convos, search]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [activeId, active.messages.length]);

  const select = (id: number) => {
    setActiveId(id);
    setShowThread(true);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setConvos((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, { id: Date.now(), from: "me", text, time: "now" }] }
          : c
      )
    );
    setDraft("");
  };

  return (
    <DashboardShell breadcrumb="Workspace / Messages" title="Inbox">
      <div className="flex h-[calc(100dvh-7rem)] min-h-[480px] overflow-hidden lg:h-[calc(100dvh-3.75rem)]">
        {/* Conversation list */}
        <div
          className={cn(
            "w-full shrink-0 flex-col border-r border-border bg-surface md:flex md:w-80 lg:w-96",
            showThread ? "hidden md:flex" : "flex"
          )}
        >
          <div className="flex items-center justify-between px-4 pb-3 pt-4">
            <h2 className="text-base font-semibold text-foreground">Messages</h2>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              aria-label="New message"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages"
                className="w-full bg-transparent text-foreground placeholder:text-muted outline-none"
              />
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-2">
            {filtered.map((c) => {
              const last = c.messages[c.messages.length - 1];
              const isActive = c.id === activeId;
              const mine = last?.from === "me";
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => select(c.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                    isActive ? "bg-surface-2" : "hover:bg-surface-2/60"
                  )}
                >
                  <div className="relative shrink-0">
                    <Avatar who={c.who} className="h-11 w-11 text-[12px]" />
                    {c.online && (
                      <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-sm",
                          c.unread ? "font-semibold text-foreground" : "font-medium text-foreground/90"
                        )}
                      >
                        {MEMBERS[c.who].name}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted">{last?.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-xs",
                          c.unread ? "text-foreground/80" : "text-muted"
                        )}
                      >
                        {mine && "You: "}
                        {last?.text}
                      </span>
                      {c.unread > 0 && (
                        <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <p className="px-3 py-8 text-center text-xs text-muted">No conversations found.</p>
            )}
          </div>
        </div>

        {/* Thread */}
        <div
          className={cn(
            "min-w-0 flex-1 flex-col bg-background",
            showThread ? "flex" : "hidden md:flex"
          )}
        >
          {/* Thread header */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <button
              type="button"
              onClick={() => setShowThread(false)}
              className="-ml-1 text-muted transition-colors hover:text-foreground md:hidden"
              aria-label="Back to conversations"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="relative shrink-0">
              <Avatar who={active.who} className="h-9 w-9" />
              {active.online && (
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-emerald-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-foreground">{MEMBERS[active.who].name}</div>
              <div className={cn("text-[11px]", active.online ? "text-emerald-600 dark:text-emerald-400" : "text-muted")}>
                {active.lastActive}
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted">
              {[Phone, Video, Info].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="hidden h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-surface-2 hover:text-foreground sm:inline-flex"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="mb-4 flex justify-center">
              <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted">Today</span>
            </div>
            {active.messages.map((m, i) => {
              const prev = active.messages[i - 1];
              const startGroup = !prev || prev.from !== m.from;
              const next = active.messages[i + 1];
              const endGroup = !next || next.from !== m.from;
              const mine = m.from === "me";
              return (
                <div
                  key={m.id}
                  className={cn(
                    "flex items-end gap-2",
                    mine ? "justify-end" : "justify-start",
                    startGroup ? "mt-3" : "mt-0.5"
                  )}
                >
                  {!mine && (
                    <span className="w-7 shrink-0">
                      {endGroup && <Avatar who={active.who} className="h-7 w-7 text-[10px]" />}
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm sm:max-w-[68%]",
                      mine ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground",
                      mine && endGroup && "rounded-br-md",
                      !mine && endGroup && "rounded-bl-md"
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-end gap-1 pr-1 pt-1 text-[10px] text-muted">
              <CheckCheck className="h-3 w-3" /> Seen {active.messages[active.messages.length - 1]?.time}
            </div>
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <form onSubmit={send} className="border-t border-border px-3 py-3 sm:px-4">
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${firstName(active.who)}…`}
                className="min-w-0 flex-1 bg-transparent py-1 text-sm text-foreground placeholder:text-muted outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-hover text-primary-foreground shadow-sm shadow-primary/30 transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
