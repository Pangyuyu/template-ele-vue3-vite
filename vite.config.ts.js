// vite.config.ts
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import styleImport from "vite-plugin-style-import";
var vite_config_default = defineConfig({
  base: process.env.ELECTRON == "true" ? "./" : "./",
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    ViteComponents({
      customComponentResolvers: [
        ElementPlusResolver()
      ]
    }),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          }
        }
      ]
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 3e3
  },
  resolve: {
    alias: {
      "@": path.resolve("C:\\Users\\xuan\\source\\template-ele-vue3-vite", "src")
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    assetsDir: "./static",
    brotliSize: false,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve("C:\\Users\\xuan\\source\\template-ele-vue3-vite", "index.html")
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        },
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]"
      }
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
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
            }
          }
        }
      ]
    }
  },
  clearScreen: true
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBPcHRpbWl6YXRpb25QZXJzaXN0IGZyb20gJ3ZpdGUtcGx1Z2luLW9wdGltaXplLXBlcnNpc3QnXG5pbXBvcnQgUGtnQ29uZmlnIGZyb20gJ3ZpdGUtcGx1Z2luLXBhY2thZ2UtY29uZmlnJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCBWaXRlQ29tcG9uZW50cywgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSBcInZpdGUtcGx1Z2luLWNvbXBvbmVudHNcIjtcbmltcG9ydCBzdHlsZUltcG9ydCBmcm9tIFwidml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0XCI7XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBwcm9jZXNzLmVudi5FTEVDVFJPTj09XCJ0cnVlXCIgPyAnLi8nIDogXCIuL1wiLFxuICBwbHVnaW5zOiBbXG4gICAgUGtnQ29uZmlnKCksXG4gICAgT3B0aW1pemF0aW9uUGVyc2lzdCgpLFxuICAgIHZ1ZSgpLFxuICAgIFZpdGVDb21wb25lbnRzKHtcbiAgICAgIGN1c3RvbUNvbXBvbmVudFJlc29sdmVyczogW1xuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksIC8vIFx1RkZGRFx1MDY3N1x1RkZGRFx1RkZGRFx1RkZGRFx1RkZGRFx1RkZGRFx1MUU2OVxuICAgICAgXSxcbiAgICB9KSxcbiAgICBzdHlsZUltcG9ydCh7XG4gICAgICBsaWJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBsaWJyYXJ5TmFtZTogXCJlbGVtZW50LXBsdXNcIixcbiAgICAgICAgICBlc01vZHVsZTogdHJ1ZSxcbiAgICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYGVsZW1lbnQtcGx1cy90aGVtZS1jaGFsay8ke25hbWV9LmNzc2A7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSksXG4gIF0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHBvcnQ6IDMwMDAsXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXHh1YW5cXFxcc291cmNlXFxcXHRlbXBsYXRlLWVsZS12dWUzLXZpdGVcIiwgXCJzcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsXG4gICAgYXNzZXRzRGlyOiBcIi4vc3RhdGljXCIsIC8vIFx1MDBCN1x1RkZGRFx1RkZGRFxuICAgIGJyb3RsaVNpemU6IGZhbHNlLCAvLyBcdTAxMkNcdUZGRkRcdUZGRkRcdTAzQUEgdHJ1ZVxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgLy8gXHVGRkZEXHVGRkZEXHVGRkZEXHVGRkZEXHUwMTNDXHVGRkZEXG4gICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXHh1YW5cXFxcc291cmNlXFxcXHRlbXBsYXRlLWVsZS12dWUzLXZpdGVcIiwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBpZFxuICAgICAgICAgICAgICAudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXG4gICAgICAgICAgICAgIC5zcGxpdChcIi9cIilbMF1cbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjaHVua0ZpbGVOYW1lczonanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOidqcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6J1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF0nXG4gICAgICB9LFxuICAgIH0sXG4gICAgbWluaWZ5OlwidGVyc2VyXCIsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgLy9cdUZGRkRcdUZGRkRcdUZGRkRcdUZGRkRcdUZGRkRcdUZGRkRcdTAxQjNcdUZGRkRjb25zb2xlXHVGRkZEXHVGRkZEXHUwNUUyXHVGRkZEXHVGRkZEXG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHBvc3Rjc3NQbHVnaW46IFwiaW50ZXJuYWw6Y2hhcnNldC1yZW1vdmFsXCIsXG4gICAgICAgICAgQXRSdWxlOiB7XG4gICAgICAgICAgICBjaGFyc2V0OiAoYXRSdWxlKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gXCJjaGFyc2V0XCIpIHtcbiAgICAgICAgICAgICAgICBhdFJ1bGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgY2xlYXJTY3JlZW46dHJ1ZSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksWUFBVSxTQUFTLE9BQU87QUFBQSxFQUM1QyxTQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYiwwQkFBMEI7QUFBQSxRQUN4QjtBQUFBO0FBQUE7QUFBQSxJQUdKLFlBQVk7QUFBQSxNQUNWLE1BQU07QUFBQSxRQUNKO0FBQUEsVUFDRSxhQUFhO0FBQUEsVUFDYixVQUFVO0FBQUEsVUFDVixjQUFjLENBQUMsU0FBUztBQUN0QixtQkFBTyw0QkFBNEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFNN0MsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsRUFFUixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxtREFBbUQ7QUFBQTtBQUFBO0FBQUEsRUFHekUsT0FBTztBQUFBLElBQ0wsdUJBQXVCO0FBQUEsSUFDdkIsV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBRUwsTUFBTSxLQUFLLFFBQVEsbURBQW1EO0FBQUE7QUFBQSxNQUV4RSxRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxpQkFBaUI7QUFDL0IsbUJBQU8sR0FDSixXQUNBLE1BQU0saUJBQWlCLEdBQ3ZCLE1BQU0sS0FBSyxHQUNYO0FBQUE7QUFBQTtBQUFBLFFBR1AsZ0JBQWU7QUFBQSxRQUNmLGdCQUFlO0FBQUEsUUFDZixnQkFBZTtBQUFBO0FBQUE7QUFBQSxJQUduQixRQUFPO0FBQUEsSUFDUCxlQUFlO0FBQUEsTUFFYixVQUFVO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFJckIsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLGVBQWU7QUFBQSxVQUNmLFFBQVE7QUFBQSxZQUNOLFNBQVMsQ0FBQyxXQUFXO0FBQ25CLGtCQUFJLE9BQU8sU0FBUyxXQUFXO0FBQzdCLHVCQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVFyQixhQUFZO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
