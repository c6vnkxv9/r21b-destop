import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // 對應 GitHub Pages 專案名稱，避免生產版資源以根路徑載入而 404
  base: "/r21b-destop/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 可在此注入全域變數或 mixins
        // additionalData: `@use "src/styles/variables" as *;`
      },
    },
  },
  server: {
    host: true,
  },
});
