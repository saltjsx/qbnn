import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "QBNN News",

  projectId: "v48ogfaf",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
