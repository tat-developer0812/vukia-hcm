# BÁO CÁO DỰ ÁN
## Website Đại Lý KIA Gò Vấp – TP.HCM

---

**Đơn vị thực hiện:** Bộ phận Kinh doanh / Digital
**Ngày báo cáo:** 20/04/2026
**Phiên bản:** 1.0
**Địa chỉ website:** [www.kiagovaphcm.com](https://www.kiagovaphcm.com)

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Mục tiêu

Website được xây dựng nhằm phục vụ ba mục tiêu cốt lõi:

1. **Tạo leads bán hàng** – Thu thập thông tin khách hàng tiềm năng quan tâm đến các dòng xe KIA tại TP.HCM thông qua form báo giá, đăng ký lái thử và tư vấn trả góp.
2. **Cung cấp thông tin sản phẩm** – Trình bày đầy đủ thông số kỹ thuật, bảng giá, phiên bản và chương trình khuyến mãi theo từng dòng xe.
3. **Xây dựng kênh liên hệ đa điểm** – Cho phép khách hàng kết nối với showroom qua điện thoại, Zalo, email và Google Maps theo cách nhanh nhất.

### 1.2 Đối tượng khách hàng

- Người dân TP.HCM và các tỉnh lân cận có nhu cầu mua xe KIA chính hãng.
- Khách hàng so sánh giá và thông số giữa các dòng xe SUV, MPV, hatchback.
- Người quan tâm đến chính sách trả góp và hỗ trợ tài chính.

### 1.3 Vị trí thương hiệu

> Đại lý KIA chính hãng duy nhất tại Quận Gò Vấp – phục vụ toàn khu vực TP.HCM.
> Địa chỉ: 189 Nguyễn Oanh, Phường 10, Quận Gò Vấp, TP.HCM.
> Hotline: **0931.456.204** · Giờ làm việc: **07:30 – 21:00, Thứ 2 – Chủ Nhật**.

---

## 2. NỀN TẢNG CÔNG NGHỆ

### 2.1 Lý do lựa chọn công nghệ

| Tiêu chí | Giải pháp áp dụng | Lý do |
|---|---|---|
| Tốc độ tải trang | Next.js 16 (SSG + ISR) | Trang được tạo sẵn, tải gần như tức thì |
| Quản lý nội dung | Sanity CMS | Không cần lập trình khi cập nhật giá, khuyến mãi |
| Hosting | Vercel | Tự động deploy, CDN toàn cầu, tích hợp analytics |
| Chi phí vận hành | Vercel Free + Sanity Free tier | Phù hợp quy mô hiện tại, không phát sinh server cost |

### 2.2 Kiến trúc hệ thống

```
┌──────────────────────┐
│  Sanity Studio       │  ← Ban kinh doanh cập nhật giá, xe, khuyến mãi
│  (Quản lý nội dung)  │
└──────────┬───────────┘
           │ API (GROQ)
           ↓
┌──────────────────────┐
│  Next.js Website     │  ← Trang web công khai
│  (kiagovaphcm.com)   │
└──────────┬───────────┘
           │
     ┌─────┴──────┐
     ↓            ↓
┌─────────┐  ┌──────────────┐
│  Vercel │  │ Vercel       │
│Analytics│  │Speed Insights│
└─────────┘  └──────────────┘
```

**Điểm nổi bật:** Nội dung (giá xe, khuyến mãi, thông tin liên hệ) được chỉnh sửa trực tiếp trên Sanity Studio mà không cần can thiệp kỹ thuật. Thay đổi cập nhật lên website trong vòng **60 giây**.

### 2.3 Stack kỹ thuật chi tiết

| Thành phần | Công nghệ | Phiên bản |
|---|---|---|
| Framework | Next.js | 16.2.4 |
| Ngôn ngữ | TypeScript | 5.x |
| Giao diện | Tailwind CSS | 4.x |
| Headless CMS | Sanity.io | v5 |
| Hosting | Vercel | — |
| Analytics | Vercel Analytics | v2 |
| Hiệu năng | Vercel Speed Insights | v2 |
| Icons | Lucide React | v1.8 |
| Slider | Swiper.js | v12 |

---

## 3. CÁC TRANG VÀ TÍNH NĂNG

### 3.1 Sơ đồ trang

| URL | Tên trang | Chức năng |
|---|---|---|
| `/` | Trang chủ | Hero slider, danh sách xe, khuyến mãi, form báo giá |
| `/new-kia-seltos` (và các slug xe) | Chi tiết xe | Thông số, bảng giá phiên bản, form báo giá |
| `/dang-ky-lai-thu-xe-kia` | Đăng ký lái thử | Thông tin quyền lợi, form đặt lịch |
| `/thu-tuc-tra-gop-xe-kia` | Thủ tục trả góp | 4 bước vay vốn, giấy tờ cần thiết, form tư vấn |
| `/lien-he-kia-ho-chi-minh` | Liên hệ | Thông tin đầy đủ, Google Maps, form liên hệ |
| `/privacy-policy` | Chính sách bảo mật | Cam kết bảo vệ dữ liệu khách hàng |
| `/studio` | Sanity Admin | Trang quản trị nội dung (nội bộ) |

### 3.2 Tính năng nổi bật

#### Hero Slider – Giới thiệu xe chủ lực
- Tự động chuyển ảnh 4 dòng xe nổi bật: **Carnival, Sorento, Seltos, Sportage**.
- Mỗi slide có nút **"Báo giá"** và **"Xem chi tiết"** dẫn trực tiếp đến trang sản phẩm.

#### Trang chi tiết xe – Đầy đủ thông tin mua xe
- Ảnh hero chất lượng cao, tên xe, giá khởi điểm, badge phân khúc.
- Bảng thông số kỹ thuật: động cơ, công suất, mô-men xoắn, hộp số, số chỗ, nhiên liệu.
- Bảng giá từng phiên bản (VD: Luxury, Signature, GT-Line...).
- Khuyến mãi tháng hiện hành.
- Sidebar cố định với form báo giá và các xe liên quan.

#### Form báo giá – Điểm chuyển đổi chính
- Thu thập: họ tên, số điện thoại, dòng xe quan tâm, ghi chú.
- Xuất hiện ở **5 vị trí** trên website: trang chủ, chi tiết xe, lái thử, trả góp, liên hệ.
- Sau khi gửi thành công: hiện thông báo xác nhận và kết nối tư vấn viên.

#### Modal Báo giá nhanh
- Nút **"Báo giá ngay"** trên Header có thể mở modal từ bất kỳ trang nào.
- Tự động điền sẵn dòng xe nếu khách đang xem trang chi tiết xe.

#### Nút liên hệ cố định (Floating)
- Luôn hiển thị ở góc phải màn hình:
  - **Zalo** – mở ứng dụng chat trực tiếp.
  - **Gọi điện** – kết nối hotline 0931.456.204 ngay lập tức.

### 3.3 Dòng xe hiện có trên website

| Dòng xe | Phân khúc | Giá khởi điểm |
|---|---|---|
| KIA Seltos | Crossover 5 chỗ | Từ ~599 triệu |
| KIA Sonet | Hatchback 5 chỗ | Từ ~499 triệu |
| KIA Carens | MPV 7 chỗ | Từ ~699 triệu |
| KIA Sportage | SUV 5 chỗ | Từ ~899 triệu |
| KIA Sorento | SUV 7 chỗ | Từ ~1.099 tỷ |
| KIA Carnival | MPV hạng sang 8 chỗ | Từ ~1.399 tỷ |

*(Giá hiển thị trên website, cập nhật qua Sanity CMS)*

---

## 4. QUẢN LÝ NỘI DUNG (CMS)

### 4.1 Sanity Studio – Công cụ quản trị

Nhân viên kinh doanh/marketing có thể đăng nhập vào **`kiagovaphcm.com/studio`** để:

| Thao tác | Nội dung có thể chỉnh |
|---|---|
| Thêm / sửa xe | Tên, giá, ảnh, thông số, phiên bản, mô tả |
| Cập nhật khuyến mãi | Danh sách ưu đãi tháng hiện hành |
| Thay đổi thông tin liên hệ | Hotline, địa chỉ, email, giờ làm việc, Google Maps |
| Thay đổi tư vấn viên | Tên hiển thị trong thông báo sau khi khách gửi form |

### 4.2 Quy trình cập nhật nội dung

```
Nhân viên sửa trên Sanity Studio
        ↓
Lưu nội dung lên Sanity Cloud
        ↓
Website tự động cập nhật sau 60 giây
        ↓
Khách hàng thấy nội dung mới (không cần deploy lại)
```

**Không cần** nhờ kỹ thuật can thiệp khi thay đổi: giá xe, nội dung khuyến mãi, thông tin liên hệ, ảnh sản phẩm.

---

## 5. SEO VÀ HIỆN DIỆN TRỰC TUYẾN

### 5.1 Tối ưu tìm kiếm Google

| Yếu tố SEO | Trạng thái |
|---|---|
| Tiêu đề trang tối ưu từ khóa | Có – mỗi trang có title riêng |
| Mô tả meta | Có – chứa từ khóa chính + hotline |
| URL thân thiện (slug tiếng Việt) | Có – VD: `/dang-ky-lai-thu-xe-kia` |
| Sitemap tự động | Có – `/sitemap.xml` |
| Robots.txt | Có – cho phép crawl toàn bộ |
| Dữ liệu cấu trúc Schema.org | Có – AutoDealer với địa chỉ, điện thoại, giờ mở cửa |
| Canonical URL | Có – tránh trùng lặp nội dung |
| Open Graph (chia sẻ mạng xã hội) | Có – ảnh, tiêu đề, mô tả cho Facebook/Zalo |

### 5.2 Từ khóa mục tiêu

- **Chính:** "KIA Gò Vấp", "đại lý KIA HCM", "mua xe KIA HCM"
- **Phụ:** "KIA Seltos HCM", "KIA Sonet giá bao nhiêu", "trả góp xe KIA"
- **Địa phương:** "showroom xe KIA Gò Vấp", "KIA Quận Gò Vấp"

### 5.3 Bảo mật website

Website được cấu hình các header bảo mật theo chuẩn:

- **HSTS** (2 năm) – bảo vệ kết nối HTTPS.
- **CSP** – kiểm soát nguồn tài nguyên tải vào trang.
- **X-Frame-Options** – chống nhúng trang giả mạo.
- **Permissions-Policy** – vô hiệu hóa camera/microphone/geolocation không cần thiết.

---

## 6. ĐO LƯỜNG VÀ PHÂN TÍCH HÀNH VI NGƯỜI DÙNG

### 6.1 Hệ thống tracking

Website tích hợp **Vercel Analytics** và **Vercel Speed Insights** – hai công cụ phân tích chính thức của nền tảng hosting Vercel.

**Dữ liệu tự động thu thập:**
- Số lượt truy cập (page views) theo ngày/tuần/tháng.
- Số người dùng duy nhất (unique visitors).
- Trang được xem nhiều nhất.
- Thiết bị sử dụng (mobile/desktop/tablet).
- Quốc gia/khu vực người dùng.
- Core Web Vitals (tốc độ tải trang thực tế).

### 6.2 Sự kiện tùy chỉnh (Custom Events)

Ngoài page views, website đang track 6 hành động quan trọng:

| Sự kiện | Ý nghĩa | Dữ liệu kèm theo |
|---|---|---|
| `quote_form_submit` | Khách gửi form báo giá | Dòng xe, trang gửi từ đâu |
| `quote_modal_open` | Khách mở popup báo giá nhanh | Dòng xe, điểm kích hoạt |
| `phone_click` | Khách bấm vào số điện thoại | Vị trí nút (header/form/floating) |
| `zalo_click` | Khách bấm nút Zalo | — |
| `hero_quote_click` | Khách bấm "Báo giá" trên banner | Dòng xe, vị trí slide |
| `car_detail_view` | Khách xem trang chi tiết một xe | Tên dòng xe |

### 6.3 Cách sử dụng dữ liệu

**Dashboard xem tại:** Vercel Dashboard → Project → Analytics

**Câu hỏi có thể trả lời:**
- Dòng xe nào được xem nhiều nhất? → `car_detail_view` theo slug.
- Bao nhiêu người thực sự gửi form? → `quote_form_submit`.
- Kênh liên hệ nào phổ biến hơn: điện thoại hay Zalo? → So sánh `phone_click` vs `zalo_click`.
- Banner hero slide nào kéo được nhiều báo giá nhất? → `hero_quote_click` theo `slide_index`.
- Tỷ lệ chuyển đổi: bao nhiêu người xem xe → gửi form? → `car_detail_view` / `quote_form_submit`.

---

## 7. TÍCH HỢP KÊNH LIÊN HỆ

| Kênh | Tích hợp | Vị trí trên website |
|---|---|---|
| **Điện thoại** | `tel:0931456204` (click-to-call) | Header, floating button, trong form, footer |
| **Zalo** | `zalo.me/0931456204` | Floating button, trang liên hệ, footer |
| **Email** | `mailto:` | Trang liên hệ, footer |
| **Google Maps** | Embedded iframe + link chỉ đường | Trang liên hệ |
| **Form liên hệ** | Kết nối tư vấn viên (Vũ) | 5 trang khác nhau |

---

## 8. HIỆU NĂNG VÀ TỐC ĐỘ

### 8.1 Chiến lược tối ưu tốc độ

| Kỹ thuật | Mô tả |
|---|---|
| **Static Site Generation (SSG)** | Trang chi tiết xe được tạo sẵn khi deploy, tải cực nhanh |
| **Incremental Static Regeneration (ISR)** | Nội dung tự cập nhật mỗi 60 giây, không cần rebuild |
| **CDN toàn cầu (Vercel Edge)** | File tĩnh phục vụ từ server gần người dùng nhất |
| **Lazy loading** | Google Maps chỉ tải khi cần, không làm nặng trang chủ |

### 8.2 Core Web Vitals mục tiêu

| Chỉ số | Mục tiêu | Ý nghĩa |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5 giây | Thời gian hiển thị nội dung chính |
| CLS (Cumulative Layout Shift) | < 0.1 | Trang không bị nhảy layout khi tải |
| FID / INP | < 100ms | Phản hồi khi người dùng tương tác |

---

## 9. VẬN HÀNH VÀ BẢO TRÌ

### 9.1 Quy trình deploy

```
Thay đổi code → Push lên GitHub
      ↓
Vercel tự động build và deploy (~ 2–3 phút)
      ↓
Website mới lên sóng tự động
```

### 9.2 Chi phí vận hành hiện tại

#### Gói đang sử dụng (Tháng 04/2026)

| Dịch vụ | Gói | Chi phí/tháng | Ghi chú |
|---|---|---|---|
| Vercel Hosting | Hobby (Free) | $0 | Giới hạn 100GB bandwidth/tháng |
| Sanity CMS | Free tier | $0 | Tối đa 3 user, 500K API calls/tháng |
| Domain `kiagovaphcm.com` | Gia hạn năm | ~$1.5 (~37.000đ) | Quy theo tháng (~$18/năm) |
| **Tổng hiện tại** | | **~$1.5/tháng** | **~37.000đ/tháng** |

> **Lưu ý:** Gói Free của Vercel không hỗ trợ custom domain SSL tự động trên một số cấu hình và giới hạn 1 thành viên trong team. Phù hợp giai đoạn hiện tại khi traffic còn thấp.

---

### 9.3 Dự tính chi phí khi nâng cấp

Khi traffic tăng hoặc cần thêm tính năng nâng cao, đề xuất nâng cấp theo 2 giai đoạn:

#### Giai đoạn 1 – Nâng cấp cơ bản (Khi traffic > 10.000 lượt/tháng)

| Dịch vụ | Gói nâng cấp | Chi phí/tháng | Lý do nâng cấp |
|---|---|---|---|
| Vercel Hosting | Pro | $20 (~500.000đ) | Băng thông không giới hạn, hỗ trợ team nhiều người, analytics nâng cao |
| Sanity CMS | Growth | $15 (~375.000đ) | Thêm thành viên quản trị, tăng giới hạn API calls, lịch sử thay đổi nội dung |
| Domain | Giữ nguyên | ~$1.5 (~37.000đ) | — |
| **Tổng giai đoạn 1** | | **~$36.5/tháng** | **~912.000đ/tháng** |

#### Giai đoạn 2 – Nâng cấp đầy đủ (Khi tích hợp CRM, email marketing, chatbot)

| Dịch vụ | Gói | Chi phí/tháng | Mục đích |
|---|---|---|---|
| Vercel Hosting | Pro | $20 (~500.000đ) | Hosting chính |
| Sanity CMS | Growth | $15 (~375.000đ) | Quản lý nội dung |
| Google Analytics 4 | Free | $0 | Phân tích chuyên sâu hành vi |
| CRM (VD: HubSpot Free / Getfly) | Free → Paid | $0 – $50 (~0 – 1.250.000đ) | Quản lý leads từ form |
| Email Marketing (VD: Brevo/Mailchimp) | Free → Starter | $0 – $10 (~0 – 250.000đ) | Remarketing khách tiềm năng |
| Zalo OA Official Account | Miễn phí | $0 | Chatbot tự động, broadcast |
| Domain | Giữ nguyên | ~$1.5 (~37.000đ) | — |
| **Tổng giai đoạn 2** | | **~$36.5 – $96.5/tháng** | **~912.000đ – 2.412.000đ/tháng** |

#### Tổng hợp lộ trình chi phí

```
Hiện tại          Giai đoạn 1           Giai đoạn 2
(< 10K lượt/th)   (10K–50K lượt/th)     (> 50K lượt/th + CRM)

~37.000đ/th  →   ~912.000đ/th      →   ~912.000đ – 2.412.000đ/th
    │                  │                         │
 Đủ dùng          Chuyên nghiệp          Hệ thống bán hàng đầy đủ
```

> **Tỷ giá tham khảo:** 1 USD ≈ 25.000 VNĐ (tháng 04/2026)

### 9.3 Những việc cần làm định kỳ

| Tần suất | Việc cần làm | Phụ trách |
|---|---|---|
| Hàng tháng | Cập nhật khuyến mãi trên Sanity | Kinh doanh |
| Khi có xe mới | Thêm xe vào Sanity, upload ảnh | Kinh doanh + Kỹ thuật |
| Khi đổi giá | Sửa giá trên Sanity Studio | Kinh doanh |
| Hàng tháng | Xem báo cáo Analytics trên Vercel | Quản lý |
| Hàng năm | Gia hạn domain | Kỹ thuật |

---

## 10. ĐỊNH HƯỚNG PHÁT TRIỂN TIẾP THEO

| Hạng mục | Mô tả | Ưu tiên |
|---|---|---|
| **Form kết nối CRM** | Leads từ website tự động vào hệ thống quản lý khách hàng | Cao |
| **Chat bot Zalo OA** | Tự động trả lời câu hỏi cơ bản qua Zalo | Trung bình |
| **Tích hợp Google Analytics 4** | Phân tích sâu hơn hành vi người dùng | Cao |
| **Blog / Tin tức xe** | Tăng traffic SEO với bài viết về xe KIA | Trung bình |
| **Trang so sánh xe** | Cho phép khách so sánh 2–3 dòng xe cùng lúc | Thấp |
| **Đặt lịch xem xe online** | Tích hợp lịch hẹn với hệ thống showroom | Cao |

---

## PHỤ LỤC

### A. Thông tin kỹ thuật tóm tắt

```
Repository:      D:/Personal/sale/kia-hcm/web
Framework:       Next.js 16.2.4 (App Router)
Ngôn ngữ:        TypeScript 5
CSS:             Tailwind CSS 4
CMS:             Sanity.io v5
Hosting:         Vercel
Analytics:       Vercel Analytics + Speed Insights
Domain:          kiagovaphcm.com
Sanity Studio:   kiagovaphcm.com/studio
```

### B. Biến môi trường cần thiết (Production)

```
NEXT_PUBLIC_SANITY_PROJECT_ID   = [ID dự án Sanity]
NEXT_PUBLIC_SANITY_DATASET      = production
NEXT_PUBLIC_SANITY_API_VERSION  = 2024-10-01
```

### C. Liên hệ kỹ thuật

Mọi thắc mắc kỹ thuật liên quan đến website, vui lòng liên hệ:
**Email:** dev@lastclarity.com

---

*Tài liệu này được tạo ngày 20/04/2026. Mọi thay đổi lớn về kiến trúc hoặc tính năng cần cập nhật tài liệu tương ứng.*
