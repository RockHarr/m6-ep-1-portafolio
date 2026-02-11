/**
 * auth.js — Store de autenticación (Pinia)
 * ─────────────────────────────────────────
 * NOTA PEDAGÓGICA: Esta es una autenticación DEMO, sin backend real.
 * En producción, las credenciales nunca se validan en el frontend.
 * Aquí se usa localStorage para persistir el estado de sesión entre
 * recargas de página (simulando lo que haría un token JWT).
 *
 * FLUJO:
 * 1) El usuario ingresa credenciales en LoginView
 * 2) Se llama a login(user, pass) → valida contra constantes hardcodeadas
 * 3) Si es válido → guarda flag en localStorage + actualiza estado reactivo
 * 4) El navigation guard del router lee isAuthenticated para decidir acceso
 * 5) logout() limpia todo y redirige a /login
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Credenciales demo (hardcodeadas — esto NUNCA se hace en producción)
const DEMO_USER = "profe";
const DEMO_PASS = "1234";
const STORAGE_KEY = "m6-auth-session";

export const useAuthStore = defineStore("auth", () => {
  // ── Estado reactivo ──
  // Se inicializa leyendo localStorage para persistir entre recargas
  const user = ref(localStorage.getItem(STORAGE_KEY) || null);

  // ── Getters ──
  const isAuthenticated = computed(() => user.value !== null);

  // ── Acciones ──

  /**
   * Intenta autenticar al usuario con credenciales demo.
   * @param {string} username
   * @param {string} password
   * @returns {boolean} true si las credenciales son correctas
   */
  function login(username, password) {
    if (username === DEMO_USER && password === DEMO_PASS) {
      user.value = username;
      localStorage.setItem(STORAGE_KEY, username);
      return true;
    }
    return false;
  }

  /**
   * Cierra la sesión: limpia estado reactivo y localStorage.
   */
  function logout() {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return { user, isAuthenticated, login, logout };
});
