export const runtime = "nodejs";

import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";
import { serialize, parse } from "cookie";

const keystaticHandler = makeRouteHandler({ config });

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Custom OAuth callback — works without expiring tokens
  if (path.includes("github/oauth/callback")) {
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (!code) return new Response("Bad Request", { status: 400 });

    const tokenUrl = new URL("https://github.com/login/oauth/access_token");
    tokenUrl.searchParams.set("client_id", process.env.KEYSTATIC_GITHUB_CLIENT_ID!);
    tokenUrl.searchParams.set("client_secret", process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!);
    tokenUrl.searchParams.set("code", code);

    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    const data = await res.json();

    if (data.error || !data.access_token) {
      return new Response(`GitHub OAuth error: ${data.error_description ?? data.error}`, { status: 401 });
    }

    const headers = new Headers();
    headers.append("Set-Cookie", serialize("keystatic-gh-access-token", data.access_token, COOKIE_OPTIONS));
    headers.append("Set-Cookie", serialize("keystatic-gh-refresh-token", data.access_token, COOKIE_OPTIONS));

    if (state === "close") {
      headers.set("Content-Type", "text/html");
      return new Response(
        "<script>localStorage.setItem('ks-refetch-installations', 'true');window.close();</script>",
        { status: 200, headers }
      );
    }

    headers.set("Location", "/keystatic");
    return new Response(null, { status: 307, headers });
  }

  // Override refresh-token — non-expiring tokens don't need refreshing
  if (path.includes("github/refresh-token")) {
    const cookies = parse(request.headers.get("cookie") ?? "");
    const accessToken = cookies["keystatic-gh-access-token"];

    if (!accessToken) return new Response("Unauthorized", { status: 401 });

    // Re-set the same access token to extend session
    const headers = new Headers();
    headers.append("Set-Cookie", serialize("keystatic-gh-access-token", accessToken, COOKIE_OPTIONS));
    headers.append("Set-Cookie", serialize("keystatic-gh-refresh-token", accessToken, COOKIE_OPTIONS));
    headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
  }

  if (request.method === "POST") return keystaticHandler.POST(request);
  return keystaticHandler.GET(request);
}

export const GET = handler;
export const POST = handler;
