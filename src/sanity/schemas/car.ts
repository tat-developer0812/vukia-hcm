import { defineType, defineField } from "sanity";

export const car = defineType({
  name: "car",
  title: "Xe",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tên xe",
      type: "string",
      description: "Tên đầy đủ. VD: New KIA Sonet",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "shortName",
      title: "Tên ngắn",
      type: "string",
      description: "Tên gọn trong menu. VD: Sonet",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "slug",
      title: "Slug URL",
      type: "slug",
      description: "Phần URL của xe. Nhấn Generate để tạo từ tên xe.",
      options: { source: "name", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Phân khúc",
      type: "string",
      options: {
        list: [
          { title: "SUV", value: "suv" },
          { title: "Sedan", value: "sedan" },
          { title: "MPV", value: "mpv" },
          { title: "Hatchback", value: "hatchback" },
        ],
        layout: "radio",
      },
      initialValue: "suv",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startPrice",
      title: "Giá từ",
      type: "string",
      description: "VD: 480.000.000 đ",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "downPayment",
      title: "Trả trước",
      type: "string",
      description: "VD: 159.000.000 đ",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "image",
      title: "URL ảnh thumbnail",
      type: "url",
      description: "Ảnh card trong danh sách (ratio 4:3, >= 800px)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "URL ảnh hero",
      type: "url",
      description: "Ảnh lớn đầu trang chi tiết (ratio 16:9, >= 1600px)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Mô tả ngắn",
      type: "text",
      rows: 3,
      description: "2-3 câu giới thiệu",
      validation: (Rule) => Rule.required().min(20).max(400),
    }),
    defineField({
      name: "variants",
      title: "Các phiên bản",
      type: "array",
      of: [
        {
          type: "object",
          name: "variant",
          fields: [
            { name: "name", title: "Tên phiên bản", type: "string", validation: (R) => R.required() },
            { name: "price", title: "Giá", type: "string", validation: (R) => R.required() },
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
    }),
    defineField({
      name: "specs",
      title: "Thông số kỹ thuật",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        { name: "engine", title: "Động cơ", type: "string" },
        { name: "power", title: "Công suất", type: "string" },
        { name: "torque", title: "Mô men xoắn", type: "string" },
        { name: "transmission", title: "Hộp số", type: "string" },
        { name: "seats", title: "Số chỗ", type: "string" },
        { name: "fuel", title: "Nhiên liệu", type: "string" },
      ],
    }),
    defineField({
      name: "order",
      title: "Thứ tự hiển thị",
      type: "number",
      description: "Số càng nhỏ càng hiện trước (mặc định 100)",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "shortName", subtitle: "startPrice", media: "image" },
  },
  orderings: [
    { title: "Thứ tự tuỳ chỉnh", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Tên A-Z", name: "nameAsc", by: [{ field: "shortName", direction: "asc" }] },
  ],
});
