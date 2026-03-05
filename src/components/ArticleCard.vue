<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block relative overflow-hidden rounded-2xl p-6 sm:p-8
           bg-ink-900 border border-ink-800
           transition-all duration-300 ease-out
           hover:-translate-y-1 hover:border-ink-600 hover:bg-ink-800/80
           focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ink-950"
  >
    <!-- Contenido del Artículo -->
    <div class="relative z-10 flex flex-col h-full">
      <!-- Metadatos (Fecha) -->
      <div class="flex items-center gap-3 mb-4 text-sm text-ink-400">
        <span class="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {{ date }}
        </span>
      </div>

      <!-- Título -->
      <h3 class="text-xl sm:text-2xl font-bold text-ink-100 mb-3 group-hover:text-neon transition-colors duration-200">
        {{ title }}
      </h3>

      <!-- Resumen -->
      <p class="text-ink-400 text-base leading-relaxed mb-6 flex-grow">
        {{ summary }}
      </p>

      <!-- CTA 'Leer más' -->
      <div class="flex items-center gap-2 text-sm font-semibold text-neon mt-auto opacity-80 group-hover:opacity-100 transition-opacity">
        Leer artículo
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  </a>
</template>

<script setup>
/**
 * ArticleCard.vue — Tarjeta para artículos del blog
 * ────────────────────────────────────────────────
 * Diseño limpio, optimizado para lectura rápida.
 * Inspirado en estéticas minimalistas técnicas.
 */
defineProps({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  url: {
    type: String,
    default: '#'
  }
})
</script>
