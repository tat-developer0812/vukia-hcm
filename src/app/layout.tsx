import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "KIA Hồ Chí Minh – Đại Lý KIA Chính Hãng | 096.2216.351",
  description:
    "Đại lý KIA chính hãng tại TP.HCM. Mua xe KIA Seltos, Sonet, Carens, K3, K5, Sportage, Carnival, Sorento, Morning 2025 với giá tốt nhất. Hotline: 096.2216.351",
  keywords: "KIA HCM, đại lý KIA, mua xe KIA, KIA Seltos, KIA Sonet, KIA Carens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {/* header = top bar ~26px + nav 64px = 90px */}
        <main className="pt-[90px]">{children}</main>
        <Footer />

        {/* Global floating call button */}
        <a
          href="tel:0962216351"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#BB162B] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#9a1022] active:scale-95 transition-all font-semibold text-sm"
          aria-label="Gọi ngay"
        >
          <Phone size={18} />
          <span className="hidden sm:block">Gọi ngay</span>
        </a>
      </body>
    </html>
  );
}
