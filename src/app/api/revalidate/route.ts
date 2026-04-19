import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.kiagovaphcm.com";

async function prewarm(paths: string[]) {
  await Promise.all(
    paths.map((p) =>
      fetch(`${SITE_URL}${p}`, { cache: "no-store" }).catch(() => {})
    )
  );
}

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
  const pathsToPrewarm: string[] = [];

  if (type === "car") {
    revalidateTag("cars", { expire: 0 });
    revalidatePath("/");
    pathsToPrewarm.push("/");
    if (body.slug?.current) {
      revalidatePath(`/${body.slug.current}`);
      pathsToPrewarm.push(`/${body.slug.current}`);
    }
  } else if (type === "promotions") {
    revalidateTag("promotions", { expire: 0 });
    revalidatePath("/");
    pathsToPrewarm.push("/");
  } else if (type === "contact") {
    revalidateTag("contact", { expire: 0 });
    revalidatePath("/", "layout");
    pathsToPrewarm.push("/", "/lien-he-kia-ho-chi-minh");
  } else {
    return NextResponse.json({ ignored: true, type });
  }

  await prewarm(pathsToPrewarm);

  return NextResponse.json({ revalidated: true, type, prewarmed: pathsToPrewarm });
}
