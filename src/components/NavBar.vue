<!--
  NavBar.vue — Barra de navegación superior
  ──────────────────────────────────────────
  Responsabilidades:
  1) Mostrar el nombre/marca del sitio
  2) Links de navegación (Proyectos / Ejercicios) con scroll suave (Mejora #4)
  3) Botón de logout (visible solo si hay sesión)

  MEJORA #4: scrollToSection usa element.scrollIntoView({ behavior: 'smooth' })
  para que los links del NavBar realmente naveguen a la sección correspondiente.
-->
<template>
  <nav class="navbar sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Marca / Logo -->
      <span class="text-lg font-bold text-neon tracking-wide">
        {{ brandName }}
      </span>

      <!-- Links de navegación + Logout -->
      <div class="flex items-center gap-6">
        <!--
          Links de sección: se renderizan desde el JSON (nav.links).
          Al hacer click, hacen smooth scroll al id correspondiente.
        -->
        <button
          v-for="link in navLinks"
          :key="link.anchor"
          type="button"
          @click="scrollToSection(link.anchor)"
          class="text-sm text-ink-300 hover:text-neon transition-colors duration-200
                 font-medium hidden sm:inline-block"
        >
          {{ link.label }}
        </button>

        <!-- Botón logout: solo visible si hay sesión activa -->
        <button
          v-if="authStore.isAuthenticated"
          type="button"
          @click="handleLogout"
          class="text-sm px-4 py-1.5 rounded-lg
                 border border-ink-600 text-ink-300
                 hover:border-red-500/50 hover:text-red-400
                 transition-all duration-200"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// ── Props ──
defineProps({
  brandName: {
    type: String,
    default: 'Portafolio'
  },
  navLinks: {
    type: Array,
    default: () => []
  }
})

const router = useRouter()
const authStore = useAuthStore()

/**
 * scrollToSection — Navega suavemente a una sección de la página (Mejora #4)
 * Recibe un anchor string como "#proyectos" y busca el elemento por id.
 */
function scrollToSection(anchor) {
  const id = anchor.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * handleLogout — Cierra sesión y redirige a login.
 * Limpia el estado de Pinia y el localStorage.
 */
function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
/*
 * Navbar con fondo semi-transparente y blur para efecto "frosted glass".
 * Se usan las variables CSS del sistema de diseño para mantener consistencia.
 * El backdrop-filter es ligero (8px) para no afectar rendimiento.
 */
.navbar {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-ink-800);
}

/* Desactivar blur si el usuario prefiere reducir movimiento */
@media (prefers-reduced-motion: reduce) {
  .navbar {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--color-ink-950);
  }
}
</style>
