import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flowly — Project management that flows",
  description:
    "Flowly is the all-in-one project management platform that keeps your team aligned, focused, and shipping faster. Plan, track, and automate your work in one place.",
  keywords: [
    "project management",
    "team collaboration",
    "task tracking",
    "productivity",
    "saas",
  ],
  openGraph: {
    title: "Flowly — Project management that flows",
    description:
      "Plan, track, and automate your work in one place. The project management platform your team will actually love.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable}`}
    >
      <body className="cursor-custom min-h-screen bg-background font-sans text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
