import { config, collection, singleton, fields } from "@keystatic/core";

export default config({
  storage: process.env.NEXT_PUBLIC_GITHUB_OWNER
    ? { kind: "github" as const, repo: { owner: process.env.NEXT_PUBLIC_GITHUB_OWNER, name: process.env.NEXT_PUBLIC_GITHUB_REPO! } }
    : { kind: "local" as const },
  ui: {
    brand: { name: "KIA Gò Vấp Admin" },
  },
  collections: {
    cars: collection({
      label: "Danh sách xe",
      slugField: "name",
      path: "src/content/cars/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Tên xe" } }),
        shortName: fields.text({ label: "Tên ngắn" }),
        startPrice: fields.text({ label: "Giá từ", description: "VD: 480.000.000 đ" }),
        downPayment: fields.text({ label: "Trả trước", description: "VD: 159.000.000 đ" }),
        image: fields.text({ label: "URL ảnh thumbnail" }),
        heroImage: fields.text({ label: "URL ảnh hero" }),
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
        description: fields.text({ label: "Mô tả ngắn", multiline: true }),
        variants: fields.array(
          fields.object({
            name: fields.text({ label: "Phiên bản" }),
            price: fields.text({ label: "Giá" }),
          }),
          {
            label: "Các phiên bản",
            itemLabel: (props) => props.fields.name.value || "Phiên bản mới",
          }
        ),
        specs: fields.object(
          {
            engine: fields.text({ label: "Động cơ" }),
            power: fields.text({ label: "Công suất" }),
            torque: fields.text({ label: "Mô men xoắn" }),
            transmission: fields.text({ label: "Hộp số" }),
            seats: fields.text({ label: "Số chỗ" }),
            fuel: fields.text({ label: "Nhiên liệu" }),
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
        items: fields.array(fields.text({ label: "Nội dung" }), {
          label: "Danh sách khuyến mãi",
          itemLabel: (props) => props.value || "Khuyến mãi mới",
        }),
      },
    }),
    contact: singleton({
      label: "Thông tin liên hệ",
      path: "src/content/contact",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Tên showroom" }),
        fullName: fields.text({ label: "Tên đầy đủ" }),
        address: fields.text({ label: "Địa chỉ" }),
        hotline: fields.text({ label: "Hotline" }),
        phone: fields.text({ label: "Điện thoại" }),
        email: fields.text({ label: "Email" }),
        hours: fields.text({ label: "Giờ làm việc" }),
        consultant: fields.text({ label: "Tên tư vấn viên" }),
        mapEmbed: fields.text({ label: "Google Map Embed URL" }),
      },
    }),
  },
});
