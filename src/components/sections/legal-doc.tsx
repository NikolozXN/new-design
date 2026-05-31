import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";

export type LegalSection = { heading: string; body: string[] };

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function LegalDoc({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} subtitle={intro} />

      <Container className="pb-24 sm:pb-32">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[200px_1fr]">
          {/* TOC */}
          <nav className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                On this page
              </p>
              <ul className="flex flex-col gap-2 border-l border-border">
                {sections.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${slug(s.heading)}`}
                      className="-ml-px block border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-primary hover:text-foreground"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Body */}
          <article>
            <p className="text-sm text-muted">Last updated: {updated}</p>
            <div className="mt-8 flex flex-col gap-10">
              {sections.map((s) => (
                <section key={s.heading} id={slug(s.heading)} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
                    {s.heading}
                  </h2>
                  <div className="mt-3 flex flex-col gap-4 text-[15px] leading-relaxed text-muted">
                    {s.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-12 rounded-card border border-border bg-surface-2 p-6 text-sm text-muted">
              This document is a template provided for demonstration purposes and is not
              legal advice. Replace it with your own policy reviewed by counsel before
              launch.
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
