# Stoneleigh Interiors

Marketing website for **Stoneleigh Interiors**, a bespoke interior design studio in
Bengaluru, India. The studio designs complete home interiors, living rooms, modular
kitchens, bedrooms and wardrobes.

## Stack

- **Next.js 16** (App Router, React Server Components) with **React 19**.
- **Tailwind CSS 4**, configured through `@theme` design tokens in
  `src/app/globals.css` (the "Soft Contemporary Luxury" palette: warm ivory and
  linen surfaces, natural stone and muted taupe, a restrained muted-sage accent and
  deep charcoal type).
- **motion** for animation and **lenis** for smooth scrolling.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. The page
auto-updates as you edit.

## Environment variables

Set these in an untracked `.env.local` for local work, and set the same values in
your hosting provider's dashboard for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ENQUIRY_WEBHOOK_URL` | Yes, to receive enquiries | HTTPS endpoint that accepts a JSON `POST` (for example a Formspree form endpoint or your own serverless function). Until it is set, `POST /api/enquiry` returns `503 CHANNEL_NOT_CONFIGURED` and the form shows an honest "not connected yet" message rather than a fake success. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Optional | Google Analytics 4 measurement ID. Analytics load only when both a measurement ID is configured **and** the visitor consents to analytics cookies. |

## Client input required before launch

The build is deliberately missing the following because it was never supplied.
Nothing below has been invented, and the UI degrades gracefully while these are
empty. Each item lists what to change.

1. **Production domain.** `site.url` in `src/lib/site.ts` currently reads
   `"https://www.stoneleighinteriors.com"`. It is used for canonical URLs, Open
   Graph tags, `sitemap.xml` and `robots.txt`. Confirm the real domain and update
   it.
2. **Instagram profile URL.** `site.social.instagram` is an empty string, so every
   Instagram link and icon is hidden. Supply the profile URL to enable them.
3. **Google reviews.** `src/lib/reviews.ts` exports an empty `reviews` array and an
   empty `reviewsSourceUrl`. The homepage testimonials section renders nothing while
   `reviews` is empty (it returns `null`). Supply the studio's genuine, verbatim
   Google reviews (author, rating 1–5, verbatim text, date, and an optional review
   permalink) and the Google listing URL to switch the section on. **Testimonials
   must never be invented.** The footer's "Read Google reviews" link is likewise
   gated: `site.social.googleReview` is an empty string and stays hidden until the
   Google Business Profile review URL is supplied.
4. **Phone, email and WhatsApp number.** `site.contact.phone`, `site.contact.email`
   and `site.contact.whatsapp` are all empty strings, so phone/email links and the
   WhatsApp CTAs are hidden, and the sticky mobile bar falls back to a "Get
   directions" action. Supply these to enable the direct contact options.
5. **Genuine project photography and verified project data.** The site currently
   ships representative stock imagery and representative case studies: every entry
   in `src/lib/projects.ts` carries `representative: true` and the UI labels it
   "Representative study". Supply verified project names, locations, dates, areas
   and photography, then set `representative: false` and replace the image paths in
   `src/lib/images.ts` (see `public/assets/images/ATTRIBUTION.md`).
6. **GA4 measurement ID.** Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID`. Analytics stay off
   until the visitor consents.
7. **Enquiry delivery endpoint.** Set `ENQUIRY_WEBHOOK_URL` (see the table above).
8. **Response-time expectation.** Left empty on purpose (`site.responseExpectation`):
   the brief allows a reply-time promise only once approved, so nothing is shown
   until you set a value here.

The address in `site.address` (the studio's registered Bengaluru address) is the
only verified business fact supplied by the client; the Google Maps directions link
is derived from it rather than from a fabricated listing.

## Notes for contributors

- This project uses a Next.js version with breaking changes: read the bundled
  guides in `node_modules/next/dist/docs/` before writing Next.js code (see
  `AGENTS.md`).
- All image slots resolve through `src/lib/images.ts`, and every file shipped under
  `public/assets/images/` is recorded in
  `public/assets/images/ATTRIBUTION.md`.

## Development

```bash
npm run dev    # start the dev server on http://localhost:3000
npm run build  # production build
npm run lint   # eslint
```

## Deploy

Deploy to any Node.js host that supports Next.js (Vercel, Netlify, a container,
etc.). Before going live, set `ENQUIRY_WEBHOOK_URL` and the optional
`NEXT_PUBLIC_GA4_MEASUREMENT_ID`, and point `site.url` in `src/lib/site.ts` at the
final production domain so canonical URLs, the sitemap and Open Graph tags resolve
correctly. Work through "Client input required before launch" above.
