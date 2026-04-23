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
      await touchLead(existing.id);
      return NextResponse.json({ status: "existing" }, { status: 200 });
    }

    const lead = await insertLead({
      name: name.trim(),
      phone: cleanPhone,
      email: cleanEmail,
      car: car?.trim() || undefined,
      note: note?.trim() || undefined,
      page,
    });

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
