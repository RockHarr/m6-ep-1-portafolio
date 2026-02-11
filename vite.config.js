/**
 * vite.config.js
 * ─────────────
 * Configuración de Vite: registra el plugin de Vue (SFC → JS)
 * y el plugin de Tailwind CSS v4 (procesa utilidades directamente,
 * sin PostCSS separado).
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
});
