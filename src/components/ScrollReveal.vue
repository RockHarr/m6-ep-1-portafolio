<template>
  <div ref="el" class="scroll-reveal-wrapper" :style="wrapperStyle">
    <slot />
  </div>
</template>

<script setup>
/**
 * ScrollReveal.vue — Componente Vue Bits de reveal al hacer scroll
 * ────────────────────────────────────────────────────────────────
 * Envuelve cualquier contenido y lo anima con fade + slide-up cuando
 * el usuario llega a esa parte de la página.
 *
 * Props:
 * - delay:     retardo extra en ms antes de animar (default: 0)
 * - threshold: porcentaje de visibilidad antes de disparar (default: 0.15)
 * - from:      dirección de entrada - 'bottom' | 'left' | 'right' (default: 'bottom')
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  delay:     { type: Number,  default: 0      },
  threshold: { type: Number,  default: 0.15   },
  from:      { type: String,  default: 'bottom' }
})

const el = ref(null)
const visible = ref(false)

const initialTransform = computed(() => {
  if (props.from === 'left')  return 'translateX(-30px)'
  if (props.from === 'right') return 'translateX(30px)'
  return 'translateY(24px)'
})

const wrapperStyle = computed(() => ({
  opacity:    visible.value ? '1'    : '0',
  transform:  visible.value ? 'translate(0,0)' : initialTransform.value,
  transition: `opacity 0.6s ease ${props.delay}ms, transform 0.6s ease ${props.delay}ms`,
  willChange: 'opacity, transform',
}))

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: props.threshold }
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
