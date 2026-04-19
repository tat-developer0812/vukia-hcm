import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "kia-govap-admin",
  title: "KIA Gò Vấp Admin",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) =>
      prev.filter(
        (t) => t.schemaType !== "promotions" && t.schemaType !== "contact"
      ),
  },
  document: {
    actions: (prev, { schemaType }) =>
      ["promotions", "contact"].includes(schemaType)
        ? prev.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish")
        : prev,
  },
});
