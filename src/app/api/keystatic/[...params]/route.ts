export const runtime = "nodejs";

import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

const keystaticHandler = makeRouteHandler({ config });

async function debugHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Intercept callback to log raw GitHub response
  if (path.includes("github/oauth/callback")) {
    const code = url.searchParams.get("code");
    if (code) {
      const tokenUrl = new URL("https://github.com/login/oauth/access_token");
      tokenUrl.searchParams.set("client_id", process.env.KEYSTATIC_GITHUB_CLIENT_ID!);
      tokenUrl.searchParams.set("client_secret", process.env.KEYSTATIC_GITHUB_CLIENT_SECRET!);
      tokenUrl.searchParams.set("code", code);

      const res = await fetch(tokenUrl, {
        method: "POST",
        headers: { Accept: "application/json" },
      });
      const data = await res.json();

      // If token exchange failed or missing refresh_token, show debug info
      if (data.error || !("refresh_token" in data)) {
        return new Response(
          JSON.stringify({
            debug: true,
            keys: Object.keys(data),
            error: data.error ?? null,
            has_refresh_token: "refresh_token" in data,
            has_expires_in: "expires_in" in data,
            token_type: data.token_type ?? null,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }
    }
  }

  // Normal Keystatic handling
  const { GET, POST } = keystaticHandler;
  if (request.method === "POST") return POST(request);
  return GET(request);
}

export const GET = debugHandler;
export const POST = (req: Request) => keystaticHandler.POST(req);
