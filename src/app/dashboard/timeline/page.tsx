import type { Metadata } from "next";
import { TimelineView } from "@/components/dashboard/timeline-view";

export const metadata: Metadata = {
  title: "Timeline — Flowly",
  description: "Plan workstreams and milestones across the quarter on a visual roadmap.",
};

export default function TimelinePage() {
  return <TimelineView />;
}
