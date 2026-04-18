export const runtime = "nodejs";

// GET /api/debug-oauth        → start OAuth flow (redirect to GitHub)
// GET /api/debug-oauth/cb?code=xxx → exchange code and show raw response
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path.endsWith("/cb")) {
    const code = url.searchParams.get("code");
    if (!code) return Response.json({ error: "no code" });

    const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID!;
    const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!;

    const tokenUrl = new URL("https://github.com/login/oauth/access_token");
    tokenUrl.searchParams.set("client_id", clientId);
    tokenUrl.searchParams.set("client_secret", clientSecret);
    tokenUrl.searchParams.set("code", code);

    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    const data = await res.json();
    return Response.json({
      http_status: res.status,
      keys: Object.keys(data),
      has_refresh_token: "refresh_token" in data,
      has_expires_in: "expires_in" in data,
      error: data.error ?? null,
      token_type: data.token_type ?? null,
      scope: data.scope ?? null,
    });
  }

  // Start OAuth — redirect to GitHub with THIS endpoint as callback
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID!;
  const origin = url.origin;
  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", clientId);
  githubUrl.searchParams.set("redirect_uri", `${origin}/api/debug-oauth/cb`);

  return Response.redirect(githubUrl.toString(), 307);
}
