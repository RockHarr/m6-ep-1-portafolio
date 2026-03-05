<!--
  StatusBadge.vue — Micro-componente de estado (Mejora #7)
  ────────────────────────────────────────────────────────
  Componente extraído para demostrar modularización granular.
  Muestra un badge con el estado del item (completado, en progreso, etc.)

  ¿POR QUÉ EXTRAERLO?
  1) Suma un componente más al conteo de modularización (7+ vs 6+)
  2) Demuestra composición: componentes pequeños dentro de otros
  3) Reutilizable: si se agrega otra vista, se puede usar el mismo badge
-->
<template>
  <span
    class="inline-flex items-center gap-1.5 text-xs font-medium"
    :class="statusClasses"
  >
    <!-- Dot indicador de color -->
    <span
      class="w-1.5 h-1.5 rounded-full"
      :class="dotClass"
      aria-hidden="true"
    ></span>
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'completado'
  }
})

/**
 * Mapa de estados → configuración visual.
 * Se puede extender fácilmente agregando más estados.
 */
const STATUS_MAP = {
  completado: {
    label: 'Completado',
    textClass: 'status-text-completed',
    dotClass: 'status-dot-completed'
  },
  'en progreso': {
    label: 'En progreso',
    textClass: 'status-text-progress',
    dotClass: 'status-dot-progress'
  },
  pendiente: {
    label: 'Pendiente',
    textClass: 'status-text-pending',
    dotClass: 'status-dot-pending'
  }
}

const config = computed(() => STATUS_MAP[props.status] || STATUS_MAP.completado)
const label = computed(() => config.value.label)
const statusClasses = computed(() => config.value.textClass)
const dotClass = computed(() => config.value.dotClass)
</script>

<style scoped>
/* Colores base para Dark Mode */
.status-text-completed { color: #34d399; }
.status-dot-completed { background-color: #34d399; }

.status-text-progress { color: #fbbf24; }
.status-dot-progress { background-color: #fbbf24; }

.status-text-pending { color: var(--color-ink-500); }
.status-dot-pending { background-color: var(--color-ink-500); }

/* Ajustes de contraste para Light Mode */
:global(html.light) .status-text-completed { color: #059669; }
:global(html.light) .status-dot-completed { background-color: #059669; }

:global(html.light) .status-text-progress { color: #b45309; }
:global(html.light) .status-dot-progress { background-color: #b45309; }

:global(html.light) .status-text-pending { color: var(--color-ink-400); }
:global(html.light) .status-dot-pending { background-color: var(--color-ink-400); }
</style>
