import type { Metadata } from "next";
import { ForgotPasswordView } from "@/components/sections/auth-views";

export const metadata: Metadata = {
  title: "Reset password — Flowly",
  description: "Reset your Flowly account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView />;
}
