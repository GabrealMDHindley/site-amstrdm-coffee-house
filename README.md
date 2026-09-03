# AMSTRDM Coffee House — website

Next.js (App Router) site for AMSTRDM Coffee House — Paso Robles & Atascadero, CA.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- React Three Fiber / drei — the 3D espresso cup in the hero
- GSAP + ScrollTrigger — the pinned hero camera sequence and scroll reveals

## Local development
```bash
npm install
npm run dev
```

## Connecting the contact form to a CRM (e.g. GoHighLevel)
The Contact page form posts to `/api/contact`. Set the `CRM_WEBHOOK_URL` environment
variable (in Vercel → Project → Settings → Environment Variables) to your CRM's
inbound webhook URL, and every submission is forwarded there as JSON automatically —
**no code changes required**. Until it's set, the form gracefully falls back to a
pre-filled `mailto:` link so no lead is ever lost.

Payload shape forwarded to the webhook:
```json
{
  "source": "amstrdm-coffee-house-website",
  "submittedAt": "2026-09-03T12:00:00.000Z",
  "name": "Jane Doe",
  "email": "jane@email.com",
  "phone": "(805) 555-0100",
  "preferredLocation": "Paso Robles",
  "message": "…"
}
```

See `.env.example`.
