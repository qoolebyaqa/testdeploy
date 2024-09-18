import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.jpg", "**/*.png"],
  server: {
    proxy: {
      "/api": {
        target: "https://api-staging-uzlombard.asgardia.team",
        changeOrigin: true,
        secure: false,
      },
    }/* ,
    host: 'localhost',
    port: 8080 */
  },
});
