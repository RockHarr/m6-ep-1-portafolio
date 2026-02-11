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
  <article class="info-card group rounded-2xl p-6 flex flex-col gap-4">
    <!-- Header: ícono + tipo badge (Mejora #5) -->
    <div class="flex items-start justify-between">
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

    <!-- Estado (Mejora #7: componente StatusBadge) -->
    <div class="mt-auto pt-2">
      <StatusBadge :status="status" />
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
  icon: {
    type: String,
    default: '📁'
  }
})

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
  border: 1px solid var(--color-ink-700);
  box-shadow: var(--shadow-card);
  transition:
    transform var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  will-change: transform;
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-neon-dim);
  box-shadow: var(--shadow-card-hover);
}

/* Accesibilidad: sin movimiento en hover si el usuario lo prefiere */
@media (prefers-reduced-motion: reduce) {
  .info-card:hover {
    transform: none;
  }
}
</style>
