import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight, ArrowLeft, Wrench } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import QuoteButton from "@/components/QuoteButton";
import CarDetailTracker from "@/components/CarDetailTracker";
import { getCars, getPromotions, cleanCarName, parseVndPrice, currentMonthLabel, buildCarFaqs } from "@/lib/data";

export async function generateStaticParams() {
  const cars = await getCars();
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cars = await getCars();
  const car = cars.find((c) => c.slug === slug);
  if (!car) return {};
  const name = cleanCarName(car.name);
  const url = `https://www.kiagovaphcm.com/${slug}`;
  const title = `${name} – Giá từ ${car.startPrice} tại KIA Gò Vấp HCM`;
  const description = `${car.description} Xem bảng giá lăn bánh, trả góp & đặt lịch lái thử tại KIA Gò Vấp – 189 Nguyễn Oanh. Hotline 0931.456.204.`;
  return {
    title,
    description,
    keywords: `${name}, ${name} giá, ${name} giá lăn bánh, mua ${name} Gò Vấp, ${name} trả góp, KIA Gò Vấp HCM`,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "KIA Gò Vấp HCM",
      locale: "vi_VN",
      type: "website",
      images: [{ url: car.heroImage, width: 1200, height: 630, alt: `${name} tại KIA Gò Vấp HCM` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [car.heroImage],
    },
  };
}

export default async function CarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cars, promotions] = await Promise.all([getCars(), getPromotions()]);
  const car = cars.find((c) => c.slug === slug);
  if (!car) notFound();

  const otherCars = cars.filter((c) => c.slug !== slug).slice(0, 4);

  const name = cleanCarName(car.name);
  const url = `https://www.kiagovaphcm.com/${slug}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://www.kiagovaphcm.com/" },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  };

  // Schema Xe + giá → đủ điều kiện hiện giá/rich snippet trên Google
  const variantPrices = car.variants
    .map((v) => parseVndPrice(v.price))
    .filter((n): n is number => n !== null);
  const lowPrice = variantPrices.length ? Math.min(...variantPrices) : parseVndPrice(car.startPrice);
  const highPrice = variantPrices.length ? Math.max(...variantPrices) : lowPrice;
  const seats = parseInt(car.specs.seats, 10);

  const carJsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name,
    model: name,
    brand: { "@type": "Brand", name: "Kia" },
    image: car.heroImage,
    description: car.description,
    url,
    ...(car.specs.fuel ? { fuelType: car.specs.fuel } : {}),
    ...(car.specs.transmission ? { vehicleTransmission: car.specs.transmission } : {}),
    ...(Number.isFinite(seats) && seats > 0 ? { vehicleSeatingCapacity: seats } : {}),
    ...(car.specs.engine
      ? { vehicleEngine: { "@type": "EngineSpecification", name: car.specs.engine } }
      : {}),
    ...(lowPrice
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "VND",
            lowPrice,
            highPrice: highPrice ?? lowPrice,
            offerCount: car.variants.length || 1,
            availability: "https://schema.org/InStock",
            url,
            seller: { "@type": "AutoDealer", name: "KIA Gò Vấp HCM" },
          },
        }
      : {}),
  };

  const faqs = buildCarFaqs(car);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(carJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#BB162B] flex items-center gap-1">
            <ArrowLeft size={14} /> Trang chủ
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#05141F] font-semibold">{name}</span>
        </div>
      </div>

      <CarDetailTracker car={slug} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Hero */}
            <div className="bg-gradient-to-br from-[#05141F] to-[#0d2137] rounded-2xl p-5 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#BB162B]/10 rounded-full -translate-y-12 translate-x-12 hidden md:block" />
              <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 md:items-center relative z-10">
                <div className="relative h-40 sm:h-48 md:h-56 md:order-2 mb-4 md:mb-0">
                  <Image
                    src={car.heroImage}
                    alt={`${name} – Giá từ ${car.startPrice} tại KIA Gò Vấp HCM`}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
                <div className="md:order-1">
                  <span className="bg-[#BB162B] text-white text-xs px-3 py-1 rounded-full font-bold uppercase">
                    {car.category === "suv" ? "SUV" : car.category === "sedan" ? "Sedan" : car.category === "mpv" ? "MPV" : "Hatchback"}
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mt-3 mb-2">{name}</h1>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed hidden sm:block">{car.description}</p>
                  <div>
                    <p className="text-gray-400 text-xs">Giá từ</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#BB162B]">{car.startPrice}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Trả trước: <span className="text-white font-semibold">{car.downPayment}</span>
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <QuoteButton carSlug={car.slug} />
                  </div>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-[#05141F] mb-4">Thông số nổi bật</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Động cơ", value: car.specs.engine },
                  { label: "Công suất", value: car.specs.power },
                  { label: "Mô men xoắn", value: car.specs.torque },
                  { label: "Hộp số", value: car.specs.transmission },
                  { label: "Số chỗ", value: car.specs.seats },
                  { label: "Nhiên liệu", value: car.specs.fuel },
                ].map((spec) => (
                  <div key={spec.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{spec.label}</p>
                    <p className="font-bold text-sm text-[#05141F]">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price table */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-[#05141F] mb-4">
                Bảng giá {name} {new Date().getFullYear()}
                <div className="w-10 h-0.5 bg-[#BB162B] mt-2" />
              </h2>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm min-w-[320px]">
                  <thead>
                    <tr className="bg-[#05141F] text-white">
                      <th className="text-left px-4 py-3 font-semibold">Phiên bản</th>
                      <th className="text-right px-4 py-3 font-semibold">Giá xe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {car.variants.map((v, i) => (
                      <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="px-4 py-3 font-medium text-[#05141F]">{v.name}</td>
                        <td className="px-4 py-3 text-right font-black text-[#BB162B]">{v.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Giá trên là giá niêm yết, chưa bao gồm phụ kiện và ưu đãi. Liên hệ để nhận báo giá tốt nhất.
              </p>
            </div>

            {/* Maintenance CTA */}
            <Link
              href="/bao-duong-xe-kia-go-vap"
              className="flex items-center gap-4 bg-white border border-gray-200 hover:border-[#BB162B] rounded-2xl p-5 shadow-sm transition-colors group"
            >
              <div className="w-10 h-10 bg-[#05141F] group-hover:bg-[#BB162B] rounded-xl flex items-center justify-center shrink-0 transition-colors">
                <Wrench className="text-white" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-black text-sm text-[#05141F]">Bảo dưỡng {name} tại Gò Vấp</p>
                <p className="text-xs text-gray-500 mt-0.5">Dịch vụ chính hãng · 189 Nguyễn Oanh</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 group-hover:text-[#BB162B] transition-colors" />
            </Link>

            {/* Promotions */}
            <div className="bg-gradient-to-r from-[#05141F] to-[#1a3a5c] rounded-2xl p-6 text-white">
              <h2 className="text-lg font-black mb-4">Khuyến mãi {currentMonthLabel()}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {promotions.map((p, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-[#BB162B] mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-200">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-black text-[#05141F] mb-1">
                Câu hỏi thường gặp về {name}
                <div className="w-10 h-0.5 bg-[#BB162B] mt-2" />
              </h2>
              <div className="divide-y divide-gray-100">
                {faqs.map((f, i) => (
                  <details key={i} className="group py-3">
                    <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-sm text-[#05141F]">
                      <span>{f.q}</span>
                      <ChevronRight
                        size={16}
                        className="text-[#BB162B] shrink-0 transition-transform group-open:rotate-90"
                      />
                    </summary>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-[94px]">
              <QuoteForm cars={cars} defaultCar={car.slug} page="car_detail" />

              <div className="mt-6 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-black text-[#05141F] mb-4 text-sm">Xe khác bạn có thể thích</h3>
                <div className="space-y-3">
                  {otherCars.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="relative w-16 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        <Image src={c.image} alt={c.name} fill sizes="64px" className="object-contain p-1" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#05141F] group-hover:text-[#BB162B] transition-colors">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#BB162B] font-semibold">Từ {c.startPrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
