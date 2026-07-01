# Website Projects

This repository contains two independent full-stack web projects, each built with **Next.js** (App Router) and **TypeScript**. They are organized as a monorepo for review purposes; each project can also be run, built, and deployed on its own.

| Project | Folder | Description |
|---|---|---|
| **The Banquet** | [`apps/banquet`](apps/banquet) | Marketing site for a premium banquet/event venue — celebrations, signature venues, gallery, and contact/booking flow. |
| **BrewdBro** | [`apps/brewdbro`](apps/brewdbro) | 3D product storefront (D2C) for an instant coffee premix + reusable tumbler brand — live Three.js hero, product catalogue, cart, and checkout flow. See [`apps/brewdbro/README.md`](apps/brewdbro/README.md). |

## Repository structure

```
.
├── apps/
│   ├── banquet/       # The Banquet — venue marketing site
│   └── brewdbro/      # BrewdBro — 3D D2C storefront
└── README.md          # you are here
```

## Tech stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Animation/3D:** Framer Motion, React Three Fiber (BrewdBro)
- **Deployment:** Vercel / Netlify

## Getting started

Each project is self-contained with its own dependencies. To run either site locally:

```bash
cd apps/banquet      # or apps/brewdbro
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Author

Shreyas Bhardwaj
