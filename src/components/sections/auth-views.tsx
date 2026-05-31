"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import {
  AuthShell,
  SocialButtons,
  AuthDivider,
  fieldClass,
} from "@/components/sections/auth-shell";

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="group relative inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-primary to-primary-hover text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 ring-1 ring-inset ring-white/15 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/45"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {trailing}
      </div>
      <input
        id={id}
        name={id}
        type={type}
        required
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}

export function LoginView() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Flowly workspace."
      footer={
        <>
          New to Flowly?{" "}
          <a href="/signup" className="font-medium text-primary hover:underline">
            Create an account
          </a>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <SocialButtons />
        <AuthDivider />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
          className="flex flex-col gap-4"
        >
          <Field id="email" label="Work email" type="email" placeholder="jane@acme.com" autoComplete="email" />
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            trailing={
              <a href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                Forgot?
              </a>
            }
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" className="h-4 w-4 rounded border-border accent-[var(--primary)]" />
            Remember me for 30 days
          </label>
          <SubmitButton>Sign in</SubmitButton>
        </form>
      </div>
    </AuthShell>
  );
}

export function SignupView() {
  return (
    <AuthShell
      title="Start your free trial"
      subtitle="14 days of Flowly Pro. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </>
      }
    >
      <div className="flex flex-col gap-5">
        <SocialButtons />
        <AuthDivider />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
          className="flex flex-col gap-4"
        >
          <Field id="name" label="Full name" placeholder="Jane Cooper" autoComplete="name" />
          <Field id="email" label="Work email" type="email" placeholder="jane@acme.com" autoComplete="email" />
          <Field
            id="password"
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <SubmitButton>Create account</SubmitButton>
          <p className="text-center text-xs text-muted">
            By creating an account you agree to our{" "}
            <a href="/terms" className="underline hover:text-foreground">
              Terms
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </AuthShell>
  );
}

export function ForgotPasswordView() {
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <>
          Remembered it?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Back to sign in
          </a>
        </>
      }
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card border border-border bg-surface p-6 text-center"
          >
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
              <CheckCircle2 className="h-6 w-6" />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
              Check your inbox
            </h2>
            <p className="mt-2 text-sm text-muted">
              If an account exists for that email, you&apos;ll receive a password reset
              link within a few minutes.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="flex flex-col gap-4"
          >
            <Field id="email" label="Work email" type="email" placeholder="jane@acme.com" autoComplete="email" />
            <SubmitButton>Send reset link</SubmitButton>
          </motion.form>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}
