# Flowly — a premium SaaS template

Thanks for picking this up! Flowly is a complete, production-ready website for
a modern SaaS product — not just a landing page, but the whole front: marketing
pages, legal pages, auth screens, and a working in-app dashboard demo.

It's built with the current versions of the tools you'd reach for anyway:
Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion, and
lucide-react. Dark and light mode are baked in, everything is typed, and there
isn't a single line of Lorem Ipsum — every page ships with real, editable copy.

The demo is themed around a fictional project-management tool called *Flowly*.
Change the name, swap a color, edit the text, and it's your product.

---

## What you're getting

- **15 pages, fully built out** — a long-form landing page, a dedicated pricing
  page with a comparison table, about, contact, privacy, terms, a custom 404,
  three auth screens (login, signup, forgot-password), and a live dashboard with
  Board, Timeline, Inbox, Reports, and Settings views.
- **Animations that feel expensive, not exhausting** — on-load reveals,
  scroll-driven parallax, horizontal pinned showcases, a custom cursor, an
  interactive gradient canvas. All of it respects `prefers-reduced-motion` and
  is tuned to stay smooth on phones.
- **One-variable theming** — recolor the entire site by changing a single CSS
  variable. Seriously.
- **Genuinely responsive** — designed mobile-first, with lighter animation paths
  on touch devices so nothing janks.
- **Clean, typed code** — TypeScript throughout, sensible component structure,
  zero lint errors out of the box.

---

## Getting it running

You'll need Node 18.18+ (Node 20+ recommended). Then:

```bash
npm install
npm run dev
```

Open http://localhost:3000 and you're looking at the full site.

When you're ready to ship:

```bash
npm run build   # production build
npm run start   # serve that build locally
npm run lint    # check for lint issues
```

---

## Making it yours

### 1. The color

This is the fun one. Almost everything — buttons, badges, icons, gradients,
links, the progress bars — is driven by CSS variables in
[`src/app/globals.css`](src/app/globals.css). To rebrand the whole site, change
`--primary`:

```css
:root {
  --primary: #7c3aed;        /* violet, the default */
  --primary-hover: #6d28d9;
  --primary-foreground: #ffffff;
}

.dark {
  --primary: #8b5cf6;        /* a touch brighter for dark backgrounds */
  --primary-hover: #a78bfa;
  --primary-foreground: #ffffff;
}
```

Try `#2563eb` for blue, `#059669` for emerald, `#e11d48` for rose, or `#ea580c`
for orange. The neutral palette (`--background`, `--surface`, `--border`,
`--muted`, …) and the global corner radius (`--radius`) live in the same file if
you want to go further.

### 2. The words

There's no placeholder text to hunt down. Each section keeps its content in a
plain array or object right at the top of its file, so editing is mostly just
typing. Here's where the main things live:

| What you want to change      | Where it is                                      |
| ---------------------------- | ------------------------------------------------ |
| Brand name & logo            | `src/components/ui/logo.tsx`                      |
| Nav links + CTA buttons      | `src/components/sections/navbar.tsx`              |
| Hero headline & copy         | `src/components/sections/hero.tsx`                |
| Feature cards                | `src/components/sections/features.tsx`            |
| "How it works" steps         | `src/components/sections/how-it-works.tsx`        |
| Pricing plans                | `src/components/sections/pricing.tsx`             |
| Testimonials                 | `src/components/sections/testimonials.tsx`        |
| FAQ                          | `src/components/sections/faq.tsx`                 |
| Footer links & socials       | `src/components/sections/footer.tsx`              |
| About story / values / team  | `src/components/sections/about.tsx`               |
| Contact form & channels      | `src/components/sections/contact.tsx`             |
| Legal copy                   | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |
| Dashboard demo data          | `src/components/dashboard/`                       |
| Page titles & SEO meta       | the `metadata` export in each `src/app/**/page.tsx` |

### 3. The font

It uses Inter (via `next/font/google`) set up in
[`src/app/layout.tsx`](src/app/layout.tsx). Swap in any Google font by changing
the import:

```ts
import { Manrope } from "next/font/google";

const inter = Manrope({ variable: "--font-inter", subsets: ["latin"] });
```

### 4. The hero mockup

The hero shows an app mockup drawn entirely in CSS
([`src/components/ui/dashboard-mock.tsx`](src/components/ui/dashboard-mock.tsx)).
When you have a real screenshot, drop it in with `next/image`:

```tsx
import Image from "next/image";

<Image src="/dashboard.png" alt="Your app" width={1200} height={750} priority
  className="rounded-2xl border border-border shadow-2xl" />
```

---

## Going live

It's a Next.js app, so it deploys anywhere Next.js does. The easiest path is
[Vercel](https://vercel.com):

1. Push the project to GitHub (or GitLab / Bitbucket).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Keep the auto-detected defaults and hit **Deploy**.

Or from your terminal:

```bash
npm i -g vercel
vercel --prod
```

There are no environment variables to set — it's a static marketing site.

---

## How it's laid out

```
src/
├─ app/                  # one folder per route (App Router)
│  ├─ globals.css        # design tokens + base styles — the theme lives here
│  ├─ layout.tsx         # fonts, metadata, providers
│  ├─ page.tsx           # the landing page
│  ├─ dashboard/         # the live in-app demo and its views
│  └─ … about, pricing, contact, privacy, terms, login, signup, …
├─ components/
│  ├─ sections/          # the big page sections
│  ├─ dashboard/         # the dashboard UI pieces
│  └─ ui/                # reusable bits (button, container, logo, cursor…)
├─ hooks/                # small custom hooks (scroll, media queries)
└─ lib/
   ├─ motion.ts          # shared Framer Motion variants
   └─ utils.ts           # the cn() class-name helper
```

---

## A couple of things worth knowing

- The animation variants in `src/lib/motion.ts` are shared across the site, so
  tweaking timing or easing in one place updates everything consistently.
- Touch devices automatically get lighter animation paths (the 3D hero tilt is
  dropped, the background canvas throttles itself) so the experience stays
  smooth on real phones.
- Everything works with reduced motion turned on — animations gracefully fall
  back to static layouts.

---

## License

You're free to use Flowly for unlimited personal and commercial projects under
the terms of your purchase. Please don't redistribute or resell the template
itself.

That's it — go build something great. If you run into anything, reach out.
Happy shipping.
