import { getContact } from "@/lib/data";

export const metadata = {
  title: "Chính Sách Bảo Mật – KIA Gò Vấp HCM",
  description: "Chính sách bảo mật thông tin khách hàng của Showroom Ô Tô KIA Gò Vấp - TP HCM.",
  alternates: { canonical: "https://www.kiagovaphcm.com/privacy-policy" },
};

export default async function PrivacyPolicyPage() {
  const contact = await getContact();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#05141F] to-[#0d2137] py-16 px-4 text-white text-center">
        <h1 className="text-4xl font-black mb-2">Chính Sách Bảo Mật</h1>
        <div className="w-14 h-1 bg-[#BB162B] mx-auto mt-3 mb-4" />
        <p className="text-gray-300 text-sm">Cam kết bảo vệ thông tin cá nhân của quý khách</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">1. Thu thập thông tin</h2>
          <p>
            Chúng tôi thu thập thông tin cá nhân (họ tên, số điện thoại, email) khi quý khách tự nguyện
            cung cấp qua form đăng ký tư vấn, đặt lịch lái thử hoặc liên hệ trực tiếp với showroom.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">2. Mục đích sử dụng</h2>
          <p>Thông tin thu thập được sử dụng để:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Tư vấn, báo giá xe KIA theo yêu cầu của quý khách</li>
            <li>Đặt lịch lái thử và giao xe</li>
            <li>Gửi thông tin khuyến mãi và chương trình ưu đãi (nếu quý khách đồng ý)</li>
            <li>Cải thiện chất lượng dịch vụ</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">3. Cookie và công cụ phân tích</h2>
          <p>
            Website sử dụng cookie và các công cụ phân tích của bên thứ ba — bao gồm{" "}
            <strong>Google Analytics 4</strong>, <strong>Vercel Analytics</strong> và hệ thống
            ghi nhận hành vi nội bộ — nhằm đo lường lượt truy cập, hiểu cách khách tương tác với
            trang (xem trang nào, bấm nút gọi/Zalo/báo giá) để cải thiện dịch vụ và đo hiệu quả
            quảng cáo.
          </p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              Dữ liệu hành vi được thu thập dưới dạng <strong>ẩn danh</strong> (theo mã thiết bị),
              không gắn với danh tính trừ khi quý khách tự nguyện để lại thông tin qua form.
            </li>
            <li>
              Chúng tôi có thể dùng dữ liệu này cho mục đích tiếp thị lại (remarketing) qua Google.
            </li>
            <li>
              Quý khách có thể từ chối cookie bằng cách điều chỉnh cài đặt trình duyệt hoặc dùng{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BB162B] font-bold"
              >
                tiện ích từ chối Google Analytics
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">4. Bảo mật thông tin</h2>
          <p>
            Chúng tôi cam kết không chia sẻ, bán hoặc cho thuê thông tin cá nhân của quý khách cho
            bên thứ ba khi chưa có sự đồng ý, ngoại trừ các trường hợp theo yêu cầu pháp lý.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">5. Quyền của khách hàng</h2>
          <p>
            Quý khách có quyền yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân bằng cách liên hệ
            trực tiếp với chúng tôi qua hotline{" "}
            <a href="tel:0931456204" className="text-[#BB162B] font-bold">
              {contact.hotline}
            </a>{" "}
            hoặc email{" "}
            <a href={`mailto:${contact.email}`} className="text-[#BB162B] font-bold">
              {contact.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-[#05141F] mb-3">6. Liên hệ</h2>
          <p>
            {contact.fullName}
            <br />
            Địa chỉ: {contact.address}
            <br />
            Hotline:{" "}
            <a href="tel:0931456204" className="text-[#BB162B] font-bold">
              {contact.hotline}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
