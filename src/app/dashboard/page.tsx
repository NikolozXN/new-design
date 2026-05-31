import type { Metadata } from "next";
import { DashboardApp } from "@/components/sections/dashboard-app";

export const metadata: Metadata = {
  title: "Dashboard — Flowly",
  description: "A live look at the Flowly workspace: boards, list, timeline, and activity.",
};

export default function DashboardPage() {
  return <DashboardApp />;
}
