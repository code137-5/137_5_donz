import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  server: {
    port: 3000,
    host: true,
    open: "/",
  },
  build: {
    outDir: "build",
    rollupOptions: {
      output: {
        assetFileNames: (asset) => {
          const isCssFile = /\.css$/.test(asset.name);

          if (isCssFile) {
            return "static/css/[name].[hash].[ext]";
          }
          return "static/media/[name].[hash].[ext]";
        },
        chunkFileNames: "static/js/[name].[hash].chunk.js",
        entryFileNames: "static/js/[name].[hash].js",
      },
    },
    commonjsOptions: {
      include: [".yarn/**"],
    },
  },
  cacheDir: "./.vite",
  define: {
    global: "globalThis",
  },
});
