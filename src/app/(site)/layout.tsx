import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import { ModalProvider } from "@/context/ModalContext";
import { getCars, getContact } from "@/lib/data";
import FloatingContact from "@/components/FloatingContact";

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
      <link rel="llms" href="/llms.txt" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ModalProvider>
        <Header cars={cars} />
        <main className="pt-[90px]">{children}</main>
        <Footer />

        <FloatingContact hotline={contact.hotline} />

        <QuoteModal cars={cars} />
      </ModalProvider>
    </>
  );
}
