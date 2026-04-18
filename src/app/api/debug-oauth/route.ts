export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json({ error: "no code provided" });
  }

  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

  const url = new URL("https://github.com/login/oauth/access_token");
  url.searchParams.set("client_id", clientId!);
  url.searchParams.set("client_secret", clientSecret!);
  url.searchParams.set("code", code);

  const res = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const data = await res.json();

  return Response.json({
    status: res.status,
    ok: res.ok,
    keys: Object.keys(data),
    has_refresh_token: "refresh_token" in data,
    has_expires_in: "expires_in" in data,
    error: data.error ?? null,
    token_type: data.token_type ?? null,
  });
}
