// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/CodeManagementPanel/", // ← این خط خیلی مهم است
  plugins: [react()],
});
