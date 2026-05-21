# Technical SEO Audit — kiagovaphcm.com

- **Date**: 2026-05-19
- **Auditor**: technical-seo-checker (Tier 1, manual-data mode — no MCP web crawler / PageSpeed connected)
- **Scope**: codebase static audit of `web/` (Next.js 16 + Sanity)

## Scorecard

| Area | Before | After | Health | Notes |
|---|---|---|---|---|
| Crawlability | 78 | 92 | Healthy | robots.txt now disallows `/studio` `/api` + explicit AI-bot rules |
| Indexability | 45 | 90 | Healthy | P0 canonical bug fixed — every model page now self-canonicalizes |
| Speed & CWV | 50 | ~75 | Pending live measurement | Next/Image re-enabled site-wide |
| Mobile | 85 | 85 | Healthy | Code-side fine; still wants live render verification |
| Security / HTTPS | 88 | 92 | Healthy | Dropped `unsafe-eval` from public CSP |
| URL structure | 82 | 82 | Healthy | `new-` slug prefix flagged for next-gen launch |
| Structured data | 70 | 88 | Healthy | Duplicate FAQPage removed; BreadcrumbList added |
| International | N/A | N/A | — | Single locale (vi-VN) |
| **Overall** | **71 / Caution** | **~88 / Healthy** | — | Live CWV will set the final number |

## Findings & fixes shipped

### P0 (blocking)
- **I1 — Parent layout sets global canonical → car model pages self-deindex.**
  - File: `web/src/app/(site)/layout.tsx`
  - Affected pages: `[slug]/page.tsx` (all car models), `dang-ky-lai-thu-xe-kia`, `thu-tuc-tra-gop-xe-kia`, `lien-he-kia-ho-chi-minh`.
  - Fix: removed `alternates.canonical` from layout; added per-page canonicals.

### P1 (high impact)
- **S1 — `images.unoptimized: true` disabled Next/Image site-wide.**
  - File: `web/next.config.ts`
  - Fix: removed the flag. Removed `unoptimized` from 4 `<Image>` elements and added `sizes` props for responsive optimization (HeroSlider, homepage car grid, [slug] hero, [slug] sidebar thumb).
- **D1 — Duplicate FAQPage schema on FAQ pages.**
  - File: `web/src/app/(site)/layout.tsx` → `(site)/page.tsx`
  - Fix: moved dealership FAQPage JSON-LD from layout (site-wide) to homepage only. Pages with their own FAQ (`bao-duong-xe-kia-go-vap`, `kia-carnival-2026-lai-thu-go-vap`) now own their snippet eligibility.
- **C1 — `sitemap.ts` used `new Date()` for every entry → freshness signal destroyed.**
  - Files: `web/src/lib/data.ts`, `web/src/app/sitemap.ts`
  - Fix: added `_updatedAt` to Sanity GROQ + `Car` interface; car sitemap entries use real `updatedAt`. Static pages use hardcoded date constants reflecting last edit.

### P2 (important)
- **C2 — `robots.ts` allowed `/studio` (Sanity admin).**
  - File: `web/src/app/robots.ts`
  - Fix: `disallow: ["/studio", "/api"]` on default UA.
- **C3 — No directives for LLM crawlers.** User chose **default-open** stance.
  - Fix: added explicit allow rules for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-Web, anthropic-ai, Google-Extended, PerplexityBot, Perplexity-User, CCBot, Applebot-Extended, Bytespider.
- **D3 — No BreadcrumbList schema** on pages with visual breadcrumbs.
  - Files: `[slug]/page.tsx`, `kia-carnival-2026-lai-thu-go-vap/page.tsx`
  - Fix: inline `BreadcrumbList` JSON-LD added on both.
- **S2 — Public CSP allowed `unsafe-eval`.**
  - File: `web/vercel.json`
  - Fix: dropped `unsafe-eval` from `script-src` on `/((?!studio).*)` rule. Sanity Studio CSP unchanged.

### Outstanding
- **D2 — Carnival Article schema is missing `image`.** Needs a Carnival-specific 1200×630 hero URL (host on `cdn.sanity.io`). Will also fix the wrong OG image inherited from layout.
- **U1 — Model slugs use `new-` prefix** (e.g., `new-kia-carnival`). Will read stale once next-gen launches. Plan a renaming + 301 pass before next-gen.

## New page added in this session

- `web/src/app/(site)/kia-carnival-2026-lai-thu-go-vap/page.tsx`
  - Vietnamese blog article, ~520 words, targets primary KW `Kia Carnival`.
  - Metadata + canonical + OG (article type).
  - JSON-LD: Article + BreadcrumbList + FAQPage.
  - Sidebar uses `<QuoteForm>` with `page="article_carnival"` and `defaultCar` resolved at runtime from `getCars()` (falls back to `new-kia-carnival`).
  - Sitemap entry added with priority 0.7.

## Files touched (full list)

- `web/src/app/robots.ts`
- `web/src/app/sitemap.ts`
- `web/src/app/(site)/layout.tsx`
- `web/src/app/(site)/page.tsx`
- `web/src/app/(site)/[slug]/page.tsx`
- `web/src/app/(site)/dang-ky-lai-thu-xe-kia/page.tsx`
- `web/src/app/(site)/thu-tuc-tra-gop-xe-kia/page.tsx`
- `web/src/app/(site)/lien-he-kia-ho-chi-minh/page.tsx`
- `web/src/app/(site)/kia-carnival-2026-lai-thu-go-vap/page.tsx` *(new)*
- `web/src/components/HeroSlider.tsx`
- `web/src/lib/data.ts`
- `web/next.config.ts`
- `web/vercel.json`

All `tsc --noEmit` and `eslint` checks pass on these files.

## Post-deploy validation checklist

1. **Canonical fix**: `curl -s https://www.kiagovaphcm.com/new-kia-carnival | grep canonical` → matches the page URL, not the homepage. Repeat for the three static pages.
2. **robots.txt**: `curl https://www.kiagovaphcm.com/robots.txt` → expect `Disallow: /studio`, `Disallow: /api`, plus explicit allow blocks for the 12 AI UAs.
3. **Sitemap freshness**: `curl https://www.kiagovaphcm.com/sitemap.xml` → `<lastmod>` should reflect real content-update timestamps, not the request time.
4. **Image optimization**: load `/` and `/new-kia-carnival`; view-source on hero `<img>` → `src` starts with `/_next/image?url=…`; network panel content-type is `image/avif` or `image/webp`.
5. **Rich Results Test** on `/`, `/new-kia-carnival`, `/kia-carnival-2026-lai-thu-go-vap` — no duplicate-FAQ warnings, BreadcrumbList valid, Article valid (will still flag missing `image` on Carnival article until D2 lands).
6. **CSP**: devtools console on a public page; no CSP violations.
7. After 1–2 weeks: GSC Coverage report should show car model URLs moving from `Excluded: Duplicate, Google chose different canonical` → `Submitted and indexed`.

## Open loops

- Need Carnival-specific OG / Article hero image (1200×630, on `cdn.sanity.io`).
- Need live Lighthouse run on `/` + `/new-kia-carnival` to confirm S1 actually moved CWV.
- Plan `new-kia-*` slug migration before next-gen models launch.
- Watch GSC for indexation deltas after I1 deploys.

## Next skill

`on-page-seo-auditor` — now safe to run, since pages will be indexed under their own URLs after I1 ships.
