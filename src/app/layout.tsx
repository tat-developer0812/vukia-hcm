import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ModalProvider } from "@/context/ModalContext";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "KIA Hồ Chí Minh – Đại Lý KIA Chính Hãng | 0931.456.204",
  description:
    "Đại lý KIA chính hãng tại TP.HCM. Mua xe KIA Seltos, Sonet, Carens, K3, K5, Sportage, Carnival, Sorento, Morning 2025 với giá tốt nhất. Hotline: 0931.456.204",
  keywords: "KIA HCM, đại lý KIA, mua xe KIA, KIA Seltos, KIA Sonet, KIA Carens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ModalProvider>
          <Header />
          {/* header = top bar ~26px + nav 64px = 90px */}
          <main className="pt-[90px]">{children}</main>
          <Footer />

          {/* Floating buttons */}
          <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
            <a href="https://zalo.me/0931456204" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0068FF] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#0057d4] active:scale-95 transition-all font-semibold text-sm"
              aria-label="Zalo">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm6.5 19.5h-2.1l-4.9-6.3v6.3H13V10.5h2.1l4.9 6.3v-6.3H22.5v11z"/>
              </svg>
              <span className="hidden sm:block">Zalo</span>
            </a>
            <a href="tel:0931456204"
              className="flex items-center gap-2 bg-[#BB162B] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#9a1022] active:scale-95 transition-all font-semibold text-sm"
              aria-label="Gọi ngay">
              <Phone size={18} />
              <span className="hidden sm:block">Gọi ngay</span>
            </a>
          </div>

          {/* Global modal */}
          <QuoteModal />
        </ModalProvider>
      </body>
    </html>
  );
}
