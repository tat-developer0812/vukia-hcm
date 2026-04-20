import { CheckCircle, Car, Phone } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { getCars } from "@/lib/data";

export const metadata = {
  title: "Đăng ký lái thử xe KIA – Miễn phí tại TP.HCM",
  description: "Đăng ký lái thử xe KIA miễn phí tại đại lý TP.HCM. Trải nghiệm các dòng xe KIA mới nhất 2025-2026.",
};

const benefits = [
  "Lái thử miễn phí tại showroom hoặc tại nhà",
  "Nhân viên tư vấn chuyên nghiệp đồng hành",
  "Không áp lực mua hàng",
  "Trải nghiệm đầy đủ tính năng và công nghệ",
  "Tặng quà khi đến lái thử",
  "Nhận báo giá ưu đãi ngay sau buổi lái thử",
];

export default async function TestDrivePage() {
  const cars = await getCars();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-2">Đăng Ký Lái Thử</h1>
        <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-4" />
        <p className="text-gray-300 text-sm max-w-md mx-auto">
          Trải nghiệm cảm giác lái xe KIA hoàn toàn miễn phí – Không cam kết – Không áp lực
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Benefits */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Car className="text-[#BB162B]" size={32} />
            <h2 className="text-2xl font-black text-[#05141F]">Quyền lợi khi lái thử</h2>
          </div>
          <div className="space-y-3 mb-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <CheckCircle size={18} className="text-[#BB162B] mt-0.5 shrink-0" />
                <span className="text-sm text-[#05141F] font-medium">{b}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#BB162B] to-[#8B0000] rounded-2xl p-6 text-white text-center">
            <p className="text-sm mb-2 opacity-90">Hoặc gọi ngay để đặt lịch</p>
            <a href="tel:0931456204" className="flex items-center justify-center gap-2 text-2xl font-black">
              <Phone size={24} />
              0931.456.204
            </a>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-2xl font-black text-[#05141F] mb-6">Đăng ký ngay</h2>
          <QuoteForm cars={cars} page="test_drive" />
        </div>
      </div>
    </div>
  );
}
