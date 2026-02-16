import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Exposes the server on your local network
    port: 3000, // Optional: Specify a port if needed
  },
  plugins: [react(), imagetools()],
});
