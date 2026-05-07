import { CheckCircle, Phone, Clock, Wrench, Shield, Star } from "lucide-react";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { getCars } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảo Dưỡng Xe KIA Gò Vấp – Dịch Vụ Chính Hãng THACO | 0931.456.204",
  description:
    "Bảo dưỡng xe KIA tại Gò Vấp – dịch vụ chính hãng tại 189 Nguyễn Oanh. Kỹ thuật viên KIA chuyên nghiệp, phụ tùng chính hãng, báo giá minh bạch. Đặt lịch ngay: 0931.456.204",
  alternates: { canonical: "https://www.kiagovaphcm.com/bao-duong-xe-kia-go-vap" },
  openGraph: {
    title: "Bảo Dưỡng Xe KIA Gò Vấp – Dịch Vụ Chính Hãng",
    description: "Bảo dưỡng xe KIA tại 189 Nguyễn Oanh, Gò Vấp. Kỹ thuật viên chính hãng, phụ tùng KIA chính hãng.",
    url: "https://www.kiagovaphcm.com/bao-duong-xe-kia-go-vap",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bảo dưỡng xe KIA tại Gò Vấp",
  provider: {
    "@type": "AutoDealer",
    name: "Showroom Ô Tô KIA Gò Vấp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "189 Nguyễn Oanh",
      addressLocality: "Phường 10, Quận Gò Vấp",
      addressRegion: "TP HCM",
      addressCountry: "VN",
    },
    telephone: "0931456204",
  },
  areaServed: ["Gò Vấp", "Bình Thạnh", "Tân Bình", "TP HCM"],
  serviceType: "Bảo dưỡng xe ô tô",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Bảo dưỡng xe KIA định kỳ bao lâu một lần?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "KIA khuyến nghị bảo dưỡng định kỳ mỗi 5.000–10.000 km hoặc 6 tháng tùy điều kiện sử dụng. Bảo dưỡng lớn thực hiện tại 20.000 km và 40.000 km.",
      },
    },
    {
      "@type": "Question",
      name: "Chi phí bảo dưỡng xe KIA tại Gò Vấp là bao nhiêu?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chi phí bảo dưỡng định kỳ tùy theo cấp bảo dưỡng và dòng xe. Gói bảo dưỡng cơ bản từ 500.000đ, gói đầy đủ từ 1.500.000đ. Liên hệ 0931.456.204 để nhận báo giá chi tiết.",
      },
    },
    {
      "@type": "Question",
      name: "Đặt lịch bảo dưỡng KIA Gò Vấp như thế nào?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Đặt lịch bảo dưỡng qua hotline 0931.456.204, Zalo hoặc điền form trực tuyến trên website. Showroom KIA Gò Vấp tại 189 Nguyễn Oanh mở cửa 7:30–21:00 tất cả các ngày.",
      },
    },
    {
      "@type": "Question",
      name: "Xe KIA còn bảo hành có cần bảo dưỡng tại đại lý không?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Để duy trì bảo hành chính hãng 5 năm/150.000km, xe KIA nên được bảo dưỡng tại đại lý ủy quyền KIA như showroom KIA Gò Vấp. Kỹ thuật viên được đào tạo bởi KIA Hàn Quốc, sử dụng phụ tùng chính hãng.",
      },
    },
  ],
};

const packages = [
  {
    km: "5.000 km",
    interval: "3 tháng",
    items: ["Thay dầu động cơ", "Thay lọc dầu", "Kiểm tra áp suất lốp", "Kiểm tra hệ thống phanh", "Kiểm tra đèn & gương"],
    note: "Gói cơ bản",
    color: "border-gray-200",
  },
  {
    km: "10.000 km",
    interval: "6 tháng",
    items: ["Tất cả gói 5.000km", "Thay lọc gió động cơ", "Kiểm tra hệ thống làm mát", "Kiểm tra ắc quy", "Kiểm tra hệ thống lái", "Vệ sinh buồng đốt"],
    note: "Gói phổ biến",
    color: "border-[#BB162B]",
    highlight: true,
  },
  {
    km: "20.000 km",
    interval: "12 tháng",
    items: ["Tất cả gói 10.000km", "Thay lọc điều hòa", "Thay dầu hộp số", "Kiểm tra hệ thống treo", "Cân chỉnh góc đặt bánh", "Kiểm tra cao su gioăng"],
    note: "Gói toàn diện",
    color: "border-gray-200",
  },
  {
    km: "40.000 km",
    interval: "24 tháng",
    items: ["Tất cả gói 20.000km", "Thay bugi", "Thay dây curoa (nếu có)", "Thay dầu trợ lực lái", "Vệ sinh kim phun nhiên liệu", "Kiểm tra toàn bộ gầm xe"],
    note: "Gói đại tu",
    color: "border-gray-200",
  },
];

const steps = [
  { num: "01", title: "Đặt lịch hẹn", desc: "Gọi hotline hoặc đặt lịch online – nhận xác nhận trong 30 phút" },
  { num: "02", title: "Tiếp nhận xe", desc: "Kỹ thuật viên kiểm tra xe ban đầu và lập phiếu công việc" },
  { num: "03", title: "Thực hiện bảo dưỡng", desc: "Thực hiện theo đúng quy trình KIA, phụ tùng chính hãng" },
  { num: "04", title: "Kiểm tra QC", desc: "Kiểm tra chất lượng lần cuối trước khi trả xe" },
  { num: "05", title: "Bàn giao xe", desc: "Giải thích công việc đã thực hiện, thanh toán minh bạch" },
  { num: "06", title: "Hậu mãi", desc: "Gọi kiểm tra xe sau 3 ngày, nhắc lịch bảo dưỡng tiếp theo" },
];

export default async function MaintenancePage() {
  const cars = await getCars();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <span className="inline-block bg-[#BB162B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Dịch vụ chính hãng KIA
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3">
              Bảo Dưỡng Xe KIA Tại Gò Vấp
            </h1>
            <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-5" />
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Dịch vụ bảo dưỡng xe KIA chính hãng tại <strong className="text-white">189 Nguyễn Oanh, Quận Gò Vấp</strong>.
              Kỹ thuật viên được đào tạo bởi KIA Hàn Quốc · Phụ tùng KIA chính hãng · Báo giá minh bạch
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <a
                href="tel:0931456204"
                className="flex items-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={16} /> Đặt lịch: 0931.456.204
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

        {/* Trust badges */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={20} className="text-[#BB162B]" />, text: "Phụ tùng KIA chính hãng" },
              { icon: <Star size={20} className="text-[#BB162B]" />, text: "Kỹ thuật viên được KIA đào tạo" },
              { icon: <Clock size={20} className="text-[#BB162B]" />, text: "Mở cửa 7:30–21:00 mỗi ngày" },
              { icon: <CheckCircle size={20} className="text-[#BB162B]" />, text: "Bảo hành công việc 3 tháng" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-[#05141F]">
                {b.icon}
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Packages */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Bảo dưỡng KIA Gò Vấp</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#05141F] mt-2">Gói bảo dưỡng định kỳ</h2>
              <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {packages.map((pkg, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl border-2 ${pkg.color} p-5 shadow-sm flex flex-col ${pkg.highlight ? "ring-2 ring-[#BB162B]/20" : ""}`}
                >
                  {pkg.highlight && (
                    <span className="self-start bg-[#BB162B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider">
                      Phổ biến nhất
                    </span>
                  )}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Wrench size={16} className="text-[#BB162B]" />
                      <span className="font-black text-xl text-[#05141F]">{pkg.km}</span>
                    </div>
                    <p className="text-xs text-gray-400">Mỗi {pkg.interval} · {pkg.note}</p>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {pkg.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                        <CheckCircle size={13} className="text-[#BB162B] mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="tel:0931456204"
                    className="mt-5 block text-center bg-[#05141F] hover:bg-[#BB162B] text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    Đặt lịch ngay
                  </a>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">
              * Giá cụ thể tùy dòng xe và tình trạng thực tế. Liên hệ để nhận báo giá chính xác.
            </p>
          </div>

          {/* Process */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Quy trình</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#05141F] mt-2">6 bước bảo dưỡng chuyên nghiệp</h2>
              <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {steps.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-1.5 w-3 h-0.5 bg-[#BB162B]" />
                  )}
                  <div className="w-9 h-9 bg-[#BB162B] text-white rounded-full flex items-center justify-center font-black text-xs mx-auto mb-3">
                    {s.num}
                  </div>
                  <p className="font-bold text-xs text-[#05141F] mb-1">{s.title}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-black text-[#05141F] mb-6">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
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

              <div className="mt-8 bg-gradient-to-br from-[#05141F] to-[#0d2137] rounded-2xl p-6 text-white">
                <h3 className="font-black text-lg mb-2">Địa chỉ bảo dưỡng KIA Gò Vấp</h3>
                <p className="text-gray-300 text-sm mb-1">📍 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</p>
                <p className="text-gray-300 text-sm mb-1">📞 <a href="tel:0931456204" className="hover:text-white font-semibold">0931.456.204</a></p>
                <p className="text-gray-300 text-sm">🕒 Mở cửa 7:30 – 21:00, Thứ 2 – Chủ nhật</p>
                <Link
                  href="/lien-he-kia-ho-chi-minh"
                  className="mt-4 inline-block text-xs font-bold text-[#BB162B] border border-[#BB162B] px-4 py-1.5 rounded-full hover:bg-[#BB162B] hover:text-white transition-colors"
                >
                  Xem bản đồ →
                </Link>
              </div>
            </div>

            {/* Form */}
            <div id="dat-lich">
              <h2 className="text-2xl font-black text-[#05141F] mb-6">Đặt lịch bảo dưỡng online</h2>
              <QuoteForm cars={cars} page="maintenance" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
