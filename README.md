# Muslim Learning & Da'wah (MLD) Website

A Next.js site inspired by clean nonprofit layouts (hero, donate CTAs, events, gallery, FAQ-style sections). Built for **Muslim Learning & Da'wah** in the DMV.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin panel (for the team)

Go to **/admin** and sign in with the shared password. From there the team can:

- **Events**: add, edit or delete events and upload flyers. Events move from "Upcoming" to "Past" on their own the day after their date, and upcoming ones show on the home page.
- **Weekly programs**: tick "Repeats every week" (e.g. the Q&A with Shaykh Hamad) and the event stays listed as "Every Tuesday" until deleted.
- **Articles**: write articles with simple formatting (headings, bullets, quotes, bold, links), a cover image and an optional YouTube/Instagram video. Save as a draft or publish. The newest three show on the home page.
- **Gallery**: upload photos and flyers, and edit captions. The newest four also show on the home page.
- **Inbox**: every website form (contact, event requests, article submissions, sisters' WhatsApp group requests) lands here. Submissions are encrypted in storage.
- **Links & contact**: WhatsApp group link, GoFundMe link, Instagram and email.

Large phone photos are resized in the browser before upload.

### Deploying on Vercel

1. Import the repo into Vercel.
2. **Storage → Create → Blob** and connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`, which is where admin edits and photos are saved.
3. **Settings → Environment Variables**: add `ADMIN_PASSWORD` (and `NEXT_PUBLIC_WEB3FORMS_KEY` for the forms).
4. Redeploy.

Until the first admin save, the site shows the starting content in `src/lib/site-config.ts`. Locally (no Blob token), edits are saved to `.data/` and `public/uploads/`. That is for testing only and isn't copied to the live site.

Speakers and donation packages are still edited in `src/lib/site-config.ts`.

## Donations (easiest path)

Donations go through your existing **GoFundMe** (link editable at /admin → Links & contact).

The **Donate** page shows three packages (Quran, conference, general). Each button opens GoFundMe with a suggested `amount` query parameter. Ask donors to add a short note on GoFundMe for allocation.

Later you can add Stripe Payment Links or PayPal without changing the rest of the site.

## Form emails

Every form saves to the admin Inbox **and** is emailed to muslimlearningdawah@gmail.com through Web3Forms. The access key is already in `src/lib/site-config.ts`, and you can override it with `NEXT_PUBLIC_WEB3FORMS_KEY`. Manage it at [web3forms.com](https://web3forms.com) while logged in as muslimlearningdawah@gmail.com.

## Domain

The site is set up for **https://muslimlearningdawah.com** (`site.url` in `src/lib/site-config.ts`). In Vercel, go to **Settings → Domains**, add `muslimlearningdawah.com` and `www.muslimlearningdawah.com`, then copy the DNS records Vercel shows into your domain registrar.
