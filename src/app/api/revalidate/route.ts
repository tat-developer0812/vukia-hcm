import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-webhook-secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = body._type;
  if (type === "car") {
    revalidateTag("cars", { expire: 0 });
    revalidatePath("/");
    if (body.slug?.current) revalidatePath(`/${body.slug.current}`);
  } else if (type === "promotions") {
    revalidateTag("promotions", { expire: 0 });
    revalidatePath("/");
  } else if (type === "contact") {
    revalidateTag("contact", { expire: 0 });
    revalidatePath("/", "layout");
  } else {
    return NextResponse.json({ ignored: true, type });
  }

  return NextResponse.json({ revalidated: true, type });
}
