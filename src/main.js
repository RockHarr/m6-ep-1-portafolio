/**
 * main.js — Punto de entrada de la aplicación
 * ─────────────────────────────────────────────
 * Aquí se ensambla la app Vue:
 * 1) Se crea la instancia de la app
 * 2) Se registra Pinia (estado global) — necesario para el auth store
 * 3) Se registra Vue Router (navegación) — incluye el guard de auth
 * 4) Se importan los estilos globales (Tailwind + tokens CSS)
 * 5) Se monta la app en el DOM
 *
 * FLUJO: main.js → App.vue → Router decide vista → componentes renderizan
 */

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

// Pinia debe registrarse ANTES del router, porque el navigation guard
// del router usa el authStore (que vive en Pinia).
app.use(createPinia());
app.use(router);

app.mount("#app");
