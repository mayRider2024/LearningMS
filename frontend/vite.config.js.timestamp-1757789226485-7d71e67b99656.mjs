// vite.config.js
import { defineConfig } from "file:///C:/Users/HP/OneDrive/Desktop/learningms/frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/HP/OneDrive/Desktop/learningms/frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import frappeui from "file:///C:/Users/HP/OneDrive/Desktop/learningms/frontend/node_modules/frappe-ui/vite/index.js";
import { VitePWA } from "file:///C:/Users/HP/OneDrive/Desktop/learningms/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\HP\\OneDrive\\Desktop\\learningms\\frontend";
var vite_config_default = defineConfig({
  plugins: [
    frappeui({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
      frappeTypes: {
        input: {}
      },
      buildConfig: {
        indexHtmlPath: "../lms/www/lms.html"
      }
    }),
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      workbox: {
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      },
      manifest: {
        display: "standalone",
        name: "Learning",
        short_name: "Learning",
        start_url: "/lms",
        description: "Easy to use, 100% open source Learning Management System",
        theme_color: "#0f7159",
        background_color: "#ffffff",
        icons: [
          {
            src: "/assets/lms/frontend/manifest/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "/assets/lms/frontend/manifest/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          }
        ]
      }
    })
  ],
  server: {
    host: "0.0.0.0",
    // Accept connections from any network interface
    allowedHosts: ["ps", "fs", "home"]
    // Explicitly allow this host
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "tailwind.config.js": path.resolve(__vite_injected_original_dirname, "tailwind.config.js")
    }
  },
  optimizeDeps: {
    include: [
      "feather-icons",
      "showdown",
      "engine.io-client",
      "tailwind.config.js",
      "interactjs",
      "highlight.js",
      "plyr"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXGxlYXJuaW5nbXNcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEhQXFxcXE9uZURyaXZlXFxcXERlc2t0b3BcXFxcbGVhcm5pbmdtc1xcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvSFAvT25lRHJpdmUvRGVza3RvcC9sZWFybmluZ21zL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCBmcmFwcGV1aSBmcm9tICdmcmFwcGUtdWkvdml0ZSdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcblx0cGx1Z2luczogW1xyXG5cdFx0ZnJhcHBldWkoe1xyXG5cdFx0XHRmcmFwcGVQcm94eTogdHJ1ZSxcclxuXHRcdFx0bHVjaWRlSWNvbnM6IHRydWUsXHJcblx0XHRcdGppbmphQm9vdERhdGE6IHRydWUsXHJcblx0XHRcdGZyYXBwZVR5cGVzOiB7XHJcblx0XHRcdFx0aW5wdXQ6IHt9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRidWlsZENvbmZpZzoge1xyXG5cdFx0XHRcdGluZGV4SHRtbFBhdGg6ICcuLi9sbXMvd3d3L2xtcy5odG1sJyxcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cdFx0dnVlKHtcclxuXHRcdFx0c2NyaXB0OiB7XHJcblx0XHRcdFx0ZGVmaW5lTW9kZWw6IHRydWUsXHJcblx0XHRcdFx0cHJvcHNEZXN0cnVjdHVyZTogdHJ1ZSxcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cdFx0Vml0ZVBXQSh7XHJcblx0XHRcdHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG5cdFx0XHRkZXZPcHRpb25zOiB7XHJcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZSxcclxuXHRcdFx0fSxcclxuXHRcdFx0d29ya2JveDoge1xyXG5cdFx0XHRcdGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcclxuXHRcdFx0XHRtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogNSAqIDEwMjQgKiAxMDI0LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRtYW5pZmVzdDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuXHRcdFx0XHRuYW1lOiAnTGVhcm5pbmcnLFxyXG5cdFx0XHRcdHNob3J0X25hbWU6ICdMZWFybmluZycsXHJcblx0XHRcdFx0c3RhcnRfdXJsOiAnL2xtcycsXHJcblx0XHRcdFx0ZGVzY3JpcHRpb246XHJcblx0XHRcdFx0XHQnRWFzeSB0byB1c2UsIDEwMCUgb3BlbiBzb3VyY2UgTGVhcm5pbmcgTWFuYWdlbWVudCBTeXN0ZW0nLFxyXG5cdFx0XHRcdHRoZW1lX2NvbG9yOiAnIzBmNzE1OScsXHJcblx0XHRcdFx0YmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxyXG5cdFx0XHRcdGljb25zOiBbXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHNyYzogJy9hc3NldHMvbG1zL2Zyb250ZW5kL21hbmlmZXN0L21hbmlmZXN0LWljb24tMTkyLm1hc2thYmxlLnBuZycsXHJcblx0XHRcdFx0XHRcdHNpemVzOiAnMTkyeDE5MicsXHJcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxyXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiAnbWFza2FibGUgYW55JyxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHNyYzogJy9hc3NldHMvbG1zL2Zyb250ZW5kL21hbmlmZXN0L21hbmlmZXN0LWljb24tNTEyLm1hc2thYmxlLnBuZycsXHJcblx0XHRcdFx0XHRcdHNpemVzOiAnNTEyeDUxMicsXHJcblx0XHRcdFx0XHRcdHR5cGU6ICdpbWFnZS9wbmcnLFxyXG5cdFx0XHRcdFx0XHRwdXJwb3NlOiAnbWFza2FibGUgYW55JyxcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cdF0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRob3N0OiAnMC4wLjAuMCcsIC8vIEFjY2VwdCBjb25uZWN0aW9ucyBmcm9tIGFueSBuZXR3b3JrIGludGVyZmFjZVxyXG5cdFx0YWxsb3dlZEhvc3RzOiBbJ3BzJywgJ2ZzJywgJ2hvbWUnXSwgLy8gRXhwbGljaXRseSBhbGxvdyB0aGlzIGhvc3RcclxuXHR9LFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG5cdFx0XHQndGFpbHdpbmQuY29uZmlnLmpzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3RhaWx3aW5kLmNvbmZpZy5qcycpLFxyXG5cdFx0fSxcclxuXHR9LFxyXG5cdG9wdGltaXplRGVwczoge1xyXG5cdFx0aW5jbHVkZTogW1xyXG5cdFx0XHQnZmVhdGhlci1pY29ucycsXHJcblx0XHRcdCdzaG93ZG93bicsXHJcblx0XHRcdCdlbmdpbmUuaW8tY2xpZW50JyxcclxuXHRcdFx0J3RhaWx3aW5kLmNvbmZpZy5qcycsXHJcblx0XHRcdCdpbnRlcmFjdGpzJyxcclxuXHRcdFx0J2hpZ2hsaWdodC5qcycsXHJcblx0XHRcdCdwbHlyJyxcclxuXHRcdF0sXHJcblx0fSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVixTQUFTLG9CQUFvQjtBQUM3VyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sY0FBYztBQUNyQixTQUFTLGVBQWU7QUFKeEIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLE1BQ2IsZUFBZTtBQUFBLE1BQ2YsYUFBYTtBQUFBLFFBQ1osT0FBTyxDQUFDO0FBQUEsTUFDVDtBQUFBLE1BQ0EsYUFBYTtBQUFBLFFBQ1osZUFBZTtBQUFBLE1BQ2hCO0FBQUEsSUFDRCxDQUFDO0FBQUEsSUFDRCxJQUFJO0FBQUEsTUFDSCxRQUFRO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxNQUNuQjtBQUFBLElBQ0QsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ1AsY0FBYztBQUFBLE1BQ2QsWUFBWTtBQUFBLFFBQ1gsU0FBUztBQUFBLE1BQ1Y7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNSLHVCQUF1QjtBQUFBLFFBQ3ZCLCtCQUErQixJQUFJLE9BQU87QUFBQSxNQUMzQztBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1QsU0FBUztBQUFBLFFBQ1QsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osV0FBVztBQUFBLFFBQ1gsYUFDQztBQUFBLFFBQ0QsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsT0FBTztBQUFBLFVBQ047QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNWO0FBQUEsVUFDQTtBQUFBLFlBQ0MsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFlBQ04sU0FBUztBQUFBLFVBQ1Y7QUFBQSxRQUNEO0FBQUEsTUFDRDtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBQ04sY0FBYyxDQUFDLE1BQU0sTUFBTSxNQUFNO0FBQUE7QUFBQSxFQUNsQztBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLHNCQUFzQixLQUFLLFFBQVEsa0NBQVcsb0JBQW9CO0FBQUEsSUFDbkU7QUFBQSxFQUNEO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDYixTQUFTO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
