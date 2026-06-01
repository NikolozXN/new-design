import type { ReactNode } from "react";
import { DashboardSidebar } from "./sidebar";
import { DashboardTopbar } from "./topbar";

export function DashboardShell({
  breadcrumb,
  title,
  status,
  right,
  children,
}: {
  breadcrumb: string;
  title: string;
  status?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar breadcrumb={breadcrumb} title={title} status={status} right={right} />
        {children}
      </div>
    </div>
  );
}
