// vite.config.ts
import OptimizationPersist from "vite-plugin-optimize-persist";
import PkgConfig from "vite-plugin-package-config";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";
import styleImport from "vite-plugin-style-import";
var vite_config_default = defineConfig({
  base: "./",
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
      "@": path.resolve("C:\\Users\\xuan\\Documents\\code_my\\template-ele-vue3-vite", "src")
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    assetsDir: "./static",
    brotliSize: false,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: path.resolve("C:\\Users\\xuan\\Documents\\code_my\\template-ele-vue3-vite", "index.html")
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBPcHRpbWl6YXRpb25QZXJzaXN0IGZyb20gJ3ZpdGUtcGx1Z2luLW9wdGltaXplLXBlcnNpc3QnXHJcbmltcG9ydCBQa2dDb25maWcgZnJvbSAndml0ZS1wbHVnaW4tcGFja2FnZS1jb25maWcnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG4vLyBjb25zdCB7IHBhdGggfSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgVml0ZUNvbXBvbmVudHMsIHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wb25lbnRzXCI7XHJcbmltcG9ydCBzdHlsZUltcG9ydCBmcm9tIFwidml0ZS1wbHVnaW4tc3R5bGUtaW1wb3J0XCI7XHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogXCIuL1wiLCAvLyBcdThCQkZcdTk1RUVcdThERUZcdTVGODRcclxuICBwbHVnaW5zOiBbXHJcbiAgICBQa2dDb25maWcoKSxcclxuICAgIE9wdGltaXphdGlvblBlcnNpc3QoKSxcclxuICAgIHZ1ZSgpLFxyXG4gICAgVml0ZUNvbXBvbmVudHMoe1xyXG4gICAgICBjdXN0b21Db21wb25lbnRSZXNvbHZlcnM6IFtcclxuICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksIC8vIFx1NUI5OFx1NjVCOVx1NjNEMlx1NEVGNlx1NjNEMFx1NEY5QlxyXG4gICAgICBdLFxyXG4gICAgfSksXHJcbiAgICBzdHlsZUltcG9ydCh7XHJcbiAgICAgIGxpYnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBsaWJyYXJ5TmFtZTogXCJlbGVtZW50LXBsdXNcIixcclxuICAgICAgICAgIGVzTW9kdWxlOiB0cnVlLFxyXG4gICAgICAgICAgcmVzb2x2ZVN0eWxlOiAobmFtZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYGVsZW1lbnQtcGx1cy90aGVtZS1jaGFsay8ke25hbWV9LmNzc2A7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCIwLjAuMC4wXCIsXHJcbiAgICBwb3J0OiAzMDAwLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShcIkM6XFxcXFVzZXJzXFxcXHh1YW5cXFxcRG9jdW1lbnRzXFxcXGNvZGVfbXlcXFxcdGVtcGxhdGUtZWxlLXZ1ZTMtdml0ZVwiLCBcInNyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG4gICAgLy8gXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXHJcbiAgICBhc3NldHNEaXI6IFwiLi9zdGF0aWNcIiwgLy8gXHU4REVGXHU1Rjg0XHJcbiAgICBicm90bGlTaXplOiBmYWxzZSwgLy8gXHU5RUQ4XHU4QkE0XHU0RTNBIHRydWVcclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgLy8gXHU1MTY1XHU1M0UzXHU2NTg3XHU0RUY2XHJcbiAgICAgICAgbWFpbjogcGF0aC5yZXNvbHZlKFwiQzpcXFxcVXNlcnNcXFxceHVhblxcXFxEb2N1bWVudHNcXFxcY29kZV9teVxcXFx0ZW1wbGF0ZS1lbGUtdnVlMy12aXRlXCIsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgfSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlkXHJcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgICAuc3BsaXQoXCJub2RlX21vZHVsZXMvXCIpWzFdXHJcbiAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVswXVxyXG4gICAgICAgICAgICAgIC50b1N0cmluZygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdqcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XSdcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBtaW5pZnk6IFwidGVyc2VyXCIsXHJcbiAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIC8vXHU2MjUzXHU1MzA1XHU1NDBFXHU3OUZCXHU5NjY0Y29uc29sZVx1NTQ4Q1x1NkNFOFx1OTFDQVxyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGNzczoge1xyXG4gICAgcG9zdGNzczoge1xyXG4gICAgICBwbHVnaW5zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcG9zdGNzc1BsdWdpbjogXCJpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWxcIixcclxuICAgICAgICAgIEF0UnVsZToge1xyXG4gICAgICAgICAgICBjaGFyc2V0OiAoYXRSdWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGF0UnVsZS5uYW1lID09PSBcImNoYXJzZXRcIikge1xyXG4gICAgICAgICAgICAgICAgYXRSdWxlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgXSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBjbGVhclNjcmVlbjogdHJ1ZSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLG9CQUFvQjtBQUFBLElBQ3BCLElBQUk7QUFBQSxJQUNKLGVBQWU7QUFBQSxNQUNiLDBCQUEwQjtBQUFBLFFBQ3hCLG9CQUFvQjtBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxZQUFZO0FBQUEsTUFDVixNQUFNO0FBQUEsUUFDSjtBQUFBLFVBQ0UsYUFBYTtBQUFBLFVBQ2IsVUFBVTtBQUFBLFVBQ1YsY0FBYyxDQUFDLFNBQVM7QUFDdEIsbUJBQU8sNEJBQTRCO0FBQUEsVUFDckM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSwrREFBK0QsS0FBSztBQUFBLElBQ3hGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsdUJBQXVCO0FBQUEsSUFFdkIsV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBRUwsTUFBTSxLQUFLLFFBQVEsK0RBQStELFlBQVk7QUFBQSxNQUNoRztBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPLEdBQ0osU0FBUyxFQUNULE1BQU0sZUFBZSxFQUFFLEdBQ3ZCLE1BQU0sR0FBRyxFQUFFLEdBQ1gsU0FBUztBQUFBLFVBQ2Q7QUFBQSxRQUNGO0FBQUEsUUFDQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUViLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUDtBQUFBLFVBQ0UsZUFBZTtBQUFBLFVBQ2YsUUFBUTtBQUFBLFlBQ04sU0FBUyxDQUFDLFdBQVc7QUFDbkIsa0JBQUksT0FBTyxTQUFTLFdBQVc7QUFDN0IsdUJBQU8sT0FBTztBQUFBLGNBQ2hCO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhO0FBQ2YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
