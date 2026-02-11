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
    textClass: 'text-emerald-400',
    dotClass: 'bg-emerald-400'
  },
  'en progreso': {
    label: 'En progreso',
    textClass: 'text-amber-400',
    dotClass: 'bg-amber-400'
  },
  pendiente: {
    label: 'Pendiente',
    textClass: 'text-ink-500',
    dotClass: 'bg-ink-500'
  }
}

const config = computed(() => STATUS_MAP[props.status] || STATUS_MAP.completado)
const label = computed(() => config.value.label)
const statusClasses = computed(() => config.value.textClass)
const dotClass = computed(() => config.value.dotClass)
</script>

<style scoped>
/*
 * StatusBadge no necesita estilos adicionales — todo se maneja
 * con clases de Tailwind. El componente es puramente presentacional.
 */
</style>
