import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
          "CCBot",
          "Applebot-Extended",
          "Bytespider",
        ],
        allow: "/",
        disallow: ["/studio", "/api"],
      },
    ],
    sitemap: "https://www.kiagovaphcm.com/sitemap.xml",
  };
}
