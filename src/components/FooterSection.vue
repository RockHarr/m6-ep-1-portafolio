<!--
  FooterSection.vue — Footer del portafolio
  ──────────────────────────────────────────
  Footer con créditos, año, rol y social links del JSON.
-->
<template>
  <footer class="footer-section border-t border-ink-800">
    <div class="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Izquierda: Créditos -->
      <div>
        <p class="text-sm text-ink-400 font-semibold">{{ author || 'Portafolio' }}</p>
        <p class="text-xs text-ink-600 mt-1">
          {{ role ? role + ' · ' : '' }}{{ year || new Date().getFullYear() }} · Hecho con Vue 3 + Vite
        </p>
      </div>

      <!-- Derecha: Social links -->
      <div v-if="social" class="flex items-center gap-5">
        <a
          v-if="social.github"
          :href="social.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-500 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
        >
          GitHub
        </a>
        <a
          v-if="social.linkedin"
          :href="social.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-500 hover:text-[#0A66C2] transition-colors text-xs font-mono uppercase tracking-wider"
        >
          LinkedIn
        </a>
        <a
          v-if="social.web"
          :href="social.web"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-500 hover:text-neon transition-colors text-xs font-mono uppercase tracking-wider"
        >
          rockcode.cl
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  author: { type: String, default: '' },
  role:   { type: String, default: '' },
  year:   { type: Number, default: null },
  social: { type: Object, default: null }
})
</script>

<style scoped>
.footer-section {
  background: var(--color-ink-950);
}
</style>
