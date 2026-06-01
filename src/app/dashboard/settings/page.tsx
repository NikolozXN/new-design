import type { Metadata } from "next";
import { SettingsView } from "@/components/dashboard/settings-view";

export const metadata: Metadata = {
  title: "Settings — Flowly",
  description: "Manage your profile, workspace, and notification preferences.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
