import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // disable sourcemaps (causing source location errors)
    chunkSizeWarningLimit: 1000, // prevent chunk size warnings
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom"))
              return "vendor_react";
            if (id.includes("lodash")) return "vendor_lodash";
            return "vendor";
          }
        },
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true, // fixes mixed esm/cjs libs
    },
  },
  // optimizeDeps: {
  //   exclude: ["lottie-web"], // skip prebundling lottie to prevent eval warning
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    open: true,
  },
});
