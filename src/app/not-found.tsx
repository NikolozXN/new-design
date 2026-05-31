import { ArrowUpRight, Home } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

const SUGGESTIONS = [
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />

      <div className="px-6 py-8 sm:px-10">
        <Logo />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_2px_var(--accent)]" />
          Error 404
        </span>

        <h1 className="mt-6 select-none font-display text-[28vw] font-bold leading-[0.8] tracking-tighter text-outline-muted sm:text-[18rem]">
          404
        </h1>

        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          This page wandered off the board.
        </h2>
        <p className="mt-3 max-w-md text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s
          get you back on track.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" />
            Back home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact support
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {SUGGESTIONS.map((s) => (
            <a key={s.href} href={s.href} className="text-muted transition-colors hover:text-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
