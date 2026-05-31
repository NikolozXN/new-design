import type { Metadata } from "next";
import { SignupView } from "@/components/sections/auth-views";

export const metadata: Metadata = {
  title: "Start free trial — Flowly",
  description: "Create your Flowly account and start a 14-day Pro trial. No credit card required.",
};

export default function SignupPage() {
  return <SignupView />;
}
