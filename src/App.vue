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
  <div class="min-h-screen bg-ink-950 text-ink-100">
    <!--
      router-view con v-slot nos da acceso al componente actual,
      necesario para que <Transition> detecte el cambio de ruta.
      mode="out-in" asegura que la vista saliente termine su animación
      ANTES de que entre la nueva (evita solapamiento visual).
    -->
    <router-view v-slot="{ Component }">
      <Transition name="route" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<script setup>
/**
 * App.vue no necesita lógica propia.
 * Todo el estado vive en Pinia (auth) y las vistas (data).
 * Solo provee el layout shell + transición de rutas.
 */
</script>

<style scoped>
/*
 * Estilos scoped de App.vue
 * Aquí definimos el contenedor raíz y su altura mínima.
 * Los colores de fondo se manejan con las clases de Tailwind
 * que usan los tokens definidos en @theme (style.css).
 */
</style>
