# Analytics Tracking Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use screenkit:executing-plans to implement this plan task-by-task.

**Goal:** Track all meaningful user interactions (form submissions, phone/Zalo clicks, modal opens, car views) using Vercel Analytics custom events.

**Architecture:** Single `lib/analytics.ts` wrapper re-exports `track()` from `@vercel/analytics` with typed event names. Each component calls it directly on user action — no global listeners, no abstraction layers. Page views are already tracked automatically.

**Tech Stack:** `@vercel/analytics` (already installed), React, Next.js 16 App Router

---

## Event Catalogue

| Event | Where | Extra data |
|---|---|---|
| `quote_form_submit` | QuoteForm.tsx | `car`, `page` |
| `quote_modal_open` | ModalContext.tsx | `car`, `source` |
| `phone_click` | Header, floating buttons, QuoteForm | `location` |
| `zalo_click` | floating button in (site)/layout.tsx | `page` |
| `hero_quote_click` | HeroSlider.tsx | `car`, `slide_index` |
| `car_detail_view` | [slug]/page.tsx (client wrapper) | `car` |

---

## Task 1: Analytics Wrapper

**Files:**
- Create: `src/lib/analytics.ts`

**Step 1: Create the file**

```ts
import { track } from "@vercel/analytics";

export const trackEvent = (
  name: string,
  props?: Record<string, string>
) => {
  track(name, props);
};
```

**Step 2: Verify TypeScript is happy**

```bash
cd web && npx tsc --noEmit 2>&1 | grep analytics
```

Expected: no errors mentioning `analytics.ts`

**Step 3: Commit**

```bash
git add src/lib/analytics.ts
git commit -m "feat(analytics): add trackEvent wrapper"
```

---

## Task 2: Track Quote Form Submissions

**Files:**
- Modify: `src/components/QuoteForm.tsx:22-27`

`QuoteForm` receives a `page` prop (optional string, defaults to `"unknown"`) so callers can name where the form lives. Then in `handleSubmit`, call `trackEvent` after resetting the form.

**Step 1: Add import + prop**

At top of file after existing imports add:
```ts
import { trackEvent } from "@/lib/analytics";
```

Change the interface:
```ts
interface QuoteFormProps {
  cars: Car[];
  defaultCar?: string;
  compact?: boolean;
  page?: string;          // ← add this
  onSuccess?: () => void;
}
```

Update destructure:
```ts
export default function QuoteForm({ cars, defaultCar = "", compact = false, page = "unknown", onSuccess }: QuoteFormProps) {
```

**Step 2: Add tracking in handleSubmit**

Replace the existing `handleSubmit`:
```ts
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  trackEvent("quote_form_submit", { car: form.car || "none", page });
  setToast(true);
  setForm({ name: "", phone: "", car: defaultCar, note: "" });
  if (onSuccess) {
    setTimeout(onSuccess, 500);
  }
};
```

**Step 3: Pass `page` prop from callers**

- `src/app/(site)/page.tsx` — find `<QuoteForm` → add `page="homepage"`
- `src/app/(site)/dang-ky-lai-thu-xe-kia/page.tsx` → add `page="test_drive"`
- `src/app/(site)/thu-tuc-tra-gop-xe-kia/page.tsx` → add `page="financing"`
- `src/app/(site)/lien-he-kia-ho-chi-minh/page.tsx` → add `page="contact"`
- `src/app/(site)/[slug]/page.tsx` — the QuoteForm on car detail page → add `page="car_detail"`

**Step 4: Also track the "Gọi" phone link inside QuoteForm**

In `QuoteForm.tsx`, the `<a href="tel:...">` link — add onClick:
```tsx
<a
  href="tel:0931456204"
  onClick={() => trackEvent("phone_click", { location: "quote_form" })}
  className="..."
>
```

**Step 5: Verify no TypeScript errors**

```bash
cd web && npx tsc --noEmit 2>&1 | grep -E "QuoteForm|analytics"
```

Expected: no output

**Step 6: Commit**

```bash
git add src/components/QuoteForm.tsx src/app/\(site\)/page.tsx src/app/\(site\)/dang-ky-lai-thu-xe-kia/page.tsx src/app/\(site\)/thu-tuc-tra-gop-xe-kia/page.tsx src/app/\(site\)/lien-he-kia-ho-chi-minh/page.tsx "src/app/(site)/[slug]/page.tsx"
git commit -m "feat(analytics): track quote form submissions and phone clicks"
```

---

## Task 3: Track Modal Opens

**Files:**
- Modify: `src/context/ModalContext.tsx`

The `openModal` function is the single entry point for every "Báo giá" button on the site. Track here to avoid adding onClick to every button.

**Step 1: Add import**

```ts
import { trackEvent } from "@/lib/analytics";
```

**Step 2: Update openModal**

The function receives an optional `carSlug`. We want to also know what triggered the open. Add an optional second param `source`:

```ts
const openModal = (carSlug?: string, source?: string) => {
  trackEvent("quote_modal_open", {
    car: carSlug ?? "none",
    source: source ?? "unknown",
  });
  setDefaultCar(carSlug);
  setIsOpen(true);
};
```

Update the interface:
```ts
interface ModalContextType {
  isOpen: boolean;
  defaultCar?: string;
  openModal: (carSlug?: string, source?: string) => void;
  closeModal: () => void;
}
```

**Step 3: Update callers to pass source**

Search for all `openModal(` calls:
```bash
grep -rn "openModal(" web/src --include="*.tsx"
```

Update each call:
- `Header.tsx` button → `openModal(undefined, "header")`
- `HeroSlider.tsx` "Báo giá" button → `openModal(slide.car.slug, "hero_slider")`
- `QuoteButton.tsx` → `openModal(carSlug, "quote_button")`
- Any car card on homepage → `openModal(car.slug, "car_card")`

**Step 4: Verify**

```bash
cd web && npx tsc --noEmit 2>&1 | grep -E "ModalContext|openModal"
```

Expected: no errors

**Step 5: Commit**

```bash
git add src/context/ModalContext.tsx src/components/Header.tsx src/components/HeroSlider.tsx src/components/QuoteButton.tsx
git commit -m "feat(analytics): track quote modal opens with source"
```

---

## Task 4: Track Phone & Zalo Clicks in Header and Floating Buttons

**Files:**
- Modify: `src/components/Header.tsx`
- Modify: `src/app/(site)/layout.tsx`

**Step 1: Header phone link**

In `Header.tsx`, find the `<a href="tel:0931456204"` in the top bar. Add:
```tsx
import { trackEvent } from "@/lib/analytics";

// on the <a> element:
onClick={() => trackEvent("phone_click", { location: "header" })}
```

**Step 2: Mobile menu phone button (if exists)**

Search for other `tel:` links in Header.tsx and add onClick to each with appropriate `location` value.

**Step 3: Floating Zalo button**

In `src/app/(site)/layout.tsx`, find the Zalo `<a href="https://zalo.me/...">` in the floating button group. Add:
```tsx
onClick={() => trackEvent("zalo_click", { location: "floating" })}
```

**Step 4: Floating phone button**

Find the `<a href="tel:...">` in the same floating group. Add:
```tsx
onClick={() => trackEvent("phone_click", { location: "floating" })}
```

Note: `layout.tsx` is a server component. The floating buttons need to either be extracted to a small `"use client"` component or use a simple inline script approach. Easiest fix: extract the two floating buttons to `src/components/FloatingContact.tsx` with `"use client"` at top.

**FloatingContact.tsx structure:**
```tsx
"use client";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  hotline: string;
}

export default function FloatingContact({ hotline }: Props) {
  const number = hotline.replace(/\./g, "");
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
      <a
        href={`https://zalo.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        onClick={() => trackEvent("zalo_click", { location: "floating" })}
        className="flex items-center gap-2 bg-[#0068FF] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#0057d4] active:scale-95 transition-all font-semibold text-sm"
      >
        <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
          <path d="M25 4C13.4 4 4 13.4 4 25c0 5.8 2.3 11.1 6.1 15l-2.8 8.4 8.7-2.8c3.2 1.5 6.7 2.4 10 2.4 11.6 0 21-9.4 21-21S36.6 4 25 4zm-8 27v-2.2l10-11H17v-2.8h16v2.2L23 28.2h10V31H17z"/>
        </svg>
        <span className="hidden sm:block">Chat Zalo</span>
      </a>
      <a
        href={`tel:${number}`}
        aria-label={`Gọi ${hotline}`}
        onClick={() => trackEvent("phone_click", { location: "floating" })}
        className="flex items-center gap-2 bg-[#BB162B] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#9a1022] active:scale-95 transition-all font-semibold text-sm"
      >
        <Phone size={18} aria-hidden="true" />
        <span className="hidden sm:block">{hotline}</span>
      </a>
    </div>
  );
}
```

Then in `(site)/layout.tsx` replace the floating div block with:
```tsx
import FloatingContact from "@/components/FloatingContact";
// ...
<FloatingContact hotline={contact.hotline} />
```

**Step 5: Verify**

```bash
cd web && npx tsc --noEmit 2>&1 | grep -E "FloatingContact|layout"
```

**Step 6: Commit**

```bash
git add src/components/FloatingContact.tsx src/components/Header.tsx "src/app/(site)/layout.tsx"
git commit -m "feat(analytics): track phone and zalo clicks"
```

---

## Task 5: Track Hero Slider CTA Clicks

**Files:**
- Modify: `src/components/HeroSlider.tsx`

The "Báo giá" button in the hero slider calls `openModal`. After Task 3, it already passes `source="hero_slider"`. But we also want `slide_index`.

**Step 1: Update the "Báo giá" button in HeroSlider**

Find the button that calls `openModal(slide.car.slug, ...)` and ensure it passes `current` as slide index. Since `openModal` already tracks `quote_modal_open`, we only need to make sure the data is correct — no additional call needed if Task 3 is done correctly.

If you want a separate `hero_quote_click` event (before the modal opens), add:
```tsx
onClick={() => {
  trackEvent("hero_quote_click", {
    car: slide.car.slug,
    slide_index: String(current),
  });
  openModal(slide.car.slug, "hero_slider");
}}
```

**Step 2: Add import at top of HeroSlider.tsx**

```ts
import { trackEvent } from "@/lib/analytics";
```

**Step 3: Commit**

```bash
git add src/components/HeroSlider.tsx
git commit -m "feat(analytics): track hero slider quote CTA clicks"
```

---

## Task 6: Track Car Detail Page Views

**Files:**
- Create: `src/components/CarDetailTracker.tsx`
- Modify: `src/app/(site)/[slug]/page.tsx`

`[slug]/page.tsx` is a **server component** so we can't call `trackEvent` directly. We need a tiny client component that fires on mount.

**Step 1: Create CarDetailTracker.tsx**

```tsx
"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CarDetailTracker({ car }: { car: string }) {
  useEffect(() => {
    trackEvent("car_detail_view", { car });
  }, [car]);

  return null;
}
```

**Step 2: Add to [slug]/page.tsx**

At top of file add:
```ts
import CarDetailTracker from "@/components/CarDetailTracker";
```

Inside the returned JSX, anywhere near the top of the component (e.g. right after the breadcrumb div):
```tsx
<CarDetailTracker car={slug} />
```

**Step 3: Verify**

```bash
cd web && npx tsc --noEmit 2>&1 | grep -E "CarDetail|slug"
```

Expected: no errors

**Step 4: Commit**

```bash
git add src/components/CarDetailTracker.tsx "src/app/(site)/[slug]/page.tsx"
git commit -m "feat(analytics): track car detail page views"
```

---

## Task 7: Verify All Events in Vercel Dashboard

**Step 1: Deploy to Vercel**

```bash
git push origin main
```

Wait for Vercel deployment to complete (~2 min).

**Step 2: Test each event manually**

Open the live site and perform:
1. Open site → check Vercel Analytics shows page view
2. Click "Báo giá ngay" in header → check `quote_modal_open` with `source: header`
3. Submit a quote form → check `quote_form_submit`
4. Click phone number → check `phone_click`
5. Click Zalo button → check `zalo_click`
6. Visit a car page (e.g. `/new-kia-carnival`) → check `car_detail_view`
7. Click "Báo giá" on hero slider → check `hero_quote_click`

**Step 3: View in dashboard**

Vercel Dashboard → Project → Analytics → Custom Events tab

---

## Summary of Files Changed

| File | Change |
|---|---|
| `src/lib/analytics.ts` | New — wrapper |
| `src/components/QuoteForm.tsx` | Track submit + phone click |
| `src/components/FloatingContact.tsx` | New — extracted from layout with tracking |
| `src/components/CarDetailTracker.tsx` | New — client-side view tracker |
| `src/context/ModalContext.tsx` | Track modal opens with source |
| `src/components/Header.tsx` | Track phone click |
| `src/components/HeroSlider.tsx` | Track hero CTA click |
| `src/app/(site)/layout.tsx` | Use FloatingContact component |
| `src/app/(site)/page.tsx` | Pass `page` prop to QuoteForm |
| `src/app/(site)/[slug]/page.tsx` | Add CarDetailTracker |
| `src/app/(site)/dang-ky-lai-thu-xe-kia/page.tsx` | Pass `page` prop |
| `src/app/(site)/thu-tuc-tra-gop-xe-kia/page.tsx` | Pass `page` prop |
| `src/app/(site)/lien-he-kia-ho-chi-minh/page.tsx` | Pass `page` prop |
