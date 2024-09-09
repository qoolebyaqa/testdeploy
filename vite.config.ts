import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/testdeploy/',
  assetsInclude: ["**/*.jpg", "**/*.png"],
  server: {
    proxy: {
      "/api": {
        target: "https://api-staging-uzlombard.asgardia.team",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
