import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import styleImport from "vite-plugin-style-import";
export default defineConfig({
  base: process.env.ELECTRON=="true" ? './' : "./",
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    ViteComponents({
      customComponentResolvers: [
        ElementPlusResolver(), // �ٷ�����ṩ
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
    host: "0.0.0.0",
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
    assetsDir: "./static", // ·��
    brotliSize: false, // Ĭ��Ϊ true
    sourcemap: false,
    rollupOptions: {
      input: {
        // ����ļ�
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
        chunkFileNames:'js/[name]-[hash].js',
        entryFileNames:'js/[name]-[hash].js',
        assetFileNames:'[ext]/[name]-[hash].[ext]'
      },
    },
    minify:"terser",
    terserOptions: {
      //������Ƴ�console��ע��
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
  clearScreen:true,
});
