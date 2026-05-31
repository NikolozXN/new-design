# Flowly — Premium SaaS Landing Page Template

A polished, production-ready landing page template for modern SaaS products.
Built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Framer Motion**,
and **lucide-react**, with full **dark / light mode** support.

> The demo content is themed around *Flowly*, a fictional project-management
> tool. Swap the copy and colors and it's ready for your own product.

---

## ✨ Features

- **11 ready-made pages** — landing, dedicated pricing (with comparison table),
  about, contact, privacy, terms, a live in-app dashboard, login, signup,
  forgot-password, and a custom 404 (see [Pages](#-pages-included)).
- **9 polished landing sections** — Navbar, Hero, Features, How it works,
  Pricing, Testimonials, FAQ, CTA, Footer.
- **Dark & light mode** via `next-themes` (class strategy) with a smooth toggle.
- **Single-variable theming** — change one CSS variable to recolor everything.
- **Framer Motion animations** — on-load and on-scroll, all of which respect
  `prefers-reduced-motion` automatically.
- **Fully responsive**, mobile-first, with an animated mobile menu.
- **Accessible** — semantic markup, focus states, ARIA labels.
- **Type-safe** TypeScript throughout, zero lint errors.

---

## 📑 Pages included

| Route               | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| `/`                 | Full landing page (hero, features, pricing, testimonials, FAQ, CTA…)     |
| `/pricing`          | Dedicated pricing page with an animated billing toggle + comparison table |
| `/about`            | Company story, stats, values grid, and team                              |
| `/contact`          | Contact page with a working-feeling form + support channels              |
| `/privacy`          | Privacy Policy (templated, with sticky table of contents)                |
| `/terms`            | Terms of Service (templated)                                             |
| `/dashboard`        | A live in-app demo — sidebar, KPIs, and Board / List / Timeline views    |
| `/login`            | Sign-in screen with social buttons (split brand layout)                  |
| `/signup`           | Free-trial sign-up screen                                                |
| `/forgot-password`  | Password reset flow with success state                                   |
| `404`               | Custom not-found page                                                    |

Marketing pages share a single [`SiteShell`](src/components/ui/site-shell.tsx)
(navbar + footer + chrome). Auth and dashboard pages use their own focused
layouts.

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

---

## 🎨 How to change the primary color (single variable)

All theming flows from CSS variables defined in
[`src/app/globals.css`](src/app/globals.css). To recolor the **entire**
template, change `--primary` (and optionally its hover / foreground companions):

```css
:root {
  /* 👇 change this one value to rebrand the whole site */
  --primary: #7c3aed;        /* violet (default) */
  --primary-hover: #6d28d9;
  --primary-foreground: #ffffff;
}

.dark {
  --primary: #8b5cf6;        /* slightly brighter for dark backgrounds */
  --primary-hover: #a78bfa;
  --primary-foreground: #ffffff;
}
```

Try `#2563eb` (blue), `#059669` (emerald), `#e11d48` (rose), or `#ea580c`
(orange). Buttons, badges, icons, gradients, links, and the CTA section all
update automatically.

You can also tweak the neutral palette (`--background`, `--surface`,
`--surface-2`, `--border`, `--muted`, `--foreground`) and the global corner
radius (`--radius`) in the same file.

### Changing the font

The template uses **Inter** from Google Fonts, loaded in
[`src/app/layout.tsx`](src/app/layout.tsx). Swap it for any
`next/font/google` font:

```ts
import { Inter } from "next/font/google";
// e.g. import { Manrope } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
```

---

## ✏️ How to replace content

The template has **no Lorem Ipsum** — every section ships with realistic copy
you can edit in place. Content lives at the top of each section component in
[`src/components/sections/`](src/components/sections):

| What to edit                 | File                                            |
| ---------------------------- | ----------------------------------------------- |
| Brand name & logo            | `src/components/ui/logo.tsx`                     |
| Nav links + CTA buttons      | `src/components/sections/navbar.tsx`             |
| Headline & hero copy         | `src/components/sections/hero.tsx`               |
| Feature cards (`FEATURES`)   | `src/components/sections/features.tsx`           |
| Steps (`STEPS`)              | `src/components/sections/how-it-works.tsx`       |
| Plans (`PLANS`)              | `src/components/sections/pricing.tsx`            |
| Reviews (`TESTIMONIALS`)     | `src/components/sections/testimonials.tsx`       |
| Questions (`FAQS`)           | `src/components/sections/faq.tsx`                |
| Final CTA copy               | `src/components/sections/cta.tsx`                |
| Footer links & socials       | `src/components/sections/footer.tsx`             |
| Pricing comparison table     | `src/components/sections/pricing-comparison.tsx` |
| About story / values / team  | `src/components/sections/about.tsx`              |
| Contact form & channels      | `src/components/sections/contact.tsx`            |
| Legal copy (privacy/terms)   | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Dashboard data & views       | `src/components/sections/dashboard-app.tsx`      |
| Auth screens                 | `src/components/sections/auth-views.tsx`         |
| Per-page `<title>` / meta    | `metadata` export in each `src/app/**/page.tsx`  |

Most lists are plain arrays of objects (`FEATURES`, `PLANS`, `FAQS`, …) — add,
remove, or reorder items freely.

### Icons

Icons come from [`lucide-react`](https://lucide.dev). Import any icon and use it
the same way the existing ones are used, e.g.:

```tsx
import { Rocket } from "lucide-react";
// ...
<Rocket className="h-6 w-6" />
```

### Replacing the hero mockup

The hero shows a CSS-drawn app mockup
([`src/components/ui/dashboard-mock.tsx`](src/components/ui/dashboard-mock.tsx)).
Replace it with a real screenshot using `next/image`:

```tsx
import Image from "next/image";

<Image
  src="/dashboard.png"
  alt="Flowly dashboard"
  width={1200}
  height={750}
  className="rounded-2xl border border-border shadow-2xl"
  priority
/>
```

---

## ☁️ Deploying on Vercel

This template is optimized for [Vercel](https://vercel.com) (the makers of
Next.js).

### Option A — Git (recommended)

1. Push this project to a GitHub / GitLab / Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and **import** the repo.
3. Vercel auto-detects Next.js — keep the defaults and click **Deploy**.
4. Every push to your default branch ships to production; pull requests get
   their own preview URLs.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel          # deploy a preview
vercel --prod   # deploy to production
```

No environment variables are required — it's a static marketing site.

---

## 🗂 Project structure

```
src/
├─ app/
│  ├─ globals.css        # design tokens + base styles (theme lives here)
│  ├─ layout.tsx         # fonts, metadata, providers
│  ├─ page.tsx           # landing page (assembles all sections)
│  ├─ not-found.tsx      # custom 404
│  ├─ pricing/           # /pricing
│  ├─ about/             # /about
│  ├─ contact/           # /contact
│  ├─ privacy/           # /privacy
│  ├─ terms/             # /terms
│  ├─ dashboard/         # /dashboard (live in-app demo)
│  ├─ login/             # /login
│  ├─ signup/            # /signup
│  └─ forgot-password/   # /forgot-password
├─ components/
│  ├─ providers.tsx      # next-themes + Framer Motion reduced-motion config
│  ├─ theme-toggle.tsx   # dark/light switch
│  ├─ sections/          # page sections + page-specific blocks
│  └─ ui/                # reusable bits: button, container, logo, site-shell…
└─ lib/
   ├─ motion.ts          # shared Framer Motion variants
   └─ utils.ts           # cn() class-name helper
```

---

## 📄 License

You are free to use this template for personal and commercial projects per the
terms of your purchase. Please don't redistribute or resell the template itself.

Built with care. Happy shipping! 🚀
