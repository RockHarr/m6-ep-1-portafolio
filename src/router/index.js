/**
 * router/index.js — Configuración de Vue Router
 * ───────────────────────────────────────────────
 * Define las rutas de la app.
 *
 * RUTAS:
 * - /       → landing/portafolio
 */

import { createRouter, createWebHistory } from "vue-router";

// Lazy loading: las vistas se cargan solo cuando se necesitan,
// lo que mejora el tiempo de carga inicial.
const HomeView = () => import("../views/HomeView.vue");
const CvView = () => import("../views/CvView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cv",
    name: "cv",
    component: CvView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
