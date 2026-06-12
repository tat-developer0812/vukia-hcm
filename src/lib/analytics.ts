import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";
import { getVisitorId } from "./visitor";

// Chỉ bắn analytics khi đã deploy (production). `next dev` ở localhost có
// NODE_ENV='development' => không gửi gì, tránh làm bẩn GA4 + DB thật bằng dữ liệu test.
const TRACKING_ENABLED = process.env.NODE_ENV === "production";

export const trackEvent = (
  name: string,
  props?: Record<string, string>
) => {
  if (!TRACKING_ENABLED) return;

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
  if (!TRACKING_ENABLED) return;
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
