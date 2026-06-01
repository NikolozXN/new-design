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
  Paperclip,
  Image as ImageIcon,
  FileText,
  Download,
  X,
} from "lucide-react";
import { DashboardShell } from "./shell";
import { Avatar, MEMBERS, type Who } from "./people";
import { cn } from "@/lib/utils";

type Attachment = {
  id: number;
  name: string;
  size: string;
  type: "image" | "file";
  url?: string;
  gradient?: string;
};

type Msg = {
  id: number;
  from: "me" | "them";
  text?: string;
  time: string;
  attachments?: Attachment[];
};

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
      {
        id: 2,
        from: "them",
        text: "Here's the latest screen + the spec",
        time: "9:25 AM",
        attachments: [
          { id: 1, name: "mobile-nav.png", size: "1.2 MB", type: "image", gradient: "linear-gradient(135deg,#7c3aed,#ec4899)" },
          { id: 2, name: "nav-spec.pdf", size: "284 KB", type: "file" },
        ],
      },
      { id: 3, from: "me", text: "On it — looking now", time: "9:31 AM" },
      { id: 4, from: "them", text: "The hamburger animation feels much smoother now", time: "9:32 AM" },
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
      {
        id: 1,
        from: "them",
        text: "Brand palette is locked 🎨",
        time: "2h",
        attachments: [{ id: 1, name: "palette-v2.png", size: "640 KB", type: "image", gradient: "linear-gradient(135deg,#0ea5e9,#10b981)" }],
      },
      { id: 2, from: "me", text: "Perfect, I'll wire the tokens into the theme today", time: "2h" },
    ],
  },
  {
    id: 4,
    who: "DO",
    online: false,
    lastActive: "Active 5h ago",
    unread: 1,
    messages: [{ id: 1, from: "them", text: "Homepage hero copy is ready for review", time: "5h" }],
  },
  {
    id: 5,
    who: "PN",
    online: false,
    lastActive: "Active yesterday",
    unread: 0,
    messages: [
      {
        id: 1,
        from: "them",
        text: "Competitor pricing audit",
        time: "1d",
        attachments: [{ id: 1, name: "pricing-audit.xlsx", size: "92 KB", type: "file" }],
      },
      { id: 2, from: "me", text: "No rush — early next week is fine", time: "1d" },
    ],
  },
];

const firstName = (who: Who) => MEMBERS[who].name.split(" ")[0];

const formatSize = (b: number) =>
  b < 1024 ? `${b} B` : b < 1048576 ? `${Math.round(b / 1024)} KB` : `${(b / 1048576).toFixed(1)} MB`;

const previewText = (m: Msg | undefined) => {
  if (!m) return "";
  if (m.text) return m.text;
  if (m.attachments?.some((a) => a.type === "image")) return "Photo";
  if (m.attachments?.length) return m.attachments[0].name;
  return "";
};

function AttachmentBlocks({ atts, mine }: { atts: Attachment[]; mine: boolean }) {
  const images = atts.filter((a) => a.type === "image");
  const files = atts.filter((a) => a.type === "file");
  return (
    <div className={cn("flex flex-col gap-1.5", mine ? "items-end" : "items-start")}>
      {images.length > 0 && (
        <div className={cn("grid gap-1", images.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
          {images.map((a) =>
            a.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={a.id}
                src={a.url}
                alt={a.name}
                className="h-40 w-40 rounded-2xl object-cover ring-1 ring-border sm:h-44 sm:w-44"
              />
            ) : (
              <div
                key={a.id}
                className="relative flex h-40 w-40 items-end overflow-hidden rounded-2xl ring-1 ring-border sm:h-44 sm:w-44"
                style={{ backgroundImage: a.gradient }}
              >
                <div className="w-full bg-gradient-to-t from-black/45 to-transparent p-2">
                  <span className="line-clamp-1 text-[10px] font-medium text-white/90">{a.name}</span>
                </div>
              </div>
            )
          )}
        </div>
      )}
      {files.map((a) => (
        <div
          key={a.id}
          className={cn(
            "flex w-56 max-w-full items-center gap-3 rounded-2xl border px-3 py-2.5",
            mine ? "border-white/25 bg-white/10" : "border-border bg-surface"
          )}
        >
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
              mine ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            )}
          >
            <FileText className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className={cn("truncate text-xs font-semibold", mine ? "text-white" : "text-foreground")}>{a.name}</div>
            <div className={cn("text-[10px]", mine ? "text-white/70" : "text-muted")}>{a.size}</div>
          </div>
          <Download className={cn("h-4 w-4 shrink-0", mine ? "text-white/80" : "text-muted")} />
        </div>
      ))}
    </div>
  );
}

export function InboxView() {
  const [convos, setConvos] = useState<Convo[]>(INITIAL);
  const [activeId, setActiveId] = useState<number>(INITIAL[0].id);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [showThread, setShowThread] = useState(false);
  const [pending, setPending] = useState<Attachment[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const active = convos.find((c) => c.id === activeId)!;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return convos;
    return convos.filter(
      (c) =>
        MEMBERS[c.who].name.toLowerCase().includes(q) ||
        previewText(c.messages[c.messages.length - 1]).toLowerCase().includes(q)
    );
  }, [convos, search]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [activeId, active.messages.length, pending.length]);

  const select = (id: number) => {
    setActiveId(id);
    setShowThread(true);
    setConvos((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  };

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const next: Attachment[] = Array.from(list).map((f, i) => {
      const isImage = f.type.startsWith("image/");
      return {
        id: Date.now() + i,
        name: f.name,
        size: formatSize(f.size),
        type: isImage ? "image" : "file",
        url: isImage ? URL.createObjectURL(f) : undefined,
      };
    });
    setPending((prev) => [...prev, ...next]);
  };

  const removePending = (id: number) => setPending((prev) => prev.filter((a) => a.id !== id));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text && pending.length === 0) return;
    const msg: Msg = {
      id: Date.now(),
      from: "me",
      time: "now",
      ...(text ? { text } : {}),
      ...(pending.length ? { attachments: pending } : {}),
    };
    setConvos((prev) => prev.map((c) => (c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c)));
    setDraft("");
    setPending([]);
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
                      <span className={cn("flex min-w-0 items-center gap-1 truncate text-xs", c.unread ? "text-foreground/80" : "text-muted")}>
                        {last?.attachments?.length ? (
                          <>
                            {last.attachments.some((a) => a.type === "image") ? (
                              <ImageIcon className="h-3 w-3 shrink-0" />
                            ) : (
                              <Paperclip className="h-3 w-3 shrink-0" />
                            )}
                            <span className="truncate">{mine && "You: "}{previewText(last)}</span>
                          </>
                        ) : (
                          <span className="truncate">{mine && "You: "}{previewText(last)}</span>
                        )}
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
            {filtered.length === 0 && <p className="px-3 py-8 text-center text-xs text-muted">No conversations found.</p>}
          </div>
        </div>

        {/* Thread */}
        <div className={cn("min-w-0 flex-1 flex-col bg-background", showThread ? "flex" : "hidden md:flex")}>
          {/* Header */}
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
              const next = active.messages[i + 1];
              const startGroup = !prev || prev.from !== m.from;
              const endGroup = !next || next.from !== m.from;
              const mine = m.from === "me";
              return (
                <div
                  key={m.id}
                  className={cn("flex items-end gap-2", mine ? "justify-end" : "justify-start", startGroup ? "mt-3" : "mt-0.5")}
                >
                  {!mine && <span className="w-7 shrink-0">{endGroup && <Avatar who={active.who} className="h-7 w-7 text-[10px]" />}</span>}
                  <div className={cn("flex max-w-[80%] flex-col gap-1.5 sm:max-w-[70%]", mine ? "items-end" : "items-start")}>
                    {m.attachments && <AttachmentBlocks atts={m.attachments} mine={mine} />}
                    {m.text && (
                      <div
                        className={cn(
                          "rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                          mine ? "bg-primary text-primary-foreground" : "bg-surface-2 text-foreground",
                          mine && endGroup && "rounded-br-md",
                          !mine && endGroup && "rounded-bl-md"
                        )}
                      >
                        {m.text}
                      </div>
                    )}
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
            {pending.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {pending.map((a) => (
                  <div key={a.id} className="group relative">
                    {a.type === "image" && a.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.url} alt={a.name} className="h-16 w-16 rounded-lg object-cover ring-1 ring-border" />
                    ) : (
                      <div className="flex h-16 w-40 items-center gap-2 rounded-lg border border-border bg-surface px-2.5">
                        <FileText className="h-4 w-4 shrink-0 text-primary" />
                        <div className="min-w-0">
                          <div className="truncate text-[11px] font-medium text-foreground">{a.name}</div>
                          <div className="text-[10px] text-muted">{a.size}</div>
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removePending(a.id)}
                      className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background shadow-sm"
                      aria-label="Remove attachment"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-1.5 rounded-2xl border border-border bg-surface px-2 py-1.5 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                aria-label="Attach photo"
              >
                <ImageIcon className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                aria-label="Attach file"
              >
                <Paperclip className="h-[18px] w-[18px]" />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${firstName(active.who)}…`}
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-foreground placeholder:text-muted outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() && pending.length === 0}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary to-primary-hover text-primary-foreground shadow-sm shadow-primary/30 transition-opacity disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <input ref={imageRef} type="file" accept="image/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            <input ref={fileRef} type="file" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
          </form>
        </div>
      </div>
    </DashboardShell>
  );
}
