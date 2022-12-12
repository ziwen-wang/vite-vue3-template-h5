import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pxtovw from "postcss-px-to-viewport";
import postConfig from "./postcss.config.js";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [pxtovw(postConfig)],
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          // elementPlus: ['element-plus'],
          vue: ["vue"],
          vueRouter: ["vue-router"],
        },
      },
    },
  },
});
