import { CheckCircle, MapPin, Phone, Shield, Star, Wrench, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getContact } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showroom KIA Gò Vấp – Đại Lý Chính Hãng 189 Nguyễn Oanh | KIA HCM",
  description:
    "Showroom KIA Gò Vấp tại 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM. Đại lý KIA chính hãng THACO, đội ngũ tư vấn chuyên nghiệp, bảo hành 5 năm/150.000km.",
  alternates: { canonical: "https://www.kiagovaphcm.com/gioi-thieu-kia-go-vap" },
  openGraph: {
    title: "Showroom KIA Gò Vấp – Đại Lý Chính Hãng 189 Nguyễn Oanh",
    description: "Đại lý KIA chính hãng tại Gò Vấp, TP HCM. 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp.",
    url: "https://www.kiagovaphcm.com/gioi-thieu-kia-go-vap",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoDealer", "LocalBusiness"],
  name: "Showroom Ô Tô KIA Gò Vấp",
  alternateName: ["Đại lý KIA Gò Vấp", "KIA Nguyễn Oanh", "Showroom KIA Gò Vấp"],
  description:
    "Đại lý KIA chính hãng tại Gò Vấp, TP HCM. Bán và bảo dưỡng xe KIA chính hãng. Đội ngũ tư vấn chuyên nghiệp, bảo hành 5 năm/150.000km.",
  url: "https://www.kiagovaphcm.com",
  telephone: "0931456204",
  address: {
    "@type": "PostalAddress",
    streetAddress: "189 Nguyễn Oanh",
    addressLocality: "Phường 10, Quận Gò Vấp",
    addressRegion: "TP HCM",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.8326,
    longitude: 106.6648,
  },
  hasMap: "https://maps.app.goo.gl/UUAFA73y673nzSfb8",
  openingHours: "Mo-Su 07:30-21:00",
  areaServed: ["Gò Vấp", "Bình Thạnh", "Tân Bình", "Phú Nhuận", "TP HCM"],
};

const stats = [
  { value: "500+", label: "Xe đã bàn giao" },
  { value: "5 năm", label: "Bảo hành chính hãng" },
  { value: "10+", label: "Ngân hàng hợp tác" },
  { value: "7:30–21:00", label: "Mở cửa mỗi ngày" },
];

const strengths = [
  {
    icon: <Shield className="text-[#BB162B]" size={28} />,
    title: "Đại lý KIA chính hãng",
    desc: "Được THACO ủy quyền – nhà phân phối KIA độc quyền tại Việt Nam. Xe chính hãng, có tem kiểm định, bảo hành đầy đủ theo tiêu chuẩn KIA toàn cầu.",
  },
  {
    icon: <Star className="text-[#BB162B]" size={28} />,
    title: "Đội ngũ tư vấn chuyên nghiệp",
    desc: "Tư vấn viên am hiểu sản phẩm, hỗ trợ so sánh xe, chọn phiên bản phù hợp ngân sách. Không ép buộc, tư vấn trung thực.",
  },
  {
    icon: <CreditCard className="text-[#BB162B]" size={28} />,
    title: "Hỗ trợ tài chính toàn diện",
    desc: "Vay trả góp lên đến 85% giá trị xe, lãi suất ưu đãi, liên kết 10+ ngân hàng. Duyệt hồ sơ nhanh trong 15 phút, thủ tục đơn giản.",
  },
  {
    icon: <Wrench className="text-[#BB162B]" size={28} />,
    title: "Xưởng dịch vụ chính hãng",
    desc: "Bảo dưỡng và sửa chữa KIA bởi kỹ thuật viên được đào tạo tại KIA Hàn Quốc. Phụ tùng KIA chính hãng, bảo hành công việc 3 tháng.",
  },
  {
    icon: <MapPin className="text-[#BB162B]" size={28} />,
    title: "Vị trí thuận tiện – 189 Nguyễn Oanh",
    desc: "Showroom KIA tọa lạc tại 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp – trung tâm của quận, dễ dàng tiếp cận từ Bình Thạnh, Tân Bình, trung tâm TP HCM.",
  },
  {
    icon: <CheckCircle className="text-[#BB162B]" size={28} />,
    title: "Cam kết giá tốt nhất",
    desc: "Cam kết báo giá cạnh tranh nhất thị trường. Nếu bạn tìm được giá KIA tốt hơn từ đại lý chính hãng khác, chúng tôi sẽ xem xét hỗ trợ.",
  },
];

export default async function AboutPage() {
  const contact = await getContact();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <span className="inline-block bg-[#BB162B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                Đại lý chính hãng KIA
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight">
                Showroom KIA Gò Vấp<br />
                <span className="text-[#BB162B]">Đại Lý Chính Hãng</span> Tại 189 Nguyễn Oanh
              </h1>
              <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
                Đại lý KIA chính hãng tại Quận Gò Vấp, TP HCM – nơi bạn có thể trải nghiệm toàn bộ dòng xe KIA 2025,
                nhận tư vấn chuyên nghiệp và hỗ trợ mua xe tốt nhất.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="tel:0931456204"
                  className="flex items-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white px-6 py-3 rounded-full font-bold text-sm transition-colors"
                >
                  <Phone size={16} /> Gọi tư vấn ngay
                </a>
                <Link
                  href="/lien-he-kia-ho-chi-minh"
                  className="flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#05141F] px-6 py-3 rounded-full font-bold text-sm transition-colors"
                >
                  <MapPin size={16} /> Chỉ đường đến showroom
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black text-[#BB162B]">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* About */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Về chúng tôi</span>
                <h2 className="text-2xl md:text-3xl font-black text-[#05141F] mt-2 mb-4">
                  Đại lý KIA Gò Vấp – Uy tín hàng đầu tại TP HCM
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Showroom KIA Gò Vấp là đại lý ủy quyền chính thức của THACO – nhà phân phối độc quyền KIA tại Việt Nam.
                  Tọa lạc tại <strong>189 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP HCM</strong>, chúng tôi tự hào phục vụ
                  hàng trăm khách hàng tại khu vực Gò Vấp, Bình Thạnh, Tân Bình và toàn TP HCM.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Với đội ngũ tư vấn chuyên nghiệp, xưởng dịch vụ chính hãng và cam kết mang lại trải nghiệm mua xe tốt nhất,
                  KIA Gò Vấp là lựa chọn hàng đầu cho những ai đang tìm kiếm xe KIA tại khu vực phía Bắc TP HCM.
                </p>
                <div className="space-y-2">
                  {[
                    "Trưng bày đầy đủ các dòng xe KIA 2025",
                    "Khu vực lái thử rộng rãi, an toàn",
                    "Xưởng bảo dưỡng dịch vụ chính hãng",
                    "Phòng tư vấn tài chính riêng biệt",
                    "Bãi đỗ xe rộng, miễn phí",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={15} className="text-[#BB162B] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#05141F] to-[#0d2137] rounded-2xl p-8 text-white">
                <h3 className="font-black text-xl mb-6">Thông tin showroom</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#BB162B] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Địa chỉ KIA Nguyễn Oanh</p>
                      <p className="text-sm font-semibold">{contact.address}</p>
                      <a
                        href="https://maps.app.goo.gl/UUAFA73y673nzSfb8"
                        target="_blank" rel="noopener noreferrer"
                        className="text-xs text-[#BB162B] hover:underline mt-1 inline-block"
                      >
                        Xem Google Maps →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#BB162B] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Hotline tư vấn</p>
                      <a href="tel:0931456204" className="font-black text-2xl text-[#BB162B] hover:opacity-80">
                        {contact.hotline}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#BB162B] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">Giờ làm việc</p>
                      <p className="text-sm font-semibold">{contact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[#BB162B] text-xs font-bold uppercase tracking-wider">Điểm mạnh</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#05141F] mt-2">Tại sao chọn showroom KIA Gò Vấp?</h2>
              <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {strengths.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-[#BB162B]/30 transition-colors">
                  <div className="mb-3">{s.icon}</div>
                  <h3 className="font-black text-[#05141F] mb-2 text-sm">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Ghé thăm Showroom KIA Gò Vấp hôm nay
            </h2>
            <p className="text-gray-300 text-sm max-w-lg mx-auto mb-6">
              Trải nghiệm lái thử miễn phí · Nhận báo giá tốt nhất · Tư vấn tài chính không ràng buộc
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:0931456204"
                className="flex items-center gap-2 bg-[#BB162B] hover:bg-[#9a1022] text-white px-7 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <Phone size={16} /> 0931.456.204
              </a>
              <Link
                href="/dang-ky-lai-thu-xe-kia"
                className="flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#05141F] px-7 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <ArrowRight size={16} /> Đăng ký lái thử
              </Link>
              <Link
                href="/bao-duong-xe-kia-go-vap"
                className="flex items-center gap-2 border border-white/60 text-white hover:bg-white hover:text-[#05141F] px-7 py-3 rounded-full font-bold text-sm transition-colors"
              >
                <Wrench size={16} /> Đặt lịch bảo dưỡng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
