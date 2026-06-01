import type { Metadata } from "next";
import { InboxView } from "@/components/dashboard/inbox-view";

export const metadata: Metadata = {
  title: "Inbox — Flowly",
  description: "Mentions, comments, and assignments across your Flowly workspace.",
};

export default function InboxPage() {
  return <InboxView />;
}
