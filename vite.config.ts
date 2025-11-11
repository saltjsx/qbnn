import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/studio/, to: "/sanity.html" },
        { from: /^\/sanity/, to: "/sanity.html" },
        { from: /./, to: "/index.html" },
      ],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        studio: resolve(__dirname, "sanity.html"),
      },
    },
  },
});
