import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/site-shell";
import { LegalDoc, type LegalSection } from "@/components/sections/legal-doc";

export const metadata: Metadata = {
  title: "Privacy Policy — Flowly",
  description: "How Flowly collects, uses, and protects your data.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Overview",
    body: [
      "Flowly, Inc. (\"Flowly\", \"we\", \"us\") provides project management software that helps teams plan, track, and ship work. This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
      "We designed Flowly to collect as little personal data as possible while still delivering a great product. We never sell your data.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Account information you provide, such as your name, email address, workspace name, and billing details.",
      "Content you create in Flowly, including projects, tasks, comments, and attachments. This content belongs to you.",
      "Usage data, such as feature interactions, device and browser type, and approximate location derived from IP, used to improve the product and keep it secure.",
    ],
  },
  {
    heading: "How we use information",
    body: [
      "To provide, maintain, and improve Flowly, including personalizing your experience and developing new features.",
      "To communicate with you about your account, security alerts, and product updates you've opted into.",
      "To detect, prevent, and respond to fraud, abuse, and security incidents.",
    ],
  },
  {
    heading: "Data sharing",
    body: [
      "We share data with sub-processors that help us operate Flowly (for example, cloud hosting and payment processing). These providers are bound by contractual obligations to protect your data.",
      "We may disclose information if required by law or to protect the rights, safety, and security of Flowly and our users.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We retain your information for as long as your account is active. When you delete your workspace, we remove your content from our active systems within 30 days and from backups within 90 days.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, export, or delete your personal data. You can exercise most of these rights directly from your account settings, or by contacting us.",
      "To make a request or ask a question, email privacy@flowly.com.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We encrypt data in transit and at rest, undergo regular third-party audits, and maintain SOC 2 Type II compliance. While no system is perfectly secure, we work hard to protect your information.",
    ],
  },
  {
    heading: "Contact us",
    body: [
      "Questions about this policy? Reach our privacy team at privacy@flowly.com or write to Flowly, Inc., 2261 Market St, San Francisco, CA.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <LegalDoc
        title="Privacy Policy"
        updated="May 1, 2026"
        intro="Your trust matters. Here's exactly what we collect, why, and the control you have over your data."
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
