<!--
  LoginView.vue — Vista de autenticación demo
  ─────────────────────────────────────────────
  FLUJO:
  1) El usuario llega aquí si no tiene sesión activa (redirigido por el guard)
  2) Ingresa usuario y contraseña en el formulario
  3) Al submit, se llama a authStore.login()
  4) Si las credenciales son válidas → el router redirige a /
  5) Si son inválidas → se muestra un alert de error

  MEJORA #3 aplicada: Loading state en el botón con spinner CSS de 300ms
  para simular una petición real (UX feedback).

  NOTA PEDAGÓGICA: En una app real, el login haría una petición HTTP
  a un backend que validaría las credenciales y devolvería un token JWT.
  Aquí todo es frontend para fines educativos.
-->
<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md p-8 bg-ink-900/50 backdrop-blur-xl rounded-2xl border border-ink-800 shadow-2xl relative overflow-hidden">
      <!-- Glow superior decorativo -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-neon shadow-[0_0_20px_rgba(0,229,255,0.5)]"></div>

      <!-- Mascota Axis (guardián del login) -->
      <div class="flex justify-center mb-6">
        <div class="relative w-24 h-24 animate-float">
          <div class="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse"></div>
          <img
            v-if="axisImage"
            :src="axisImage"
            alt="Axis Robot"
            class="relative w-full h-full object-contain drop-shadow-lg"
          />
          <span v-else class="text-6xl transform rotate-12 inline-block">🤖</span>
        </div>
      </div>

      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon to-purple-400 mb-2">
          RH Portafolio
        </h1>
        <p class="text-ink-400 mt-2 text-sm">
          Ingresa tus credenciales para ver el portafolio
        </p>
      </div>

      <!-- Card del formulario -->
      <form
        @submit.prevent="handleLogin"
        class="login-card rounded-2xl p-8 space-y-5"
      >
        <!-- Campo usuario -->
        <div>
          <label for="login-user" class="block text-sm font-medium text-ink-300 mb-1.5">
            Usuario
          </label>
          <input
            id="login-user"
            v-model="username"
            type="text"
            autocomplete="username"
            placeholder="Ingresa tu usuario"
            required
            class="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-600
                   text-ink-100 placeholder-ink-500
                   focus:border-neon focus:ring-1 focus:ring-neon
                   transition-colors duration-200 outline-none"
          />
        </div>

        <!-- Campo contraseña -->
        <div>
          <label for="login-pass" class="block text-sm font-medium text-ink-300 mb-1.5">
            Contraseña
          </label>
          <input
            id="login-pass"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Ingresa tu contraseña"
            required
            class="w-full px-4 py-2.5 rounded-lg bg-ink-800 border border-ink-600
                   text-ink-100 placeholder-ink-500
                   focus:border-neon focus:ring-1 focus:ring-neon
                   transition-colors duration-200 outline-none"
          />
        </div>

        <!-- Alert de error (visible solo cuando hay error) -->
        <Transition name="route">
          <div
            v-if="errorMsg"
            role="alert"
            class="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            {{ errorMsg }}
          </div>
        </Transition>

        <!-- Botón submit con loading state (Mejora #3) -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full py-2.5 rounded-lg font-semibold text-ink-950
                 bg-neon hover:bg-neon-dim
                 focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ink-900
                 transition-all duration-200
                 disabled:opacity-70 disabled:cursor-not-allowed
                 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="login-spinner"></span>
          <span>{{ isLoading ? 'Verificando...' : 'Ingresar' }}</span>
        </button>

        <!-- Hint de credenciales (solo para demo) -->
        <p class="text-center text-xs text-ink-500 mt-4">
          Demo: usuario <code class="text-neon/70">profe</code> /
          contraseña <code class="text-neon/70">1234</code>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// ── Estado local del formulario ──
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

// Cargar imagen de Axis dinámicamente
const axisImage = computed(() => {
  try {
    return new URL('../assets/img/axis.png', import.meta.url).href
  } catch {
    return null
  }
})

/**
 * handleLogin — Procesa el intento de inicio de sesión.
 * Simula latencia de red (Mejora #3) y valida credenciales contra el store.
 */
async function handleLogin() {
  errorMsg.value = ''
  isLoading.value = true

  // Simular latencia de red (300ms) para que el usuario vea el feedback
  await new Promise(resolve => setTimeout(resolve, 300))

  const success = authStore.login(username.value, password.value)

  if (success) {
    // Redirigir a la landing protegida
    router.push({ name: 'home' })
  } else {
    errorMsg.value = 'Usuario o contraseña incorrectos. Intenta de nuevo.'
    isLoading.value = false
  }
}
</script>

<style scoped>
/*
 * Estilos scoped del LoginView:
 * - Card con fondo semi-transparente y borde sutil (glassmorphism ligero)
 * - Se usan las variables CSS del sistema de diseño (style.css)
 */
.login-card {
  background: var(--color-ink-900);
  border: 1px solid var(--color-ink-700);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4),
              0 0 0 1px var(--color-ink-800);
}
</style>
