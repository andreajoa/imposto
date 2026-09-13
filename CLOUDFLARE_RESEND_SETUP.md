# Express Solution — Cloudflare Pages + Resend

The contact form posts to `/api/contact`, implemented by `functions/api/contact.js` as a Cloudflare Pages Function. No secret is exposed to the React bundle.

## Required production variables

Configure these in the Cloudflare Pages project under **Settings → Variables and Secrets** for Production (and Preview if desired):

- `RESEND_API_KEY` — Resend API key with permission to send email.
- `RESEND_FROM` — verified sender, for example `Express Solution <website@express-solution.com>`.
- `CONTACT_TO` — `support@express-solution.com`.

## Resend domain

Verify `express-solution.com` inside Resend and add the exact DNS records Resend supplies. Do not guess DKIM/SPF records: use the values generated for this Resend account. After verification, use an address on the verified domain in `RESEND_FROM`.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- SPA fallback is provided by `public/_redirects`.
- The `functions/` directory must remain at the project root so Cloudflare Pages deploys `/api/contact`.

## Smoke test after deployment

1. Open `/abertura-de-empresa-nos-eua` directly in a fresh tab.
2. Submit the contact form with a real reply-to address.
3. Confirm a 200 response from `/api/contact`.
4. Confirm the message arrives at `support@express-solution.com` and that Reply targets the visitor's email.
5. Check Resend delivery logs for the message ID.
