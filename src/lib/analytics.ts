import { track } from "@vercel/analytics";

export const trackEvent = (
  name: string,
  props?: Record<string, string>
) => {
  track(name, props);
};
