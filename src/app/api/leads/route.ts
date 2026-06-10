import { NextRequest, NextResponse } from "next/server";
import { countRecentLeadsByIp, findTodayLeadByPhoneOrEmail, insertLead, touchLead } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

export const runtime = "nodejs";

// Rate-limit "lưới an toàn": chỉ chặn bot bắn dồn dập, ngưỡng cao để không cản khách thật
// (nhiều người dùng mobile VN dùng chung IP qua CGNAT). Làm bằng code → hủy Pro vẫn hoạt động.
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX_PER_IP = 20;

function getClientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim() || null;
  return req.headers.get("x-real-ip");
}

interface LeadBody {
  name?: string;
  phone?: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
  visitorId?: string;
  hp?: string;
}

export async function POST(req: NextRequest) {
  let body: LeadBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, email, car, note, page, visitorId, hp } = body;

  // Honeypot: nếu trường ẩn có dữ liệu => bot. Trả 200 giả thành công, không lưu, không gửi mail.
  if (hp && hp.trim().length > 0) {
    return NextResponse.json({ status: "ok" }, { status: 200 });
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || phone.trim().length === 0) {
    return NextResponse.json({ error: "phone required" }, { status: 400 });
  }

  const cleanPhone = phone.trim().replace(/\s/g, "");
  const cleanEmail = email?.trim().toLowerCase() || undefined;
  const ip = getClientIp(req);

  try {
    // Lưới an toàn: nếu 1 IP gửi quá nhiều lead trong cửa sổ thời gian => coi là bot.
    // Trả "thành công giả" giống honeypot: không lưu, không gửi mail, không lộ cho bot biết bị chặn.
    if (ip) {
      const recent = await countRecentLeadsByIp(ip, RATE_LIMIT_WINDOW_MINUTES);
      if (recent >= RATE_LIMIT_MAX_PER_IP) {
        return NextResponse.json({ status: "ok" }, { status: 200 });
      }
    }

    const existing = await findTodayLeadByPhoneOrEmail(cleanPhone, cleanEmail);

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
      visitorId: visitorId?.trim()?.slice(0, 40) || undefined,
      ip: ip ?? undefined,
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
