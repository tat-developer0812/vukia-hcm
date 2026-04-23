# Lead Capture & Email Notification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use screenkit:executing-plans to implement this plan task-by-task.

**Goal:** Khi khách hàng submit bất kỳ form nào trên site, lưu lead vào PostgreSQL và gửi email thông báo cho nhân viên — nhưng chỉ gửi email với lead mới (dedup theo phone hoặc email).

**Architecture:** Next.js API route `/api/leads` nhận POST request, kiểm tra trùng trong Neon PostgreSQL, insert lead mới + trigger Resend email, hoặc chỉ cập nhật `updated_at` nếu đã tồn tại. Frontend `QuoteForm` gọi API này thay vì chỉ hiện toast.

**Tech Stack:** Neon PostgreSQL (`@neondatabase/serverless`), Resend (`resend`), Next.js API Route (App Router), TypeScript.

---

## Tổng quan flow

```
[Khách submit form]
      │
      ▼
POST /api/leads
      │
      ├─ Validate (name, phone required)
      │
      ├─ SELECT FROM leads WHERE phone = ? OR email = ?
      │       │
      │       ├─ FOUND → UPDATE updated_at → return { status: "existing" }
      │       │
      │       └─ NOT FOUND → INSERT lead
      │                        → send email via Resend
      │                        → return { status: "new" }
      │
      ▼
QuoteForm hiện Toast "Đã gửi thành công"
```

---

## Task 1: Cài đặt dependencies

**Files:**
- Modify: `package.json`

**Step 1: Cài packages**

```bash
cd web
npm install @neondatabase/serverless resend
```

**Step 2: Verify**

```bash
cat package.json | grep -E "neon|resend"
```
Expected: thấy `"@neondatabase/serverless"` và `"resend"` trong dependencies.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add neon and resend dependencies"
```

---

## Task 2: Tạo Neon database và schema

**Files:**
- Create: `web/src/lib/schema.sql`
- Create: `web/.env.local`

**Step 1: Tạo Neon database**

1. Vào https://neon.tech → Sign up / Login
2. Create new project → đặt tên `kia-hcm`
3. Copy `DATABASE_URL` (connection string dạng `postgresql://user:pass@host/db?sslmode=require`)

**Step 2: Tạo file schema**

Tạo `web/src/lib/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(255)  NOT NULL,
  phone      VARCHAR(20)   NOT NULL,
  email      VARCHAR(255),
  car        VARCHAR(100),
  note       TEXT,
  page       VARCHAR(50),
  created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS leads_phone_idx ON leads (phone);
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads (email) WHERE email IS NOT NULL;
```

**Step 3: Chạy migration trên Neon**

Vào Neon Console → SQL Editor → paste nội dung `schema.sql` → Run.

Hoặc dùng psql:
```bash
psql "$DATABASE_URL" -f src/lib/schema.sql
```

**Step 4: Tạo `.env.local`**

```bash
# web/.env.local
DATABASE_URL=postgresql://...      # từ Neon
RESEND_API_KEY=re_...              # từ Resend (Task 3)
NOTIFY_EMAIL=dev@lastclarity.com   # email nhận thông báo lead mới
NEXT_PUBLIC_SITE_URL=https://www.kiagovaphcm.com
SANITY_REVALIDATE_SECRET=...       # đã có sẵn
```

> **Lưu ý:** `.env.local` không commit. Thêm vào `.gitignore` nếu chưa có.

**Step 5: Commit schema**

```bash
git add src/lib/schema.sql
git commit -m "feat: add leads table schema"
```

---

## Task 3: Setup Resend và lấy API key

**Files:**
- Create: `web/src/lib/email.ts`

**Step 1: Tạo Resend account**

1. Vào https://resend.com → Sign up
2. API Keys → Create API Key → đặt tên `kia-hcm-prod`
3. Copy key → thêm vào `.env.local` dưới `RESEND_API_KEY`
4. Domains → Add domain → thêm domain `kiagovaphcm.com` (cần verify DNS)
   - Hoặc dùng email `onboarding@resend.dev` tạm thời để test (chỉ gửi đến email đã verify)

**Step 2: Tạo `web/src/lib/email.ts`**

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadEmailData {
  name: string;
  phone: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) throw new Error("NOTIFY_EMAIL not set");

  const carLabel = lead.car || "Chưa chọn";
  const pageLabel: Record<string, string> = {
    homepage: "Trang chủ",
    contact: "Liên hệ",
    test_drive: "Đăng ký lái thử",
    financing: "Trả góp",
    car_detail: "Chi tiết xe",
  };

  await resend.emails.send({
    from: "KIA HCM <noreply@kiagovaphcm.com>",
    to,
    subject: `[Lead mới] ${lead.name} – ${carLabel}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#BB162B;padding:20px;text-align:center">
          <h1 style="color:white;margin:0;font-size:20px">Khách hàng mới – KIA Gò Vấp</h1>
        </div>
        <div style="padding:24px;border:1px solid #eee">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:120px">Họ tên</td><td style="padding:8px 0;font-weight:bold">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Điện thoại</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            ${lead.email ? `<tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${lead.email}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666">Quan tâm</td><td style="padding:8px 0">${carLabel}</td></tr>
            ${lead.note ? `<tr><td style="padding:8px 0;color:#666">Ghi chú</td><td style="padding:8px 0">${lead.note}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666">Nguồn</td><td style="padding:8px 0">${pageLabel[lead.page ?? ""] ?? lead.page ?? "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Thời gian</td><td style="padding:8px 0">${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</td></tr>
          </table>
          <div style="margin-top:20px;text-align:center">
            <a href="tel:${lead.phone}" style="display:inline-block;background:#BB162B;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold">
              Gọi ngay ${lead.phone}
            </a>
          </div>
        </div>
        <p style="color:#999;font-size:12px;text-align:center;padding:16px">KIA Gò Vấp HCM • 0931.456.204</p>
      </div>
    `,
  });
}
```

**Step 3: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add Resend email notification helper"
```

---

## Task 4: Tạo database client

**Files:**
- Create: `web/src/lib/db.ts`

**Step 1: Tạo `web/src/lib/db.ts`**

```typescript
import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  return neon(url);
}

export interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  car: string | null;
  note: string | null;
  page: string | null;
  created_at: string;
  updated_at: string;
}

export async function findLeadByPhoneOrEmail(
  phone: string,
  email?: string
): Promise<Lead | null> {
  const sql = getDb();
  const conditions = email
    ? `phone = ${JSON.stringify(phone)} OR (email IS NOT NULL AND email = ${JSON.stringify(email)})`
    : `phone = ${JSON.stringify(phone)}`;

  // Use parameterized queries
  if (email) {
    const rows = await sql`
      SELECT * FROM leads WHERE phone = ${phone} OR (email IS NOT NULL AND email = ${email})
      LIMIT 1
    `;
    return (rows[0] as Lead) ?? null;
  } else {
    const rows = await sql`
      SELECT * FROM leads WHERE phone = ${phone}
      LIMIT 1
    `;
    return (rows[0] as Lead) ?? null;
  }
}

export async function insertLead(data: {
  name: string;
  phone: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
}): Promise<Lead> {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO leads (name, phone, email, car, note, page)
    VALUES (${data.name}, ${data.phone}, ${data.email ?? null}, ${data.car ?? null}, ${data.note ?? null}, ${data.page ?? null})
    RETURNING *
  `;
  return rows[0] as Lead;
}

export async function touchLead(id: number): Promise<void> {
  const sql = getDb();
  await sql`UPDATE leads SET updated_at = NOW() WHERE id = ${id}`;
}
```

**Step 2: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: add Neon database client with lead CRUD"
```

---

## Task 5: Tạo API route `/api/leads`

**Files:**
- Create: `web/src/app/api/leads/route.ts`

**Step 1: Tạo `web/src/app/api/leads/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { findLeadByPhoneOrEmail, insertLead, touchLead } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

interface LeadBody {
  name?: string;
  phone?: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, email, car, note, page } = body;

  // Validate
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  }

  const cleanPhone = phone.trim().replace(/\s/g, "");
  const cleanEmail = email?.trim().toLowerCase() || undefined;

  try {
    const existing = await findLeadByPhoneOrEmail(cleanPhone, cleanEmail);

    if (existing) {
      // Duplicate: chỉ update timestamp, không gửi email
      await touchLead(existing.id);
      return NextResponse.json({ status: "existing" }, { status: 200 });
    }

    // Lead mới: insert + send email (fire-and-forget email để không block response)
    const lead = await insertLead({
      name: name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      car: car?.trim() || undefined,
      note: note?.trim() || undefined,
      page,
    });

    // Gửi email async — không throw nếu email fail
    sendLeadNotification({
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? undefined,
      car: lead.car ?? undefined,
      note: lead.note ?? undefined,
      page: lead.page ?? undefined,
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({ status: "new" }, { status: 201 });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

**Step 2: Test thủ công bằng curl (sau khi dev server chạy)**

```bash
# Test lead mới
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"0901234567","car":"kia-seltos","page":"test"}'

# Expected: {"status":"new"} với status 201

# Test duplicate (gọi lại)
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"0901234567","page":"test"}'

# Expected: {"status":"existing"} với status 200

# Test thiếu phone
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'

# Expected: {"error":"phone required"} với status 400
```

**Step 3: Verify trong Neon console**

Vào Neon Console → SQL Editor:
```sql
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;
```

**Step 4: Commit**

```bash
git add src/app/api/leads/route.ts
git commit -m "feat: add /api/leads route with deduplication and email trigger"
```

---

## Task 6: Cập nhật QuoteForm để gọi API

**Files:**
- Modify: `web/src/components/QuoteForm.tsx`

**Step 1: Thêm email field và gọi API**

Thay toàn bộ nội dung `QuoteForm.tsx`:

```typescript
"use client";
import { useState } from "react";
import { Send, Phone } from "lucide-react";
import type { Car } from "@/lib/data";
import Toast from "./Toast";
import { trackEvent } from "@/lib/analytics";

interface QuoteFormProps {
  cars: Car[];
  defaultCar?: string;
  compact?: boolean;
  page?: string;
  onSuccess?: () => void;
}

export default function QuoteForm({
  cars,
  defaultCar = "",
  compact = false,
  page = "unknown",
  onSuccess,
}: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    car: defaultCar,
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, page }),
      });
    } catch {
      // Silent fail — vẫn hiện toast để UX không bị broken
    }

    trackEvent("quote_form_submit", { car: form.car || "none", page });
    setToast(true);
    setForm({ name: "", phone: "", email: "", car: defaultCar, note: "" });
    setLoading(false);

    if (onSuccess) {
      setTimeout(onSuccess, 500);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message="Đã gửi thành công! Tư vấn viên Vũ sẽ liên hệ bạn sớm nhất."
          onClose={() => setToast(false)}
        />
      )}
      <div className={compact ? "" : "bg-white rounded-2xl shadow-xl p-6 border border-gray-100"}>
        {!compact && (
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[#05141F]">Nhận báo giá ưu đãi</h3>
            <div className="w-10 h-0.5 bg-[#BB162B] mt-2" />
            <p className="text-sm text-gray-500 mt-2">
              Để lại thông tin, tư vấn viên sẽ liên hệ ngay!
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="quote-name" className="sr-only">Họ và tên</label>
            <input
              id="quote-name"
              type="text"
              placeholder="Họ và tên *"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-phone" className="sr-only">Số điện thoại</label>
            <input
              id="quote-phone"
              type="tel"
              placeholder="Số điện thoại *"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-email" className="sr-only">Email</label>
            <input
              id="quote-email"
              type="email"
              placeholder="Email (tùy chọn)"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition"
            />
          </div>
          <div>
            <label htmlFor="quote-car" className="sr-only">Dòng xe</label>
            <select
              id="quote-car"
              value={form.car}
              onChange={(e) => setForm({ ...form, car: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition bg-white"
            >
              <option value="">-- Chọn dòng xe --</option>
              {cars.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {!compact && (
            <div>
              <label htmlFor="quote-note" className="sr-only">Ghi chú</label>
              <textarea
                id="quote-note"
                placeholder="Ghi chú thêm (tùy chọn)"
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#BB162B] focus:ring-2 focus:ring-red-100 transition resize-none"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#BB162B] hover:bg-[#9a1022] disabled:opacity-60 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Send size={16} />
            {loading ? "Đang gửi..." : "Nhận báo giá"}
          </button>
          <a
            href="tel:0931456204"
            onClick={() => trackEvent("phone_click", { location: "quote_form" })}
            className="w-full border border-[#05141F] text-[#05141F] hover:bg-[#05141F] hover:text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
          >
            <Phone size={16} />
            Gọi: 0931.456.204
          </a>
        </form>
      </div>
    </>
  );
}
```

**Step 2: Kiểm tra TypeScript**

```bash
cd web && npx tsc --noEmit
```
Expected: no errors.

**Step 3: Test end-to-end thủ công**

1. `npm run dev`
2. Mở http://localhost:3000
3. Điền form → Submit
4. Kiểm tra Neon console: `SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;`
5. Kiểm tra email nhận được trong hộp thư `NOTIFY_EMAIL`
6. Submit lại cùng SĐT → `updated_at` cập nhật, không nhận email mới

**Step 4: Commit**

```bash
git add src/components/QuoteForm.tsx
git commit -m "feat: connect QuoteForm to /api/leads with email field and loading state"
```

---

## Task 7: Deploy và config môi trường Vercel

**Step 1: Thêm env vars trên Vercel**

Vào Vercel Dashboard → Project → Settings → Environment Variables, thêm:

| Key | Value | Environment |
|-----|-------|-------------|
| `DATABASE_URL` | postgresql://... | Production, Preview |
| `RESEND_API_KEY` | re_... | Production, Preview |
| `NOTIFY_EMAIL` | email nhận lead | Production |
| `NEXT_PUBLIC_SITE_URL` | https://www.kiagovaphcm.com | Production |

**Step 2: Redeploy**

```bash
git push origin main
```

Vercel tự động deploy. Kiểm tra Vercel Function Logs nếu có lỗi.

**Step 3: Smoke test production**

1. Mở https://www.kiagovaphcm.com
2. Submit form test với SĐT thật
3. Confirm nhận email thông báo
4. Submit lại → không nhận email lần 2

---

## Checklist hoàn thành

- [ ] `@neondatabase/serverless` và `resend` trong `package.json`
- [ ] Neon DB đã có table `leads` với index trên `phone` và `email`
- [ ] `.env.local` có đủ 3 biến: `DATABASE_URL`, `RESEND_API_KEY`, `NOTIFY_EMAIL`
- [ ] `/api/leads` POST hoạt động, trả về `{status: "new"}` hoặc `{status: "existing"}`
- [ ] `QuoteForm` có field email, gọi API khi submit, có loading state
- [ ] Email thông báo đến nhân viên khi có lead mới
- [ ] Duplicate phone/email → chỉ update `updated_at`, không gửi email
- [ ] Deploy thành công trên Vercel

---

## Side note: Hardcoded Maps URL còn sót

Trong `web/src/app/(site)/page.tsx` dòng 177 còn link Maps cũ chưa update:

```tsx
href="https://maps.google.com/?q=189+Nguyễn+Oanh+Phường+10+Quận+Gò+Vấp+TP+HCM"
```

Cần đổi thành `https://maps.app.goo.gl/UUAFA73y673nzSfb8`.
