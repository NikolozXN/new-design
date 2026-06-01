"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";
import { DashboardShell } from "./shell";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 border-b border-border py-6 first:pt-0 last:border-0 lg:grid-cols-[260px_1fr]">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{desc}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function Switch({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full transition-colors",
        on ? "bg-primary" : "bg-surface-2"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
          on ? "translate-x-4" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

const NOTIFS = [
  { id: "digest", label: "Weekly email digest", desc: "A summary of activity every Monday." },
  { id: "mentions", label: "Mentions", desc: "When someone @mentions you." },
  { id: "assigned", label: "Task assigned", desc: "When a task is assigned to you." },
  { id: "due", label: "Due reminders", desc: "A heads-up before a task is due." },
  { id: "product", label: "Product updates", desc: "Occasional news about new features." },
] as const;

export function SettingsView() {
  const [name, setName] = useState("Sara Chen");
  const [email, setEmail] = useState("sara@acme.inc");
  const [role, setRole] = useState("Admin");
  const [workspace, setWorkspace] = useState("Acme Inc");
  const [slug, setSlug] = useState("acme");
  const [tz, setTz] = useState("(GMT-08:00) Pacific Time");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    digest: true,
    mentions: true,
    assigned: true,
    due: false,
    product: false,
  });
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <DashboardShell breadcrumb="Workspace / Settings" title="Settings">
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        <Section title="Profile" desc="This is how you appear to your teammates across the workspace.">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-base font-semibold text-white">
              {name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "U"}
            </span>
            <button
              type="button"
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              Change photo
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input className={field} value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Email">
              <input type="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </div>
          <Field label="Role">
            <select className={field} value={role} onChange={(e) => setRole(e.target.value)}>
              <option>Admin</option>
              <option>Member</option>
              <option>Viewer</option>
            </select>
          </Field>
        </Section>

        <Section title="Workspace" desc="General settings for your team workspace and public URL.">
          <Field label="Workspace name">
            <input className={field} value={workspace} onChange={(e) => setWorkspace(e.target.value)} />
          </Field>
          <Field label="Workspace URL">
            <div className="flex items-center rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <span className="pl-3.5 text-sm text-muted">flowly.app/</span>
              <input
                className="w-full bg-transparent py-2 pr-3.5 text-sm text-foreground outline-none"
                value={slug}
                onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
              />
            </div>
          </Field>
          <Field label="Time zone">
            <select className={field} value={tz} onChange={(e) => setTz(e.target.value)}>
              <option>(GMT-08:00) Pacific Time</option>
              <option>(GMT-05:00) Eastern Time</option>
              <option>(GMT+00:00) UTC</option>
              <option>(GMT+01:00) Central European Time</option>
              <option>(GMT+04:00) Gulf Standard Time</option>
            </select>
          </Field>
        </Section>

        <Section title="Notifications" desc="Choose what you want to be notified about and how.">
          <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
            {NOTIFS.map((n) => (
              <li key={n.id} className="flex items-center gap-4 bg-surface px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{n.label}</p>
                  <p className="text-xs text-muted">{n.desc}</p>
                </div>
                <Switch
                  on={!!toggles[n.id]}
                  onToggle={() => setToggles((prev) => ({ ...prev, [n.id]: !prev[n.id] }))}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Danger zone" desc="Irreversible actions. Please be certain before continuing.">
          <div className="flex flex-col gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Delete this workspace</p>
              <p className="text-xs text-muted">All boards, tasks, and files will be permanently removed.</p>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-500/20 dark:text-rose-300"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete workspace
            </button>
          </div>
        </Section>

        <div className="sticky bottom-4 mt-6 flex items-center justify-end gap-3">
          <AnimatePresence>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
              >
                <Check className="h-3.5 w-3.5" /> Changes saved
              </motion.span>
            )}
          </AnimatePresence>
          <button
            type="button"
            className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            className="rounded-lg bg-gradient-to-b from-primary to-primary-hover px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/30"
          >
            Save changes
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
