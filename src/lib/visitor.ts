// ID ẩn danh, bền theo trình duyệt — dùng để nối các hành động của cùng một khách.
// KHÔNG chứa thông tin định danh; chỉ là một UUID ngẫu nhiên lưu trong localStorage.
const KEY = "kia_vid";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    // localStorage bị chặn (chế độ riêng tư...) → bỏ qua, không phá UX
    return "";
  }
}
