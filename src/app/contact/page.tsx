import type { Metadata } from "next";
import { SiteShell } from "@/components/ui/site-shell";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact — Flowly",
  description:
    "Get in touch with the Flowly team. Talk to sales, reach support, or send us a message.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <Contact />
    </SiteShell>
  );
}
