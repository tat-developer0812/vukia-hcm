import { NextRequest, NextResponse } from "next/server";
import { insertEvent } from "@/lib/db";

export const runtime = "nodejs";

interface TrackBody {
  visitorId?: string;
  name?: string;
  props?: Record<string, string>;
  path?: string;
  referrer?: string;
}

export async function POST(req: NextRequest) {
  // sendBeacon gửi dưới dạng text/plain hoặc blob → đọc text rồi parse cho chắc
  let body: TrackBody;
  try {
    const text = await req.text();
    body = text ? JSON.parse(text) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const visitorId = body.visitorId?.trim();
  const name = body.name?.trim();

  // Bỏ qua nếu thiếu dữ liệu thiết yếu — không coi là lỗi nghiêm trọng
  if (!visitorId || !name) {
    return NextResponse.json({ ok: false }, { status: 204 });
  }

  try {
    await insertEvent({
      visitorId: visitorId.slice(0, 40),
      name: name.slice(0, 60),
      props: body.props ?? null,
      path: body.path?.slice(0, 255) ?? null,
      referrer: body.referrer?.slice(0, 255) ?? null,
    });
  } catch (err) {
    // Ghi log lỗi nhưng không phá trải nghiệm — tracking không bao giờ làm hỏng UX
    console.error("Track API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
