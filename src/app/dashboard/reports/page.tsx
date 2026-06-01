import type { Metadata } from "next";
import { ReportsView } from "@/components/dashboard/reports-view";

export const metadata: Metadata = {
  title: "Reports — Flowly",
  description: "Throughput, velocity, cycle time, and team workload at a glance.",
};

export default function ReportsPage() {
  return <ReportsView />;
}
