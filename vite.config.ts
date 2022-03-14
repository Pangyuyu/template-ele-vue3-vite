import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// const { path } = require("path");
import path from "path";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import styleImport from "vite-plugin-style-import";
export default defineConfig({
  base: "/", // 访问路径
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    ViteComponents({
      customComponentResolvers: [
        ElementPlusResolver(), // 官方插件提供
      ],
    }),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          },
        },
      ],
    }),
  ],
  server: {
    host: "localhost",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // 打包配置
    assetsDir: "./static", // 路径
    brotliSize: false, // 默认为 true
    sourcemap: false,
    rollupOptions: {
      input: {
        // 入口文件
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]'
      },
    },
    minify: "terser",
    terserOptions: {
      //打包后移除console和注释
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  clearScreen: true,
});
