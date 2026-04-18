import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ModalProvider } from "@/context/ModalContext";
import { Phone } from "lucide-react";
import { getCars, getContact } from "@/lib/data";

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
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [cars, contact] = await Promise.all([getCars(), getContact()]);

  return (
    <>
      <head>
        <link rel="llms" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <ModalProvider>
        <Header cars={cars} />
        <main className="pt-[90px]">{children}</main>
        <Footer />

        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-3 items-end">
          <a
            href={`https://zalo.me/${contact.hotline.replace(/\./g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat Zalo"
            className="flex items-center gap-2 bg-[#0068FF] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#0057d4] active:scale-95 transition-all font-semibold text-sm"
          >
            <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" aria-hidden="true">
              <path d="M25 4C13.4 4 4 13.4 4 25c0 5.8 2.3 11.1 6.1 15l-2.8 8.4 8.7-2.8c3.2 1.5 6.7 2.4 10 2.4 11.6 0 21-9.4 21-21S36.6 4 25 4zm-8 27v-2.2l10-11H17v-2.8h16v2.2L23 28.2h10V31H17z"/>
            </svg>
            <span className="hidden sm:block">Chat Zalo</span>
          </a>
          <a
            href={`tel:${contact.hotline.replace(/\./g, "")}`}
            aria-label={`Gọi ${contact.hotline}`}
            className="flex items-center gap-2 bg-[#BB162B] text-white px-4 sm:px-5 py-3 rounded-full shadow-2xl hover:bg-[#9a1022] active:scale-95 transition-all font-semibold text-sm"
          >
            <Phone size={18} aria-hidden="true" />
            <span className="hidden sm:block">{contact.hotline}</span>
          </a>
        </div>

        <QuoteModal cars={cars} />
      </ModalProvider>
    </>
  );
}
