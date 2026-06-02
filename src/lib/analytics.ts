import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import { getVisitorId } from "./visitor";

export const trackEvent = (
  name: string,
  props?: Record<string, string>
) => {
  // 1) Vercel Analytics
  track(name, props);

  // 2) Google Analytics 4 (chỉ gửi khi đã cấu hình NEXT_PUBLIC_GA_ID)
  if (process.env.NEXT_PUBLIC_GA_ID) {
    sendGAEvent("event", name, props ?? {});
  }

  // 3) DB riêng — nối hành trình với visitor_id (gửi nền, không chặn UI)
  if (typeof window !== "undefined") {
    try {
      const payload = JSON.stringify({
        visitorId: getVisitorId(),
        name,
        props: props ?? {},
        path: window.location.pathname,
        referrer: document.referrer || undefined,
      });

      // sendBeacon: bắn-rồi-quên, sống sót cả khi khách rời trang, không làm chậm web
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/track",
          new Blob([payload], { type: "application/json" })
        );
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Không bao giờ để tracking phá UX
    }
  }
};

// Ghi pageview CHỈ vào DB (GA4 đã tự đếm page_view, không gửi để tránh trùng).
export const trackPageView = (path: string) => {
  if (typeof window === "undefined") return;
  try {
    const payload = JSON.stringify({
      visitorId: getVisitorId(),
      name: "pageview",
      props: {},
      path,
      referrer: document.referrer || undefined,
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([payload], { type: "application/json" })
      );
    } else {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // bỏ qua
  }
};
