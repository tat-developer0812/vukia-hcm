import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <main className="pt-[104px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
