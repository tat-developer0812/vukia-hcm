import { defineType, defineField } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Thông tin liên hệ",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên showroom",
      type: "string",
      description: "VD: KIA Gò Vấp",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "fullName",
      title: "Tên đầy đủ",
      type: "string",
      description: "Tên pháp lý dài",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "address",
      title: "Địa chỉ",
      type: "string",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "hotline",
      title: "Hotline",
      type: "string",
      description: "Số chính hiển thị nổi bật",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Điện thoại phụ",
      type: "string",
      description: "Số phụ / cố định (tuỳ chọn)",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: "email", invert: false }),
    }),
    defineField({
      name: "hours",
      title: "Giờ làm việc",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "consultant",
      title: "Tên tư vấn viên",
      type: "string",
      description: "Hiện trên form báo giá",
    }),
    defineField({
      name: "mapEmbed",
      title: "Google Map Embed URL",
      type: "url",
      description: "Dán URL từ Google Maps > Share > Embed map (chỉ URL trong src=\"\")",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Thông tin liên hệ" }),
  },
});
