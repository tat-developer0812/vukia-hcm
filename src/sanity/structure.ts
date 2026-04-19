import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Nội dung")
    .items([
      S.listItem()
        .title("Xe")
        .child(S.documentTypeList("car").title("Danh sách xe")),
      S.divider(),
      S.listItem()
        .title("Khuyến mãi")
        .child(
          S.editor()
            .id("promotions")
            .schemaType("promotions")
            .documentId("promotions")
        ),
      S.listItem()
        .title("Thông tin liên hệ")
        .child(
          S.editor()
            .id("contact")
            .schemaType("contact")
            .documentId("contact")
        ),
    ]);
