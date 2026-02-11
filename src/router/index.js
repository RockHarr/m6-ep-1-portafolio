/**
 * router/index.js — Configuración de Vue Router
 * ───────────────────────────────────────────────
 * Define las rutas de la app y el navigation guard de autenticación.
 *
 * RUTAS:
 * - /login  → vista pública de login
 * - /       → landing/portafolio (protegida, requiere sesión)
 *
 * GUARD (beforeEach):
 * - Si el usuario NO tiene sesión y quiere ir a / → redirige a /login
 * - Si el usuario SÍ tiene sesión y quiere ir a /login → redirige a /
 * - Cualquier otra combinación → deja pasar
 *
 * NOTA PEDAGÓGICA: El guard usa el store de Pinia, por eso en main.js
 * Pinia se registra ANTES que el router.
 */

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

// Lazy loading: las vistas se cargan solo cuando se necesitan,
// lo que mejora el tiempo de carga inicial.
const HomeView = () => import("../views/HomeView.vue");
const LoginView = () => import("../views/LoginView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ── Navigation Guard: protege rutas que requieren autenticación ──
router.beforeEach((to) => {
  const auth = useAuthStore();

  // Caso 1: ruta protegida + sin sesión → forzar login
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: "login" };
  }

  // Caso 2: ya autenticado + intenta ir a login → redirigir a home
  if (to.name === "login" && auth.isAuthenticated) {
    return { name: "home" };
  }

  // Caso 3: cualquier otra situación → dejar pasar
  // (no se necesita return explícito, Vue Router lo permite)
});

export default router;
