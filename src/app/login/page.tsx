import type { Metadata } from "next";
import { LoginView } from "@/components/sections/auth-views";

export const metadata: Metadata = {
  title: "Sign in — Flowly",
  description: "Sign in to your Flowly workspace.",
};

export default function LoginPage() {
  return <LoginView />;
}
