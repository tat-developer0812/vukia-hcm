import { defineType, defineField } from "sanity";

export const promotions = defineType({
  name: "promotions",
  title: "Khuyến mãi",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Danh sách khuyến mãi",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Danh sách khuyến mãi" }),
  },
});
