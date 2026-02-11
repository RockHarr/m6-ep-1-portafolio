<!--
  FooterSection.vue — Footer del portafolio
  ──────────────────────────────────────────
  Footer simple con créditos y año.
  Recibe datos del JSON (meta.author, meta.year) vía props.
-->
<template>
  <footer class="footer-section border-t border-ink-800">
    <div class="max-w-6xl mx-auto px-6 py-8 text-center">
      <p class="text-sm text-ink-500">
        {{ author || 'Portafolio' }} · {{ year || new Date().getFullYear() }}
      </p>
      <p class="text-xs text-ink-600 mt-2">
        Hecho con Vue 3-Vite · Módulo 6 Frontend
      </p>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  author: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: null
  }
})
</script>

<style scoped>
.footer-section {
  background: var(--color-ink-950);
}
</style>
