# Scroll Craft verification — Express Solution guide collection

Routes:

- `/` — **Guia Completo de Impostos para Imigrantes nos EUA**
- `/abertura-de-empresa-nos-eua` — **Abertura de Empresa nos EUA**

Framework: existing **React 18 + Vite + React Router** architecture preserved. No framework migration and no KIE usage.

## Journey / page grammar — Guia Completo de Impostos

1. Hero establishes the problem, product, price, language and immediate action before secondary detail.
2. Topic rail gives fast recognition: W-2, 1099, Schedule C, dependents, deductions and credits.
3. Scroll-filled editorial statement reframes the goal from “memorize forms” to “understand what to observe and organize”.
4. Sticky problem cards convert confusion into three concrete outcomes: understand, organize, recognize when help is needed.
5. Chapter matrix explains the scope without turning the page into a generic feature grid.
6. Sticky tools section proves utility beyond one reading session.
7. Dedicated offer block repeats product, price, contents and CTA at the high-intent point.
8. Author section adds context and trust without fabricated testimonials or unsupported credentials.
9. FAQ removes purchase friction.
10. Contact section creates a human fallback before the footer.

## Journey / page grammar — Abertura de Empresa nos EUA

- Hero establishes brand, author and topic.
- Narrative moves through decision → structures → LLC comparison → opening sequence → contents → precision warnings → author → contact.
- Long-form reading alternates editorial text, stacked cards, timeline and chapter cards.

## Signature move

The collection uses **editorial 3D books + stacked charcoal decision cards** as its visual fingerprint. The books are intentionally static: no floating/swinging animation. Scroll motion happens in surrounding content, not on the cover itself.

## Feeling curve

1. Premium authority.
2. Recognition of the reader’s confusion.
3. Relief through clear structure.
4. Practical momentum through chapters/tools.
5. Purchase confidence from transparent scope and price.
6. Human trust from author/context.
7. Low-friction purchase/contact.

## Fingerprint gate

- Official palette only: charcoal `#2D2D2D`, charcoal-soft `#434242`, warm gray `#5D5A57`, taupe `#948A85`, beige `#AAA39F`, ivory `#EBE7E2`, soft gray `#C7C5C3`, warm white `#F7F3ED`.
- No blue gradients, navy sections, neon UI or generic SaaS-dashboard visual language.
- Editorial serif hierarchy + restrained sans-serif UI copy.
- Fine-line dividers, dot/line motifs, book-spine details and warm neutral surfaces echo the supplied Express Solution creatives.
- Root product cover is always **Guia Completo de Impostos para Imigrantes nos EUA**.
- Business-opening product cover is always **Abertura de Empresa nos EUA**.

## Mobile art direction

- Hero becomes one column with the book shown before copy to establish the product immediately.
- Static 3D book scales down without animation.
- Navigation simplifies and the desktop nav links disappear.
- A fixed mobile purchase bar keeps price + CTA accessible without blocking content.
- Chapter grid becomes one column.
- Sticky tool copy returns to normal flow.
- Sticky stacked cards remain readable with larger touch-safe spacing.
- Contact and offer sections become one column.
- Horizontal topic rail is intentionally scrollable on small screens.

## Motion / accessibility

- Book covers have no floating, swinging or looping motion.
- `prefers-reduced-motion` disables reveal transitions and sticky-card transforms.
- Scroll work is throttled with `requestAnimationFrame`.
- Reveal behavior uses `IntersectionObserver`.
- Decorative progress/grid/book elements are non-semantic.
- Form labels remain explicit and contact status uses `aria-live`.
- Buttons and links retain keyboard focus visibility.

## Conversion checks

- Primary CTA appears in hero, navigation, offer section and mobile purchase bar.
- Price `$24.99`, digital/PDF format and Portuguese language are visible before purchase.
- No invented testimonials, review counts, tax savings or refund guarantees.
- Copy avoids presenting credits/deductions as guaranteed outcomes.
- Offer block states payment is processed by the connected checkout and access is released after confirmation.
- Cart keeps the existing Stripe checkout behavior.

## Performance / implementation

- No external animation library added.
- No full-screen canvas, shader or continuous particle loop.
- Product mockups on the page are HTML/CSS and reuse the existing author image asset instead of adding a heavy runtime dependency.
- Existing `/api/contact` server-side flow remains intact.
- React Router routes remain intact.

## Verification pass

Code-level verification completed for:

- Product/title separation between the two guide routes.
- Root route switched to the new tax-guide page without changing the app framework.
- Official neutral palette used in the new landing page and final brand overrides.
- Static book requirement enforced globally for both legacy `Book3D` and business-opening mockup.
- Cart thumbnail updated to the correct **Guia Completo de Impostos** identity.
- Mobile breakpoint coverage at 1100 / 860 / 620 px.
- Reduced-motion fallback included.
- Contact form remains connected to `/api/contact`.

Production smoke checks still required after deployment:

- Direct-load `/` and `/abertura-de-empresa-nos-eua`.
- Desktop/mobile visual check at 1440, 1024, 768 and 390 widths.
- Open/close cart and follow Stripe checkout link.
- Verify contact submission reaches `support@express-solution.com`.
- Verify deployment cache is showing the latest main-branch build.
