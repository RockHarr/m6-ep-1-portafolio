<!--
  App.vue — Componente raíz de la aplicación
  ───────────────────────────────────────────
  Responsabilidades:
  1) Contiene el <router-view> que renderiza la vista activa
  2) Envuelve el router-view en <Transition> para el efecto
     fade/slide entre Login ⇄ Home (efecto propio #2)
  3) Provee el layout base (fondo oscuro, min-height pantalla completa)

  NOTA PEDAGÓGICA: La <Transition> de Vue aplica clases CSS durante
  el cambio de componente. Las clases route-enter-* y route-leave-*
  están definidas en style.css (tokens globales).
-->
<template>
  <div class="min-h-screen bg-ink-950 text-ink-100 transition-colors duration-300">
    <Transition name="fade" mode="out-in">
      <LoaderScreen v-if="isLoading" />
      <router-view v-else v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LoaderScreen from './components/LoaderScreen.vue'

const isLoading = ref(true)

onMounted(() => {
  // Simular tiempo de carga del loader
  setTimeout(() => {
    isLoading.value = false
  }, 1800)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
