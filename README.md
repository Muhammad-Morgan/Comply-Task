## Overview

This repository contains a Next.js application built with the App Router. The app showcases a compliance dashboard, reusable UI primitives, and form flows for login/register backed by server actions or optional remote APIs. Everything is structured around maintainability, accessibility, and solid DX.

## Tech Stack

- **Next.js (App Router)** – Hybrid SSR/SSG/ISR with streaming and PPR so pages stay fast and SEO-friendly.
- **TypeScript** – Static typing to spot bugs during development.
- **ESLint** – Enforces consistent, high-quality patterns.
- **Route Handlers** – `/api/login` and `/api/register` proxy auth logic server-side.
- **Prisma** – Local database fallback whenever external APIs aren’t configured.
- **next/image** – Automatic image optimization and lazy loading.
- **Tailwind CSS** – Utility-first styling.
- **shadcn/ui** – Accessible primitives for dropdowns, cards, inputs, etc.
- **React Query** – Client-side caching and state management for fetches.
- **Vitest + React Testing Library** – Unit/integration tests.
- **Storybook** – Build components in isolation.
- **CI/CD** – Lint/test per push/PR, deploy on Vercel (merge blocked if checks fail).

## Architecture & Approach

1. **Feature-oriented structure** – Folders are grouped by feature for discoverability.
2. **Atomic design** – `components/atoms → molecules → organisms → layouts` keeps layers consistent and reusable.
3. **Generic components** – Cards, dialogs, forms, and tables accept flexible props so styling/function stays consistent across screens.
4. **Accessibility** – Semantic HTML, labeled inputs, ARIA where needed, focus traps in dialogs, and SR-only labels to keep everything screen-reader friendly.
5. **Server-first rendering** – Data requests run on the server so HTML ships ready to hydrate; fallbacks ensure the UI still works without remote APIs.
6. **Optimized media** – `next/image` powers responsive, lazy-loaded imagery.

## Key Features

- **Auth flows** – Login/register forms validated with Zod & react-hook-form, wired to `/api/login` + `/api/register`. Each route tries the external API first and automatically falls back to Prisma when none is provided.
- **Compliance table** – Generic table component with pagination and client search. `getComplianceItems` can read from `COMPLIANCE_API_URL` or fall back to mocked data.
- **Items list** – Pagination, cards, and inline actions (feature/delete) using reusable card+modal components. Fetching is powered by `getItemsAction`, which optionally hits `ITEMS_API_URL`.
- **Reusable UI** – Navigation, dropdowns, modals, forms, and filters follow atomic design and can be slotted anywhere.
- **Countries search** – `/api/countries` streams paginated country data to the front-end. The `useCountries` hook debounces queries, fetches via React Query, and pipes results into the async select with infinite scroll.

## Project Layout

```
app/
 ├─ api/
 │   ├─ countries/route.ts
 │   ├─ login/route.ts
 │   └─ register/route.ts
 ├─ login/page.tsx
 ├─ register/page.tsx
 ├─ Providers.tsx
 ├─ layout.tsx
 └─ page.tsx
components/
 ├─ atoms/            # primitive inputs, buttons, helpers
 ├─ molecules/        # composed widgets (selects, cards, etc.)
 ├─ organisms/        # larger sections (tables, filters, modals…)
 ├─ layouts/          # multi-step forms, wrappers
 ├─ pages/            # stepper wizard steps + marketing pages
 ├─ ui/               # shadcn/ui primitives
 └─ __tests__/        # component-level tests
lib/
 ├─ actions.ts        # server actions + API fallbacks
 ├─ db.ts
 ├─ hooks/            # react-query / async hooks
 ├─ lists.tsx
 ├─ types.ts
 └─ utils.ts          # validation schemas, helpers
```

## Environment Variables

Create `.env` with the following (mock values shown):

```
DATABASE_URL="postgres://..."
AUTH_API_URL="https://api.example.com/auth"           # optional
ITEMS_API_URL="https://api.example.com/items"         # optional
COMPLIANCE_API_URL="https://api.example.com/compliance"  # optional
```

If the optional API URLs are missing or unreachable, the server actions fall back to Prisma (auth) or mock data (items/compliance).

## Scripts

```
npm run dev       # start dev server
npm run build     # production build
npm start         # run production build
npm run lint      # lint with ESLint
npm run test      # run vitest
npm run test:watch
```

## Testing & Storybook

- Vitest + React Testing Library cover unit/integration tests.
- Storybook can be added (e.g., `npm run storybook`) to review components in isolation.

## Deployment & CI

- Recommended deployment target: **Vercel** (supports App Router + streaming).
- CI workflow (GitHub Actions example) should run `npm run lint` + `npm run test`; merges are blocked if checks fail. Deployment can be triggered after CI passes.

## API Behavior

- **POST /api/login** – Forwards to `loginAction`, returning `{ ok, message, redirectTo? }`.
- **POST /api/register** – Forwards to `registerAction`, returning `{ ok, message }`.
- **GET /api/countries** – Accepts `?q` and `?cursor` params, proxies a lightweight dataset, and returns paginated `{ options, nextCursor }` to power the async select experience without exposing third-party keys.
- Server actions automatically use Prisma or upstream APIs depending on the env vars mentioned above.

## Component Cheat Sheet

- **ChallangeLayout** – Orchestrates the multi-step wizard, maintains shared form state, and controls step transitions/validation. It also handles the global reset when the success modal confirms.
- **FirstPage** – Captures personal info (name/email/gender/country/age) via react-hook-form and zod; wires the gender and country cards while keeping all fields controlled.
- **SecondPage** – Hosts the category dropdown, interests multi-select, and avatar uploader; each widget syncs directly with the form’s `preferencesSchema`.
- **SubmitPage** – Renders the summary table, the readiness widget, and wires the submit button to open the success modal while forwarding the collected key/value pairs.
- **CategorySearchSelect** – Front-end searchable dropdown that filters static options, handles keyboard toggling, and communicates selection back up through controlled props.
- **InterestsMultiSelect** – Async-feel multi-select with loading shimmer, removable chips, and a hard cap (5) enforced in both UI and validation.
- **ButtonWithIcon** – Convenience wrapper around `<ComplyButtons>` to keep icon/button spacing, focus styles, and CTA sizes consistent across steps.
- **SuccessModalDialog** – Accessible dialog with focus trap, keyboard support, and optional summary rows so the user can review entries before resetting the wizard.

## Development Notes

- Use TypeScript + ESLint for correctness.
- Keep components generic, props-driven, and accessible.
- Route handlers are the single point for auth requests, making it easy to swap backends without touching UI.
- React Query caches table/list data; tailor stale times based on API return times.

---

Happy building! Add more docs or examples as the app evolves. Note: there are a few unrelated demo components in the repo that were left intentionally for illustration/reference.
