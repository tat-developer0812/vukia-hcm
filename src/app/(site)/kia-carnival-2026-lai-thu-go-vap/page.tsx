import Link from "next/link";
import { Phone, CheckCircle, Sofa, Volume2, ShieldCheck, ChevronRight } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { getCars, cleanCarName, parseVndPrice } from "@/lib/data";
import type { Metadata } from "next";

const PAGE_URL = "https://www.kiagovaphcm.com/kia-carnival-2026-lai-thu-go-vap";
const HOTLINE_DISPLAY = "0931.456.204";
const HOTLINE_TEL = "0931456204";
const DEALER_ADDRESS = "189 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM";
const PUBLISHED = "2026-05-19";

export const metadata: Metadata = {
  title: "Kia Carnival 2026: Giá Lăn Bánh, Trả Góp & Lái Thử tại TP.HCM | Kia Gò Vấp",
  description:
    "Kia Carnival 2026 tại TP.HCM – MPV 7-8 chỗ hạng sang. Xem bảng giá lăn bánh, ưu đãi mới nhất, hỗ trợ trả góp tới 80% & đặt lịch lái thử miễn phí tại Kia Gò Vấp – 189 Nguyễn Oanh. Hotline 0931.456.204.",
  keywords:
    "kia carnival, kia carnival hcm, kia carnival 2026, giá kia carnival, kia carnival giá lăn bánh, mua kia carnival tphcm, kia carnival trả góp, lái thử kia carnival gò vấp",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kia Carnival 2026: Giá Lăn Bánh, Trả Góp & Lái Thử tại TP.HCM",
    description:
      "Kia Carnival 2026 tại TP.HCM – MPV 7-8 chỗ hạng sang. Bảng giá lăn bánh, ưu đãi, trả góp 80% & lái thử miễn phí tại Kia Gò Vấp.",
    url: PAGE_URL,
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Kia Carnival 2026: MPV 7 Chỗ Đáng Lái Thử Nhất Cho Gia Đình TP.HCM",
  description:
    "Đánh giá nhanh Kia Carnival 2026 và hướng dẫn đặt lịch lái thử miễn phí tại Kia Gò Vấp.",
  inLanguage: "vi-VN",
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  mainEntityOfPage: PAGE_URL,
  author: {
    "@type": "Organization",
    name: "Kia Gò Vấp",
    url: "https://www.kiagovaphcm.com",
  },
  publisher: {
    "@type": "AutoDealer",
    name: "Showroom Ô Tô Kia Gò Vấp",
    telephone: HOTLINE_TEL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "189 Nguyễn Oanh",
      addressLocality: "Phường 10, Quận Gò Vấp",
      addressRegion: "TP HCM",
      addressCountry: "VN",
    },
  },
  about: { "@type": "Car", name: "Kia Carnival 2026" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://www.kiagovaphcm.com/" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kia Carnival 2026",
      item: PAGE_URL,
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Kia Carnival 2026 có mấy chỗ ngồi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tùy phiên bản, Kia Carnival có cấu hình 7 chỗ (ghế VIP hàng 2) hoặc 8 chỗ (ghế thường hàng 2).",
      },
    },
    {
      "@type": "Question",
      name: "Lái thử Kia Carnival tại Gò Vấp có mất phí không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Không. Kia Gò Vấp hỗ trợ lái thử miễn phí, khách chỉ cần mang theo giấy phép lái xe hạng B trở lên.",
      },
    },
    {
      "@type": "Question",
      name: "Kia Carnival có hỗ trợ trả góp không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Có. Đại lý Kia Gò Vấp hỗ trợ trả góp tới 80% giá trị xe qua các ngân hàng liên kết, thủ tục hoàn tất ngay tại showroom 189 Nguyễn Oanh.",
      },
    },
    {
      "@type": "Question",
      name: "Giá lăn bánh Kia Carnival 2026 tại TP.HCM là bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Giá lăn bánh thay đổi theo phiên bản, mức khuyến mãi từng tháng và phí trước bạ tại TP.HCM. Liên hệ Kia Gò Vấp 0931.456.204 để nhận báo giá lăn bánh chính xác cho phiên bản bạn quan tâm.",
      },
    },
  ],
};

const reasons = [
  {
    icon: <Sofa size={20} className="text-[#BB162B]" />,
    title: "Không gian “phòng khách di động”",
    body: "Hàng ghế thứ 2 dạng VIP (trên các bản cao) có thể ngả sâu, lý tưởng cho gia đình đông thành viên hoặc các chuyến đi dài từ TP.HCM đi Vũng Tàu, miền Tây, Đà Lạt.",
  },
  {
    icon: <Volume2 size={20} className="text-[#BB162B]" />,
    title: "Vận hành êm, đủ tiện nghi đường phố",
    body: "Cách âm tốt, treo êm và bán kính quay vòng hợp lý giúp Carnival dễ dùng trong nội đô TP.HCM, kể cả các trục đông đúc gần Gò Vấp như Phan Văn Trị, Nguyễn Oanh, Quang Trung.",
  },
  {
    icon: <ShieldCheck size={20} className="text-[#BB162B]" />,
    title: "An toàn chủ động",
    body: "Cảnh báo điểm mù, giữ làn, cảnh báo va chạm phía trước (tùy phiên bản) hỗ trợ tốt cho lái xe gia đình mới chuyển sang xe cỡ lớn.",
  },
];

export default async function CarnivalArticlePage() {
  const cars = await getCars();
  const carnival = cars.find((c) => c.slug.includes("carnival"));
  const carnivalSlug = carnival?.slug ?? "new-kia-carnival";
  const carnivalName = carnival ? cleanCarName(carnival.name) : "Kia Carnival";
  const variantPrices = (carnival?.variants ?? [])
    .map((v) => parseVndPrice(v.price))
    .filter((n): n is number => n !== null);
  const highPrice = variantPrices.length ? Math.max(...variantPrices) : null;
  const highPriceText =
    highPrice !== null
      ? carnival?.variants.find((v) => parseVndPrice(v.price) === highPrice)?.price ?? null
      : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#BB162B]">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-[#05141F] font-semibold">Kia Carnival 2026</span>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-14 px-4 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block bg-[#BB162B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              MPV 7–8 chỗ hạng sang · TP.HCM
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight">
              Kia Carnival 2026 tại TP.HCM – Giá Lăn Bánh, Trả Góp &amp; Lái Thử
            </h1>
            <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-5" />
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              {carnivalName} – MPV 7–8 chỗ hạng sang. Xem bảng giá lăn bánh, ưu đãi mới nhất, hỗ trợ
              trả góp tới 80% và đặt lịch lái thử miễn phí tại{" "}
              <strong className="text-white">Kia Gò Vấp – 189 Nguyễn Oanh</strong>.
            </p>
            {carnival?.startPrice && (
              <p className="mt-5 inline-block bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm md:text-base font-bold">
                Giá niêm yết từ <span className="text-[#ff5a6e]">{carnival.startPrice}</span>
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a
                href={`tel:${HOTLINE_TEL}`}
                className="flex items-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={16} /> Đặt lịch lái thử: {HOTLINE_DISPLAY}
              </a>
              <a
                href="#dat-lich"
                className="flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#05141F] px-6 py-3 rounded-full font-bold text-sm transition-colors"
              >
                Đặt lịch online
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Article body */}
            <article className="lg:col-span-2 space-y-10">
              <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <p className="text-base text-gray-700 leading-relaxed">
                  <strong>Kia Carnival</strong> đang là một trong những mẫu MPV 7 chỗ được khách hàng TP.HCM
                  quan tâm nhất khi tìm xe gia đình rộng rãi, hiện đại và êm ái. Nếu bạn đang cân nhắc nâng cấp
                  lên xe 7 chỗ, dưới đây là những điểm nhanh về <strong>Kia Carnival 2026</strong> – và cách
                  lái thử ngay tại Gò Vấp.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">Tổng quan Kia Carnival 2026</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Kia Carnival thuộc phân khúc MPV cao cấp, định vị giữa SUV 7 chỗ truyền thống và minivan
                    gia đình. Xe nổi bật với thiết kế ngoại thất mang hơi hướng SUV, khoang nội thất rộng vượt
                    trội nhờ chiều dài hơn 5 mét và trục cơ sở dài, cho phép bố trí 3 hàng ghế thoải mái cho cả
                    người lớn ở hàng cuối.
                  </p>
                  <p>
                    Phiên bản 2026 tiếp tục được trang bị cửa trượt điện hai bên, cửa cốp điện thông minh, màn
                    hình giải trí lớn và hệ thống hỗ trợ lái nâng cao Kia Drive Wise (tùy phiên bản).
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">3 lý do nên chọn Kia Carnival tại Gò Vấp</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {reasons.map((r, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                      <div className="w-10 h-10 bg-[#05141F]/5 rounded-xl flex items-center justify-center mb-3">
                        {r.icon}
                      </div>
                      <h3 className="font-black text-sm text-[#05141F] mb-2">{r.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">Giá xe Kia Carnival 2026 tại TP.HCM</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-5 text-gray-700 leading-relaxed">
                  <p>
                    {carnivalName} có giá niêm yết{" "}
                    {carnival?.startPrice ? (
                      <>
                        từ <strong>{carnival.startPrice}</strong>
                      </>
                    ) : (
                      "nhiều mức"
                    )}
                    {highPriceText ? (
                      <>
                        {" "}
                        đến <strong>{highPriceText}</strong> cho bản cao nhất
                      </>
                    ) : null}
                    , gồm nhiều phiên bản máy dầu và hybrid. Giá lăn bánh thực tế tại TP.HCM còn tùy mức
                    khuyến mãi từng tháng, phí trước bạ và phụ kiện — để lại số điện thoại để nhận báo giá
                    lăn bánh chính xác nhất.
                  </p>

                  {carnival && carnival.variants.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-[#05141F] text-white text-left">
                            <th className="px-4 py-3 font-bold rounded-tl-xl">Phiên bản</th>
                            <th className="px-4 py-3 font-bold text-right rounded-tr-xl">Giá niêm yết</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carnival.variants.map((v, i) => (
                            <tr key={i} className="border-b border-gray-100 last:border-0">
                              <td className="px-4 py-3 font-medium text-[#05141F]">{v.name}</td>
                              <td className="px-4 py-3 text-right font-bold text-[#BB162B]">{v.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {carnival?.downPayment && (
                    <p className="text-sm">
                      <strong>Trả góp:</strong> hỗ trợ vay tới 80% giá trị xe, trả trước từ{" "}
                      <strong>{carnival.downPayment}</strong> là có thể nhận xe — thủ tục nhanh gọn, hỗ trợ
                      thu cũ đổi mới ngay tại showroom.
                    </p>
                  )}

                  <div className="bg-[#05141F] text-white rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="font-black text-sm">Nhận báo giá lăn bánh Kia Carnival mới nhất</p>
                      <p className="text-xs text-gray-300 mt-1">
                        Tư vấn theo phiên bản bạn quan tâm – chỉ trong vài phút.
                      </p>
                    </div>
                    <Link
                      href={`/${carnivalSlug}`}
                      className="self-start sm:self-auto inline-flex items-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
                    >
                      Xem chi tiết Carnival <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">Thông số nổi bật Kia Carnival</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Số chỗ", value: carnival?.specs.seats || "7–8 chỗ" },
                    { label: "Động cơ", value: carnival?.specs.engine || "2.2L Dầu / Hybrid" },
                    { label: "Hộp số", value: carnival?.specs.transmission || "8AT" },
                    { label: "Nhiên liệu", value: carnival?.specs.fuel || "Dầu / Hybrid" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center">
                      <p className="text-[11px] uppercase tracking-wider text-gray-400 mb-1">{s.label}</p>
                      <p className="font-black text-sm text-[#05141F]">{s.value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">Mua Kia Carnival tại TP.HCM ở đâu uy tín?</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Nếu bạn đang tìm mua <strong>Kia Carnival tại TP.HCM (Sài Gòn)</strong>, showroom{" "}
                    <strong>Kia Gò Vấp – 189 Nguyễn Oanh</strong> là đại lý chính hãng, giao xe tận nơi cho khách
                    ở Gò Vấp, Bình Thạnh, Phú Nhuận, Tân Bình, Quận 12, Thủ Đức và toàn TP.HCM.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Báo giá lăn bánh Kia Carnival minh bạch, đúng khuyến mãi mới nhất tại TP.HCM.",
                      "Hỗ trợ trả góp tới 80%, lãi suất ưu đãi, duyệt hồ sơ nhanh.",
                      "Thu cũ – đổi mới, định giá xe cũ tận nơi trong TP.HCM.",
                      "Đủ màu, giao xe nhanh; lái thử miễn phí tại Gò Vấp hoặc tận nhà.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} className="text-[#BB162B] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">
                  Đặt lịch lái thử Kia Carnival tại Kia Gò Vấp
                </h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Cách tốt nhất để biết Kia Carnival có hợp với gia đình bạn không là ngồi thử cả 3 hàng ghế
                    và chạy thử một quãng đường thực tế. <strong>Kia Gò Vấp</strong> hỗ trợ:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Lái thử miễn phí, không bắt buộc đặt cọc.",
                      "Đặt lịch theo khung giờ bạn chọn, kể cả cuối tuần.",
                      "Tư vấn trả góp, đổi xe cũ lấy xe mới ngay tại showroom.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} className="text-[#BB162B] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gradient-to-r from-[#05141F] to-[#1a3a5c] rounded-xl p-5 text-white">
                    <p className="font-black mb-1">👉 Đặt lịch lái thử Kia Carnival ngay hôm nay</p>
                    <p className="text-sm text-gray-300">
                      Để lại số điện thoại ở form bên cạnh hoặc gọi trực tiếp{" "}
                      <a href={`tel:${HOTLINE_TEL}`} className="text-white font-semibold underline">
                        {HOTLINE_DISPLAY}
                      </a>
                      . Đội ngũ Kia Gò Vấp sẽ xác nhận lịch trong vòng vài giờ.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-black text-[#05141F] mb-3">Câu hỏi thường gặp về Kia Carnival</h2>
                <div className="w-10 h-0.5 bg-[#BB162B] mb-5" />
                <div className="space-y-3">
                  {faqJsonLd.mainEntity.map((q, i) => (
                    <details key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm group">
                      <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-bold text-sm text-[#05141F] list-none">
                        {q.name}
                        <span className="text-[#BB162B] text-lg font-black group-open:rotate-45 transition-transform shrink-0 ml-3">+</span>
                      </summary>
                      <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{q.acceptedAnswer.text}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#05141F] to-[#0d2137] rounded-2xl p-6 md:p-8 text-white">
                <h3 className="font-black text-lg mb-2">Showroom Kia Gò Vấp</h3>
                <p className="text-gray-300 text-sm mb-1">📍 {DEALER_ADDRESS}</p>
                <p className="text-gray-300 text-sm mb-1">
                  📞{" "}
                  <a href={`tel:${HOTLINE_TEL}`} className="hover:text-white font-semibold">
                    {HOTLINE_DISPLAY}
                  </a>
                </p>
                <p className="text-gray-300 text-sm">🕒 Mở cửa 7:30 – 21:00, Thứ 2 – Chủ nhật</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <Link
                    href="/dang-ky-lai-thu-xe-kia"
                    className="inline-block text-xs font-bold text-[#BB162B] border border-[#BB162B] px-4 py-1.5 rounded-full hover:bg-[#BB162B] hover:text-white transition-colors"
                  >
                    Trang đăng ký lái thử →
                  </Link>
                  <Link
                    href="/thu-tuc-tra-gop-xe-kia"
                    className="inline-block text-xs font-bold text-white/80 border border-white/40 px-4 py-1.5 rounded-full hover:bg-white hover:text-[#05141F] transition-colors"
                  >
                    Xem thủ tục trả góp →
                  </Link>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-[94px]" id="dat-lich">
                <QuoteForm
                  cars={cars}
                  defaultCar={carnivalSlug}
                  page="article_carnival"
                  title="Đặt lịch lái thử Carnival"
                  submitLabel="Đặt lịch ngay"
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
