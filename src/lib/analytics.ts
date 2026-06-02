import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

export const trackEvent = (
  name: string,
  props?: Record<string, string>
) => {
  // Vercel Analytics
  track(name, props);

  // Google Analytics 4 (chỉ gửi khi đã cấu hình NEXT_PUBLIC_GA_ID)
  if (process.env.NEXT_PUBLIC_GA_ID) {
    sendGAEvent("event", name, props ?? {});
  }
};
