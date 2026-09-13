# Express Solution: SEO and launch handoff

## Prepared in preview
- Build-time React rendering supplies real page content without waiting for JavaScript. Same components hydrate in the browser.
- Five public canonical URLs, route-specific descriptions, Organization/WebSite/Book/Person/Breadcrumb structured data and reciprocal Portuguese/English alternate links.
- Boston resource page targets Portuguese-speaking readers without asserting an unverified physical office, address, telephone, license, reviews or service area.
- Sitemap generated at /sitemap.xml. Robots allows public discovery in production. Preview builds use noindex and disallow crawling. Order confirmation and PDFs use noindex; this is not file access protection.
- No catch-all rewrite to the home page. Unknown URLs should receive the host's 404 response with the custom 404.html.
- No invented ratings, claims of guaranteed rankings, or special AI markup. Official Google guidance says AI discovery uses the same core search foundations; llms.txt is not required for Google.

## Search Console activation (not completed)
1. Publish and verify the production deployment before submission. Preview URLs are intentionally not indexable.
2. In Google Search Console add Domain property `express-solution.com`.
3. Copy the exact Google-issued TXT verification value into the DNS provider and select Verify. No verification token or authorized Search Console connection was available in this session.
4. Alternative: URL-prefix property `https://www.express-solution.com/`; set the exact meta-tag token as `GOOGLE_SITE_VERIFICATION` in the production build environment and redeploy. Never invent a token.
5. Submit `https://www.express-solution.com/sitemap.xml`.
6. Inspect the home, business-opening and Boston URLs. Check rendered HTML, canonical, index eligibility, mobile layout and response codes. Check any available generative AI inclusion setting in Search Console.
7. Track impressions, clicks, CTR, positions and queries weekly with US country filter; segment Portuguese/English and Boston-intent queries. Search Console does not provide city-level search traffic attribution. Use consent-appropriate analytics if finer reporting is needed; no analytics identifier was supplied.

## Local credibility and growth
- Confirm the business's actual address, service model, phone, hours, credentials and existing Google Business Profile URL before adding LocalBusiness details.
- Keep verified business information consistent across the site and Business Profile. Do not create fictional Boston offices or duplicate doorway pages for nearby cities.
- Request genuine customer reviews without incentives or fabricated reviews. Publish author-reviewed examples and periodic, source-checked Massachusetts guidance.
- Earn relevant links from legitimate Brazilian community/business organizations; do not buy ranking links.
- Establish a baseline after production launch before claiming traffic growth. Rankings, indexing and AI citations are not guaranteed.

## Checkout investigation
- Live /api/catalog returned the tax guide at USD 24.99; business-opening product was unconfigured.
- Live POST /api/checkout reproduced HTTP 502. Runtime log API returned 403 for this project; Stripe connector errored. Root cause of Stripe's session refusal remains unverified.
- Added safe Stripe request reference/code/parameter, validated return URL and resolve the session before mounting the iframe to avoid misleading client-secret timeouts.
- A production log entry `Stripe checkout error` (message/code/param/requestId) is still needed to identify the provider rejection. Never share secret API keys.

## Primary references
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://support.google.com/webmasters/answer/9008080
- https://www.irs.gov/individuals/international-taxpayers/foreign-persons
- https://www.mass.gov/personal-income-tax
- https://www.mass.gov/guides/personal-income-tax-for-part-year-residents

## Checkout cause confirmed by production log
Stripe rejected ui_mode=embedded because the active API version requires embedded_page. Updated the session parameter and its regression test. Revalidate session creation after this preview is promoted; no payment was submitted.
