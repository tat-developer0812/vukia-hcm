import { config, collection, singleton, fields } from "@keystatic/core";

const slugPattern = {
  regex: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  message: "Chỉ dùng chữ thường, số và dấu gạch ngang. VD: kia-sonet-luxury",
};

const urlPattern = {
  regex: /^https?:\/\/.+/i,
  message: "Phải bắt đầu bằng http:// hoặc https://",
};

const phonePattern = {
  regex: /^[0-9+().\s-]{8,20}$/,
  message: "Chỉ chứa số, dấu + ( ) - và khoảng trắng (8-20 ký tự)",
};

const emailPattern = {
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Email không hợp lệ",
};

const BrandMark = ({ colorScheme }: { colorScheme: "light" | "dark" }) => {
  const bg = colorScheme === "dark" ? "#FFFFFF" : "#05141F";
  const fg = colorScheme === "dark" ? "#05141F" : "#FFFFFF";
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="18" fill={bg} />
      <path
        d="M24,18 L24,82 L38,82 L38,54 L64,82 L80,82 L50,48 L78,18 L62,18 L38,46 L38,18 Z"
        fill={fg}
      />
      <rect x="24" y="88" width="54" height="5" rx="2.5" fill="#BB162B" />
    </svg>
  );
};

export default config({
  storage: process.env.NEXT_PUBLIC_GITHUB_OWNER
    ? {
        kind: "github" as const,
        repo: {
          owner: process.env.NEXT_PUBLIC_GITHUB_OWNER,
          name: process.env.NEXT_PUBLIC_GITHUB_REPO!,
        },
      }
    : { kind: "local" as const },
  ui: {
    brand: { name: "KIA Gò Vấp Admin", mark: BrandMark },
    navigation: {
      "Xe cộ": ["cars"],
      "Marketing": ["promotions"],
      "Thông tin showroom": ["contact"],
    },
  },
  collections: {
    cars: collection({
      label: "Danh sách xe",
      slugField: "name",
      path: "src/content/cars/*",
      format: { data: "json" },
      columns: ["shortName", "category", "startPrice"],
      schema: {
        name: fields.slug({
          name: {
            label: "Tên xe",
            description: "Tên đầy đủ hiển thị trên web. VD: KIA Sonet Luxury",
            validation: { isRequired: true, length: { min: 2, max: 100 } },
          },
          slug: {
            label: "Slug URL",
            description: "Phần URL của xe (chữ thường, có dấu -). VD: kia-sonet",
            validation: { pattern: slugPattern, length: { min: 2, max: 80 } },
          },
        }),
        shortName: fields.text({
          label: "Tên ngắn",
          description: "Tên gọn dùng trong menu và card. VD: Sonet",
          validation: { isRequired: true, length: { min: 1, max: 40 } },
        }),
        category: fields.select({
          label: "Phân khúc",
          options: [
            { label: "SUV", value: "suv" },
            { label: "Sedan", value: "sedan" },
            { label: "MPV", value: "mpv" },
            { label: "Hatchback", value: "hatchback" },
          ],
          defaultValue: "suv",
        }),
        startPrice: fields.text({
          label: "Giá từ",
          description: "Định dạng: 480.000.000 đ",
          validation: { isRequired: true, length: { max: 30 } },
        }),
        downPayment: fields.text({
          label: "Trả trước",
          description: "Định dạng: 159.000.000 đ",
          validation: { isRequired: true, length: { max: 30 } },
        }),
        image: fields.text({
          label: "URL ảnh thumbnail",
          description: "URL ảnh card trong danh sách xe (ratio 4:3, >= 800px)",
          validation: { isRequired: true, pattern: urlPattern, length: { max: 500 } },
        }),
        heroImage: fields.text({
          label: "URL ảnh hero",
          description: "URL ảnh lớn đầu trang chi tiết (ratio 16:9, >= 1600px)",
          validation: { isRequired: true, pattern: urlPattern, length: { max: 500 } },
        }),
        description: fields.text({
          label: "Mô tả ngắn",
          description: "2-3 câu giới thiệu hiện dưới tên xe",
          multiline: true,
          validation: { isRequired: true, length: { min: 20, max: 400 } },
        }),
        variants: fields.array(
          fields.object({
            name: fields.text({
              label: "Phiên bản",
              validation: { isRequired: true, length: { max: 60 } },
            }),
            price: fields.text({
              label: "Giá",
              description: "VD: 599.000.000 đ",
              validation: { isRequired: true, length: { max: 30 } },
            }),
          }),
          {
            label: "Các phiên bản",
            itemLabel: (props) => props.fields.name.value || "Phiên bản mới",
          }
        ),
        specs: fields.object(
          {
            engine: fields.text({ label: "Động cơ", description: "VD: 1.5L MPI" }),
            power: fields.text({ label: "Công suất", description: "VD: 115 HP" }),
            torque: fields.text({ label: "Mô men xoắn", description: "VD: 144 Nm" }),
            transmission: fields.text({ label: "Hộp số", description: "VD: IVT / AT 6 cấp" }),
            seats: fields.text({ label: "Số chỗ", description: "VD: 5 chỗ" }),
            fuel: fields.text({ label: "Nhiên liệu", description: "VD: Xăng / Dầu" }),
          },
          { label: "Thông số kỹ thuật" }
        ),
      },
    }),
  },
  singletons: {
    promotions: singleton({
      label: "Khuyến mãi",
      path: "src/content/promotions",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.text({
            label: "Nội dung",
            validation: { isRequired: true, length: { min: 5, max: 200 } },
          }),
          {
            label: "Danh sách khuyến mãi",
            itemLabel: (props) => props.value || "Khuyến mãi mới",
          }
        ),
      },
    }),
    contact: singleton({
      label: "Thông tin liên hệ",
      path: "src/content/contact",
      format: { data: "json" },
      schema: {
        name: fields.text({
          label: "Tên showroom",
          description: "VD: KIA Gò Vấp",
          validation: { isRequired: true, length: { max: 60 } },
        }),
        fullName: fields.text({
          label: "Tên đầy đủ",
          description: "Tên pháp lý dài (VD: Showroom KIA Gò Vấp - Chi nhánh TP.HCM)",
          validation: { isRequired: true, length: { max: 120 } },
        }),
        address: fields.text({
          label: "Địa chỉ",
          validation: { isRequired: true, length: { max: 200 } },
        }),
        hotline: fields.text({
          label: "Hotline",
          description: "Số chính hiển thị nổi bật. VD: 0901 234 567",
          validation: { isRequired: true, pattern: phonePattern },
        }),
        phone: fields.text({
          label: "Điện thoại phụ",
          description: "Số phụ / cố định. VD: 028 7300 1234",
          validation: { pattern: phonePattern },
        }),
        email: fields.text({
          label: "Email",
          validation: { isRequired: true, pattern: emailPattern, length: { max: 100 } },
        }),
        hours: fields.text({
          label: "Giờ làm việc",
          description: "VD: 7:30 - 21:00 (Thứ 2 - Chủ Nhật)",
          validation: { isRequired: true, length: { max: 100 } },
        }),
        consultant: fields.text({
          label: "Tên tư vấn viên",
          description: "Hiện trên form báo giá",
          validation: { length: { max: 60 } },
        }),
        mapEmbed: fields.text({
          label: "Google Map Embed URL",
          description: "Copy từ Google Maps > Share > Embed a map (chỉ URL trong src=\"...\")",
          validation: { isRequired: true, pattern: urlPattern, length: { max: 1000 } },
        }),
      },
    }),
  },
});
