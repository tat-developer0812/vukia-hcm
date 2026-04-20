"use client";
import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface Props {
  hotline: string;
}

export default function FloatingContact({ hotline }: Props) {
  const number = hotline.replace(/\./g, "");
  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
      <a
        href={`https://zalo.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        onClick={() => trackEvent("zalo_click", { location: "floating" })}
        className="flex items-center gap-2 bg-[#0068FF] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#0057d4] active:scale-95 transition-all font-semibold text-sm"
      >
        <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
          <path d="M25 4C13.4 4 4 13.4 4 25c0 5.8 2.3 11.1 6.1 15l-2.8 8.4 8.7-2.8c3.2 1.5 6.7 2.4 10 2.4 11.6 0 21-9.4 21-21S36.6 4 25 4zm-8 27v-2.2l10-11H17v-2.8h16v2.2L23 28.2h10V31H17z"/>
        </svg>
        <span className="hidden sm:block">Chat Zalo</span>
      </a>
      <a
        href={`tel:${number}`}
        aria-label={`Gọi ${hotline}`}
        onClick={() => trackEvent("phone_click", { location: "floating" })}
        className="flex items-center gap-2 bg-[#BB162B] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#9a1022] active:scale-95 transition-all font-semibold text-sm"
      >
        <Phone size={18} aria-hidden="true" />
        <span className="hidden sm:block">{hotline}</span>
      </a>
    </div>
  );
}
