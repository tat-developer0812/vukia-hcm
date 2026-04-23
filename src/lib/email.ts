import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface LeadEmailData {
  name: string;
  phone: string;
  email?: string;
  car?: string;
  note?: string;
  page?: string;
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) throw new Error("NOTIFY_EMAIL not set");

  const carLabel = lead.car || "Chưa chọn";
  const pageLabel: Record<string, string> = {
    homepage: "Trang chủ",
    contact: "Liên hệ",
    test_drive: "Đăng ký lái thử",
    financing: "Trả góp",
    car_detail: "Chi tiết xe",
  };

  await resend.emails.send({
    from: "KIA HCM <noreply@kiagovaphcm.com>",
    to,
    subject: `[Lead mới] ${lead.name} – ${carLabel}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#BB162B;padding:20px;text-align:center">
          <h1 style="color:white;margin:0;font-size:20px">Khách hàng mới – KIA Gò Vấp</h1>
        </div>
        <div style="padding:24px;border:1px solid #eee">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#666;width:120px">Họ tên</td><td style="padding:8px 0;font-weight:bold">${lead.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Điện thoại</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            ${lead.email ? `<tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0">${lead.email}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666">Quan tâm</td><td style="padding:8px 0">${carLabel}</td></tr>
            ${lead.note ? `<tr><td style="padding:8px 0;color:#666">Ghi chú</td><td style="padding:8px 0">${lead.note}</td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#666">Nguồn</td><td style="padding:8px 0">${pageLabel[lead.page ?? ""] ?? lead.page ?? "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#666">Thời gian</td><td style="padding:8px 0">${new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}</td></tr>
          </table>
          <div style="margin-top:20px;text-align:center">
            <a href="tel:${lead.phone}" style="display:inline-block;background:#BB162B;color:white;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:bold">
              Gọi ngay ${lead.phone}
            </a>
          </div>
        </div>
        <p style="color:#999;font-size:12px;text-align:center;padding:16px">KIA Gò Vấp HCM • 0931.456.204</p>
      </div>
    `,
  });
}
