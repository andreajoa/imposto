# Scroll Craft verification — Abertura de Empresa nos EUA

Route: `/abertura-de-empresa-nos-eua`

## Journey / page grammar

- Hero establishes brand, author, topic and primary actions before any technical detail.
- Narrative moves from decision → structures → LLC comparison → opening sequence → book contents → precision warnings → author → contact.
- Long-form reading alternates editorial text, interactive comparison, timeline and chapter cards to avoid a repetitive landing-page rhythm.

## Signature move

The visual fingerprint is the **stack of dark editorial cards** derived from the Express Solution social design. Cards compress visually as the next one reaches the sticky point. On mobile the stack becomes normal document flow to preserve legibility.

## Feeling curve

1. Authority / premium restraint.
2. Clarity around a confusing decision.
3. Controlled interaction during comparison.
4. Practical momentum through the opening timeline.
5. Confidence from precise caveats and author context.
6. Low-friction contact.

## Fingerprint gate

- Palette is limited to charcoal, warm ivory, beige and taupe.
- Playfair Display is used for editorial display hierarchy; Lato for interface/body copy.
- Dot matrices, rounded ivory corner blocks, large portrait crop and fine-line borders echo the supplied Express Solution creatives without copying their layout literally.
- No generic blue SaaS gradients, neon effects or stock-dashboard visual language.

## Mobile art direction

- Sticky structure cards are converted to static cards below 720 px.
- Hero switches to one column; CTA buttons become full width.
- LLC expanding panels become a vertical list.
- Timeline remains linear and readable.
- Contact form becomes one column.
- Decorative orbital elements are removed on small screens.

## Motion / accessibility

- `prefers-reduced-motion` disables float, ticker, sticky transforms and long transitions.
- Interactive LLC panels use real buttons.
- Form labels are explicit; submit state is announced through `aria-live`.
- Progress indicator and decorative graphics are non-semantic.
- Focus states remain available for links, inputs and buttons.

## Performance / implementation

- No external animation library added.
- Scroll work is throttled through `requestAnimationFrame`.
- No full-screen canvas or continuous particle loop is used.
- Existing Vite + React architecture is preserved.
- `/api/contact` remains server-side through Cloudflare Pages Functions; no Resend key enters the browser bundle.

## Production smoke checks

- Direct-load `/abertura-de-empresa-nos-eua` (SPA fallback).
- Desktop and mobile layout at 1440, 1024, 768, 390 widths.
- Keyboard navigation through header, LLC panels, links and form.
- Reduced-motion OS setting.
- Submit contact form and verify email delivery to `support@express-solution.com`.
- Confirm Resend sender domain verification and Cloudflare environment variables.
