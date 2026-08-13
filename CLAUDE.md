# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (next/core-web-vitals + typescript config)
```

There is no test suite and no typecheck script. CI is not configured in this repo.

## Project overview

Gymivo is a Persian-language fitness coaching app (RTL). This repo is the **frontend only** — there is no API layer, no data fetching, and no backend integration anywhere. All data shown in the UI is hardcoded mock data in the page components. `express` is in dependencies but unused in app code.

Stack: Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS, MUI (@mui/material + @mui/icons-material) with Emotion, framer-motion, swiper, react-circular-progressbar, react-mobile-picker, react-multi-date-picker. Deployed on Vercel (gymivo-frontend.vercel.app); Dockerfile exists for standalone deploys (`output: "standalone"` in next.config.ts).

## Architecture

### Mobile-only app shell
The root layout (`app/layout.tsx`) sets `lang="fa" dir="rtl"` and constrains the body to `max-w-[390px]` centered with a shadow — the entire app renders as a phone-width column even on desktop. All UI text is Persian. The Vazirmatn font is self-hosted via @font-face in `app/globals.css` from `/public/fonts`.

**RTL note:** because of `dir="rtl"`, CSS left/right are visually flipped. Existing code compensates by wrapping arrow icons in `dir="ltr"` spans (see `components/Button.tsx`) or rotating icons with `rotate-180`.

### Everything is a client component
Every page starts with `"use client"` — there are no server components, no API routes, no layouts beyond the root layout. Navigation uses `useRouter()`/`next/link` directly.

### Routes
Two trees: public marketing pages (`/`, `/about`, `/contact`, `/faq`, `/terms`, `/plans`, `/coach`, `/analyse`, `/welcome`, `/welcome/login`) and the logged-in dashboard area (`/dashboard/*`).

**Thin-route pattern:** for some public pages the content lives in `components/<name>/page.tsx` (about, contact, faq, terms) and the route in `app/` is a thin re-export wrapper.

**Placeholder routes:** the dashboard links to `/notifications`, `/schedule`, `/my-program`, `/categories`, `/moves`, `/coach-register`, `/trainers`, `/cooperate` — these routes do not exist yet. When adding new pages, check whether other pages already link to that path before choosing a route name.

### Shared components (`components/`)
- `Button.tsx` — shared button with hardcoded Tailwind class maps for `variant` (black/white/primary), `size` (cta/sm/md/lg/xl/huge), `arrow` props.
- `Header.tsx` — landing header with slide-out menu drawer.
- `Footer.tsx` / `DashboardFooter.tsx` — landing footer and the fixed bottom pill navigation for the dashboard section (nav items: /dashboard, /plans, /coach, /analyse, /dashboard/profile).
- `SearchBox.tsx`, `Carousel.tsx` (swiper wrapper).

### Styling conventions
- Tailwind v3 config in `tailwind.config.js` defines the design tokens: brand color scale `primary-{0..900}` (lime/yellow-green) and `neutral-{white,ligher,light,gray,dark,darker}`. Use these tokens rather than hex values.
- Arbitrary values (`text-[40px]`, `w-[343px]`) are used heavily — design is done to fixed pixel specs.
- MUI is used mainly for `TextField`/`InputAdornment` in forms and `@mui/icons-material` icons, which appear throughout; page-specific SVGs live in `public/svg/` and `public/landing/`.
- Images are either statically imported from `public/` using the `@/public/...` path alias (e.g. `@/public/landing/cycle/right.png`) or referenced by string URL (`/dashboard/hero-section.png`). Both styles are in active use.
- `tsconfig.json` maps `@/*` to the repo root (not `src/`).

## Design system & brand rules (source of truth: `.claude/docs/`)

The designer/owner handoff pack lives in `.claude/docs/` (README + files 01–06: design system, brand voice, component guide, accessibility, code conventions, Ready Program Card spec). These are authoritative for design decisions. The original source files they reference (`bussiness/…`, `docs/design/…`, `tasks/…`) are NOT in this repo — only the distilled .md files are. The load-bearing rules:

### Color tokens
- Always use `primary-0..900` and the custom **named** `neutral-*` scale; never raw hex in classes. `primary-300` = `#ECFB6D` (brand yellow, also used as text highlight), `neutral-darker` = `#212121` (main text/dark surfaces).
- ⚠️ `tailwind.config.js` **extends** (does not replace) Tailwind's default `neutral-50..950`, so numeric classes like `neutral-500` silently resolve to Tailwind's default palette, not the brand scale. Existing code mixes both systems (layout, profile, SearchBox…). **New code must use only the named tokens:** `neutral-white`, `neutral-ligher` (sic — misspelled in the config on purpose), `neutral-light`, `neutral-gray`, `neutral-dark`, `neutral-darker`.
- Semantic colors are specified in docs 01 but not yet in tailwind.config: success `#4CAF50`, warning `#FF9800`, error `#F44336`, info `#2196F3`. If you need them, add them to the config with a `success-*`/`error-*`/… scale rather than hardcoding.

### Typography
- Vazirmatn everywhere. Only weight 400 is loaded (`public/fonts/`) — bold headings currently rely on synthetic bolding. Adding 500–900 font files is known debt.
- Type scale in docs 01 (H1 57/700 → Caption 12/400). Spacing: multiples of 4px (8px grid). Radius: sm 4 / md 8 / lg 12 / xl 16 / 2xl 24 / full.

### Persian copy (docs 02)
- Friendly, informal, motivating tone — never administrative. «پروفایلت رو تکمیل کن», not «تکمیل پروفایل کاربر الزامی است».
- Always use نیم‌فاصله (ZWNJ ‌) where Persian grammar requires it, Persian digits (۱۲۳) for user-facing numbers, Persian punctuation («» ، ؟).
- Latin fragments (`@username`, phone numbers, `kg`/`cm`) go inside `dir="ltr"` spans.
- Standard empty-state / success / error message patterns are in docs 02 — reuse them verbatim so messages stay consistent across the app.

### RTL specifics
- Prefer logical properties / logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`) over `left`/`right` for direction-sensitive spacing.
- "Next/forward" arrows point left in RTL. Existing compensation: `dir="ltr"` spans around arrow icons (Button.tsx) or `rotate-180`.
- Icons sit to the right of their labels in RTL; `flexDirection: "row-reverse"` for horizontal layouts.

### Dashboard page shell
Standard pattern: `"use client"`; 3-column header (back button | title | action or spacer); `<main className="px-5 pb-24">`; `<DashboardFooter />` at the end. Reuse `Button` (variant/size/arrow — feature-complete), `SearchBox`, `Carousel`, `DashboardFooter`; do not rebuild them.

### Commit messages
Tagged, short Persian description: `[feat]`, `[fix]`, `[design]`, `[refactor]` — e.g. `[feat] ساخت صفحه زبان`.

## Known debt (fix when touching related code)

1. Only Vazirmatn 400 loaded; headings need 500–900.
2. Semantic colors (success/warning/error/info) missing from tailwind.config.
3. Numeric default-neutral classes mixed with custom named tokens — unify on the named scale.
4. Mobile width inconsistent: root layout `max-w-[390px]`, welcome/login use 375px. Standard: 390px.
5. Landing Footer links use route names that don't exist or mismatch the dashboard (`/myprograms`, `/movements`, `/createprogram`, `/coaches` vs `/my-program`, `/moves`).
6. `/welcome/signup` and `/forgot-password` are linked but not implemented.
7. Docs 06 (Ready Program Card) is the approved spec for the dashboard's «برنامه‌های پیشنهادی» section — the cards currently in `app/dashboard/page.tsx` predate it.
