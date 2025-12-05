import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
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
