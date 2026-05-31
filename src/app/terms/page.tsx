import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/site-shell";
import { LegalDoc, type LegalSection } from "@/components/sections/legal-doc";

export const metadata: Metadata = {
  title: "Terms of Service — Flowly",
  description: "The terms that govern your use of Flowly.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Agreement to terms",
    body: [
      "These Terms of Service (\"Terms\") govern your access to and use of Flowly's websites, apps, and services. By creating an account or using Flowly, you agree to these Terms.",
      "If you are using Flowly on behalf of an organization, you represent that you have authority to bind that organization to these Terms.",
    ],
  },
  {
    heading: "Your account",
    body: [
      "You are responsible for safeguarding your account credentials and for all activity that occurs under your account.",
      "You must be at least 16 years old to use Flowly, and you agree to provide accurate, current information when registering.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "You agree not to misuse Flowly — including by attempting to access it using a method other than the interfaces we provide, interfering with the service, or using it to store or transmit unlawful content.",
      "We may suspend or terminate accounts that violate these Terms or put the service or other users at risk.",
    ],
  },
  {
    heading: "Plans and billing",
    body: [
      "Paid plans are billed in advance on a monthly or annual basis and are non-refundable except where required by law. You can upgrade, downgrade, or cancel at any time from your billing settings.",
      "We may change our prices with at least 30 days' notice. Continued use after a price change constitutes acceptance of the new pricing.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You retain all rights to the content you create in Flowly. You grant us a limited license to host, store, and display that content solely to provide the service.",
      "You are responsible for the content you upload and for ensuring you have the rights to use it.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Flowly and its original content, features, and functionality are owned by Flowly, Inc. and are protected by international copyright, trademark, and other laws.",
    ],
  },
  {
    heading: "Disclaimers & liability",
    body: [
      "Flowly is provided \"as is\" without warranties of any kind. To the maximum extent permitted by law, Flowly will not be liable for any indirect, incidental, or consequential damages.",
      "Our total liability for any claim arising out of these Terms is limited to the amount you paid us in the 12 months before the claim.",
    ],
  },
  {
    heading: "Changes & contact",
    body: [
      "We may update these Terms from time to time. If we make material changes, we'll notify you in advance. Questions? Email legal@flowly.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <SiteShell>
      <LegalDoc
        title="Terms of Service"
        updated="May 1, 2026"
        intro="The ground rules for using Flowly — written to be as clear and fair as we can make them."
        sections={SECTIONS}
      />
    </SiteShell>
  );
}
