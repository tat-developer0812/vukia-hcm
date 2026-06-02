import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ModalProvider } from "@/context/ModalContext";
import { getCars, getContact } from "@/lib/data";
import FloatingContact from "@/components/FloatingContact";
import PageViewTracker from "@/components/PageViewTracker";

const siteUrl = "https://www.kiagovaphcm.com";
const siteTitle = "KIA Gò Vấp HCM – Đại Lý KIA Chính Hãng | 0931.456.204";
const siteDescription =
  "Đại lý KIA chính hãng Gò Vấp – KIA Seltos, Sonet, Carens, Sportage, Carnival, Sorento 2025 giá tốt. Hotline: 0931.456.204";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: "KIA Gò Vấp, đại lý KIA HCM, mua xe KIA, KIA Seltos, KIA Sonet, KIA Carens",
  verification: { google: "rfHNUkXMO37XwoZ7lfhEw0rWeZfsEIc7U3MSx03TN2w" },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
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
  alternateName: ["KIA Gò Vấp", "Đại lý KIA Gò Vấp", "KIA Nguyễn Oanh"],
  url: siteUrl,
  telephone: "0931456204",
  address: {
    "@type": "PostalAddress",
    streetAddress: "189 Nguyễn Oanh",
    addressLocality: "Phường 10, Quận Gò Vấp",
    addressRegion: "TP HCM",
    addressCountry: "VN",
    postalCode: "70000",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.8326,
    longitude: 106.6648,
  },
  hasMap: "https://maps.app.goo.gl/UUAFA73y673nzSfb8",
  openingHours: "Mo-Su 07:30-21:00",
  priceRange: "$$",
  areaServed: ["Gò Vấp", "Bình Thạnh", "Tân Bình", "Phú Nhuận", "TP HCM"],
  currenciesAccepted: "VND",
  paymentAccepted: "Tiền mặt, Chuyển khoản, Trả góp",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KIA Gò Vấp HCM",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [cars, contact] = await Promise.all([getCars(), getContact()]);

  return (
    <>
      <link rel="llms" href="/llms.txt" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ModalProvider>
        <PageViewTracker />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#BB162B] focus:text-white focus:font-bold focus:text-sm"
        >
          Bỏ qua nội dung chính
        </a>
        <Header cars={cars} />
        <main id="main-content" className="pt-[90px]">{children}</main>
        <Footer />

        <FloatingContact hotline={contact.hotline} />

        <QuoteModal cars={cars} />
      </ModalProvider>
    </>
  );
}
