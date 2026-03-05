<template>
  <span ref="el" class="count-up-value">{{ display }}</span>
</template>

<script setup>
/**
 * CountUp.vue — Animación de contador numérico (Vue Bits estilo)
 * ──────────────────────────────────────────────────────────────
 * Usa Intersection Observer para disparar el conteo sólo cuando el
 * elemento entra en el viewport, y motion-v (Motion One) para la
 * animación suave de los valores.
 *
 * Props:
 * - to:       número final (requerido)
 * - duration: duración en ms (default: 1500)
 * - suffix:   texto después del número (default: '')
 */
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  to: { type: Number, required: true },
  duration: { type: Number, default: 1500 },
  suffix: { type: String, default: '' }
})

const el = ref(null)
const display = ref(`0${props.suffix}`)

let observer = null

function animateCount() {
  const start = 0
  const end = props.to
  const startTime = performance.now()

  function step(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    // easeOutExpo easing
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const current = Math.round(start + (end - start) * eased)
    display.value = `${current}${props.suffix}`

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCount()
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )
  if (el.value) observer.observe(el.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>
