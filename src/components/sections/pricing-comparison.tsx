import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Cell = boolean | string;

const PLANS = ["Free", "Pro", "Enterprise"] as const;

const GROUPS: { group: string; rows: { label: string; values: [Cell, Cell, Cell] }[] }[] = [
  {
    group: "Core",
    rows: [
      { label: "Projects", values: ["3", "Unlimited", "Unlimited"] },
      { label: "Team members", values: ["5", "Unlimited", "Unlimited"] },
      { label: "Tasks & subtasks", values: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "File storage", values: ["2 GB", "100 GB", "Unlimited"] },
    ],
  },
  {
    group: "Views & planning",
    rows: [
      { label: "Board, List & Calendar", values: [true, true, true] },
      { label: "Timeline (Gantt)", values: [false, true, true] },
      { label: "AI sprint planning", values: [false, true, true] },
      { label: "Custom fields", values: [false, true, true] },
    ],
  },
  {
    group: "Automation & insights",
    rows: [
      { label: "Automation runs", values: [false, "1,000/mo", "Unlimited"] },
      { label: "Real-time dashboards", values: [false, true, true] },
      { label: "Advanced reporting", values: [false, false, true] },
    ],
  },
  {
    group: "Security & admin",
    rows: [
      { label: "Roles & permissions", values: ["Basic", "Advanced", "Advanced"] },
      { label: "SSO / SAML", values: [false, false, true] },
      { label: "SCIM provisioning", values: [false, false, true] },
      { label: "Audit log", values: [false, false, true] },
      { label: "Uptime SLA", values: [false, false, "99.9%"] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Support", values: ["Community", "Priority", "Dedicated CSM"] },
    ],
  },
];

function CellValue({ value, highlighted }: { value: Cell; highlighted?: boolean }) {
  if (value === true)
    return (
      <span
        className={cn(
          "mx-auto flex h-5 w-5 items-center justify-center rounded-full",
          highlighted ? "bg-gradient-to-br from-primary to-accent text-primary-foreground" : "bg-primary/10 text-primary"
        )}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-muted/40" />;
  return <span className="text-[13px] font-medium text-foreground">{value}</span>;
}

export function PricingComparison() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2 className="text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Compare every plan
        </h2>
        <p className="mx-auto mt-3 max-w-md text-center text-muted">
          Everything that ships in each tier — no asterisks.
        </p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-background py-4 text-left text-sm font-semibold text-muted">
                  Features
                </th>
                {PLANS.map((p) => (
                  <th
                    key={p}
                    className={cn(
                      "px-4 py-4 text-center font-display text-base font-bold",
                      p === "Pro" ? "text-primary" : "text-foreground"
                    )}
                  >
                    {p}
                    {p === "Pro" && (
                      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 align-middle text-[10px] font-semibold text-primary">
                        Popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GROUPS.map((g) => (
                <Fragment key={g.group}>
                  <tr>
                    <td
                      colSpan={4}
                      className="border-t border-border pt-7 pb-2 text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      {g.group}
                    </td>
                  </tr>
                  {g.rows.map((row) => (
                    <tr key={row.label} className="group">
                      <td className="sticky left-0 z-10 bg-background py-3 pr-4 text-[13px] text-foreground/90 group-hover:text-foreground">
                        {row.label}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={cn(
                            "px-4 py-3 text-center align-middle",
                            i === 1 && "bg-primary/[0.04]"
                          )}
                        >
                          <CellValue value={v} highlighted={i === 1} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
