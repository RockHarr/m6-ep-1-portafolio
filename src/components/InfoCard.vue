<!--
  InfoCard.vue — Card individual del portafolio
  ──────────────────────────────────────────────
  Responsabilidades:
  1) Mostrar la info de un proyecto/ejercicio (recibida por props)
  2) Tags con colores dinámicos por tecnología (Mejora #2)
  3) Badge de tipo PROYECTO/EJERCICIO (Mejora #5)
  4) StatusBadge para el estado (Mejora #7: componente extraído)
  5) Hover effect propio: lift + borde neon sutil (Efecto propio #1)

  REQUISITO PDF: Cards por props — toda la data llega vía props.
-->
<template>
  <article class="info-card relative group rounded-2xl p-6 flex flex-col gap-4">
    <!-- Enlace absoluto para hacer toda la tarjeta clickable -->
    <a v-if="demoUrl || repoUrl" :href="demoUrl || repoUrl" target="_blank" class="absolute inset-0 z-10 rounded-2xl cursor-pointer" :aria-label="'Ver ' + title"></a>
    
    <!-- Imagen del proyecto (Estática o Vivo) -->
    <div 
      class="w-[calc(100%+3rem)] h-40 -mt-6 -mx-6 mb-2 overflow-hidden rounded-t-2xl relative z-20"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Capa Base: Imagen Estática HD -->
      <img v-if="image" :src="image" :alt="title" class="w-full h-full object-cover transition-transform duration-700 ease-out" :class="isHovered ? 'scale-110' : 'scale-100'" loading="lazy" />
      


      <!-- Gradiente inferior sutil para contraste con íconos y texto -->
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900 to-transparent opacity-90 z-20"></div>
    </div>

    <!-- Header: ícono + tipo badge (Mejora #5) -->
    <div class="flex items-start justify-between relative z-10">
      <span class="text-3xl" role="img" :aria-label="title">
        {{ icon || '📁' }}
      </span>
      <!--
        Badge de tipo: diferencia visualmente proyectos de ejercicios.
        Usa colores distintos según el prop type (Mejora #5).
      -->
      <span
        class="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
        :class="typeBadgeClasses"
      >
        {{ type === 'project' ? 'Proyecto' : 'Ejercicio' }}
      </span>
    </div>

    <!-- Título -->
    <h3 class="text-lg font-bold text-ink-100 group-hover:text-neon transition-colors duration-200">
      {{ title }}
    </h3>

    <!-- Resumen -->
    <p class="text-sm text-ink-400 leading-relaxed flex-1">
      {{ summary }}
    </p>

    <!-- Tags con colores dinámicos (Mejora #2) -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-2.5 py-1 rounded-full font-medium"
        :style="getTagStyle(tag)"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Estado y Acciones (Mejora #7 + Fase 3) -->
    <div class="mt-auto pt-4 flex items-center justify-between border-t border-ink-800/50 relative z-20">
      <StatusBadge :status="status" />
      
      <div class="flex gap-3">
        <!-- Botón Repo -->
        <a v-if="repoUrl" :href="repoUrl" target="_blank" class="text-ink-400 hover:text-white transition-colors duration-200" title="Ver Código" aria-label="Ver Repositorio">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a>
        <!-- Botón Demo -->
        <a v-if="demoUrl" :href="demoUrl" target="_blank" class="text-neon hover:text-neon-dim transition-colors duration-200" title="Ver Demo" aria-label="Ver Demo Viva">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
/**
 * InfoCard — Componente puro (presentacional)
 * Recibe datos por props y los renderiza. No tiene estado propio
 * ni side effects. El hover effect se maneja 100% con CSS.
 *
 * MEJORA #2: getTagStyle() devuelve colores dinámicos por tecnología.
 * Usa un mapa de colores y un hash fallback para tags no mapeados.
 */
import { computed } from 'vue'
import StatusBadge from './StatusBadge.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true,
    validator: (val) => ['project', 'exercise'].includes(val)
  },
  status: {
    type: String,
    default: 'completado'
  },
  image: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '📁'
  },
  repoUrl: {
    type: String,
    default: ''
  },
  demoUrl: {
    type: String,
    default: ''
  }
})

import { ref, watch, nextTick } from 'vue'

const isHovered = ref(false)

// ── Clases CSS del badge de tipo (Mejora #5) ──
const typeBadgeClasses = computed(() => {
  return props.type === 'project'
    ? 'bg-neon/10 text-neon border border-neon/20'
    : 'bg-accent-warm/10 text-accent-warm border border-accent-warm/20'
})

/**
 * Mapa de colores para los tag badges (Mejora #2).
 * Cada tecnología tiene un color de fondo y texto asociado.
 * Si un tag no está mapeado, se genera un color basado en hash del string.
 */
const TAG_COLORS = {
  'Vue 3':          { bg: 'rgba(66, 184, 131, 0.12)',  color: '#42b883' },
  'Pinia':          { bg: 'rgba(255, 215, 0, 0.10)',   color: '#ffd740' },
  'ApexCharts':     { bg: 'rgba(0, 143, 251, 0.12)',   color: '#008ffb' },
  'Supabase':       { bg: 'rgba(62, 207, 142, 0.12)',  color: '#3ecf8e' },
  'Tailwind':       { bg: 'rgba(56, 189, 248, 0.12)',  color: '#38bdf8' },
  'API REST':       { bg: 'rgba(249, 115, 22, 0.12)',  color: '#f97316' },
  'Axios':          { bg: 'rgba(90, 103, 216, 0.12)',  color: '#5a67d8' },
  'Composition API':{ bg: 'rgba(66, 184, 131, 0.12)',  color: '#42b883' },
  'v-for':          { bg: 'rgba(66, 184, 131, 0.12)',  color: '#42b883' },
  'v-model':        { bg: 'rgba(66, 184, 131, 0.12)',  color: '#42b883' },
  'Git':            { bg: 'rgba(240, 80, 50, 0.12)',   color: '#f05032' },
  'GitHub':         { bg: 'rgba(200, 200, 200, 0.10)', color: '#c8c8c8' },
}

function getTagStyle(tag) {
  const mapped = TAG_COLORS[tag]
  if (mapped) {
    return { backgroundColor: mapped.bg, color: mapped.color }
  }
  // Fallback: generar color basado en hash del string del tag
  const hue = tag.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360
  return {
    backgroundColor: `hsla(${hue}, 60%, 50%, 0.10)`,
    color: `hsl(${hue}, 60%, 65%)`
  }
}
</script>

<style scoped>
/*
 * EFECTO PROPIO #1: Hover lift + borde neon
 * ─────────────────────────────────────────
 * La card tiene un borde transparente por defecto.
 * Al hacer hover:
 * - Se eleva (translateY -4px)
 * - El borde cambia a neon con opacidad parcial
 * - La sombra se expande con tinte neon
 * Todo con transición suave de 200ms.
 *
 * Se usan las variables CSS del sistema de diseño (style.css)
 * para mantener los tokens centralizados.
 */
.info-card {
  background: var(--color-ink-900);
  border: 1px solid var(--color-ink-800);
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    background-color var(--transition-fast),
    box-shadow var(--transition-fast);
  will-change: transform;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-ink-600);
  background-color: var(--color-ink-800);
  box-shadow: var(--shadow-card-hover);
}

/* Accesibilidad: sin movimiento en hover si el usuario lo prefiere */
@media (prefers-reduced-motion: reduce) {
  .info-card:hover {
    transform: none;
  }
}
</style>
