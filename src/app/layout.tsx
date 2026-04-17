import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ModalProvider } from "@/context/ModalContext";
import { Phone } from "lucide-react";

const siteUrl = "https://www.kiagovaphcm.com";
const siteTitle = "KIA Gò Vấp HCM – Đại Lý KIA Chính Hãng | 0931.456.204";
const siteDescription =
  "Đại lý KIA chính hãng Gò Vấp – KIA Seltos, Sonet, Carens, Sportage, Carnival, Sorento 2025 giá tốt. Hotline: 0931.456.204";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: "KIA Gò Vấp, đại lý KIA HCM, mua xe KIA, KIA Seltos, KIA Sonet, KIA Carens",
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "KIA Gò Vấp HCM – Đại Lý KIA Chính Hãng",
    description: siteDescription,
    url: siteUrl,
    siteName: "KIA Gò Vấp HCM",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "https://kia-hcm.com/wp-content/uploads/neptune-blue-b3a-0006-1.png",
        width: 1200,
        height: 630,
        alt: "Showroom Ô Tô KIA Gò Vấp HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KIA Gò Vấp HCM – Đại Lý KIA Chính Hãng",
    description: siteDescription,
    images: ["https://kia-hcm.com/wp-content/uploads/neptune-blue-b3a-0006-1.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Showroom Ô Tô KIA Gò Vấp - TP HCM",
  url: siteUrl,
  telephone: "0931456204",
  address: {
    "@type": "PostalAddress",
    streetAddress: "189 Nguyễn Oanh",
    addressLocality: "Phường 10, Quận Gò Vấp",
    addressRegion: "TP HCM",
    addressCountry: "VN",
  },
  openingHours: "Mo-Su 07:30-21:00",
  priceRange: "$$",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="llms" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
