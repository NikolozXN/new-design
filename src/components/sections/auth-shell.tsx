"use client";

import type { ReactNode, SVGProps } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { CanvasGradient } from "@/components/ui/canvas-gradient";

export const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.57v-2c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.84 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.54-2.81 5.53-5.49 5.83.43.36.81 1.08.81 2.18v3.23c0 .32.22.69.83.57A12.01 12.01 0 0 0 24 12.29C24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Google", Icon: GoogleIcon },
        { label: "GitHub", Icon: GitHubIcon },
      ].map(({ label, Icon }) => (
        <button
          key={label}
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface text-sm font-medium text-foreground transition-colors hover:bg-surface-2"
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted">or continue with email</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Form side */}
      <div className="relative flex flex-col overflow-hidden px-6 py-8 sm:px-10">
        {/* subtle backdrop so the form side never feels flat */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm"
          >
            {/* Mobile-only rating (brand panel is hidden on small screens) */}
            <div className="mb-6 flex items-center gap-1 text-accent lg:hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="ml-2 text-xs font-medium text-muted">
                4.9 / 5 · loved by 12,000+ teams
              </span>
            </div>

            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-muted">{subtitle}</p>
            <div className="mt-8">{children}</div>
            <div className="mt-8 text-center text-sm text-muted">{footer}</div>
          </motion.div>
        </div>
      </div>

      {/* Brand side */}
      <div className="relative hidden overflow-hidden border-l border-border bg-surface-2 lg:block">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-90">
          <CanvasGradient />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-sm font-medium text-foreground">4.9 / 5 · 2,400+ reviews</span>
          </div>

          <blockquote className="max-w-md">
            <p className="text-balance font-display text-2xl font-semibold leading-snug text-foreground">
              &ldquo;Flowly replaced four tools and gave our team back a full day every week.
              Onboarding took one afternoon.&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundImage: "linear-gradient(135deg,#7c3aed,#a855f7)" }}
              >
                SC
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">Sofia Chen</div>
                <div className="text-xs text-muted">VP Engineering, Northwind</div>
              </div>
            </footer>
          </blockquote>

          <div className="flex items-center gap-8">
            {[
              { v: "12k+", k: "Teams" },
              { v: "60+", k: "Countries" },
              { v: "SOC 2", k: "Type II" },
            ].map((s) => (
              <div key={s.k}>
                <div className="font-display text-xl font-bold text-foreground">{s.v}</div>
                <div className="text-xs text-muted">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
