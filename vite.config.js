import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        element: resolve(__dirname, "src/index.js"),
        dom: resolve(__dirname, "src/dom/index.js"),
        echo: resolve(__dirname, "src/echo/index.js"),
        on: resolve(__dirname, "src/on/index.js"),
      },
      formats: ["cjs", "es"],
    },
    outDir: "dist",
  },
});
