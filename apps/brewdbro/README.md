# BrewdBro — example 3D D2C website

A premium, mobile-first storefront for **BrewdBro** (instant coffee premix + aesthetic
reusable glass tumblers). Built to win a Future Founders showcase *and* function as a
real store. Live 3D product hero + a complete cart → UPI checkout flow.

> Brand direction: **Warm Café × Liquid Glass**. Strategy doc lives one level up at
> `../BrewdBro-Website-Masterplan.md`.

## Stack
- **Next.js 16** (App Router, TypeScript) + **Tailwind v4**
- **React Three Fiber + drei** — the live glass-tumbler hero (`src/components/three/`)
- **Framer Motion** — scroll reveals & micro-interactions
- **Zustand** — persistent cart
- Free to host on **Vercel**. Fonts self-hosted via `next/font` (Outfit / DM Sans / Space Mono).

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## What's built
- `/` — cinematic home: 3D pour hero (tap a finish to swap the cup), combo, three cups,
  the 30-sec ritual, UGC wall, "a real business" unit-economics strip, final CTA.
- `/shop` — filterable catalogue.
- `/product/[slug]` — live 3D viewer + "make it a combo" upsell toggle + specs.
- `/cart`, `/checkout`, `/success` — full flow with free-shipping threshold + campus-pickup.
- `/our-story` — the founder/judge narrative.

## Checkout / payments
Checkout ships in **demo mode**: a realistic Razorpay-style sheet that always completes,
so it works every time you present it. To go live with real UPI:

1. Create a Razorpay account, get your **Key ID / Key Secret**.
2. Add a server route (`app/api/create-order`) that creates an order with the secret
   (server-side only) and a `verify-payment` route that checks the signature.
3. Load `checkout.js`, open Razorpay with the public key + returned `order_id`, and on
   success route to `/success`. Replace `RazorpayDemoSheet` in `src/app/checkout/page.tsx`.
4. Never expose the Key Secret to the browser.

## Deploy (free)
Push to GitHub → import on **vercel.com** → deploy. No config needed.

## Edit the catalogue
All products, prices, copy and specs live in `src/lib/products.ts`. Brand colours and
type tokens live in `src/app/globals.css` (`@theme`).
