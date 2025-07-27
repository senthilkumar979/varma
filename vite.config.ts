/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import path from "path";
import { defineConfig } from "vite";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "@atoms": path.resolve(dirname, "./src/ui/atoms"),
      "@molecules": path.resolve(dirname, "./src/ui/molecules"),
      "@organisms": path.resolve(dirname, "./src/ui/organisms"),
      "@templates": path.resolve(dirname, "./src/ui/templates"),
      "@utils": path.resolve(dirname, "./src/utils"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/*.stories.*",
        "**/index.ts",
        "**/*.types.ts",
        "**/*.types.js",
        ".storybook/**/*",
        "src/types/**/*",
        "src/contexts/**/*.types.ts",
        "src/ui/**/*/index.ts",
        "src/ui/**/*/*.types.ts",
        "storybook-static/**/*",
        "dist/**/*",
      ],
    },
  },
});
