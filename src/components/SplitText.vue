<!--
  SplitText.vue — Componente de animación de texto (inspirado en Vue Bits)
  ────────────────────────────────────────────────────────────────────────
  Este componente divide un texto en caracteres individuales y los anima
  con un efecto de reveal escalonado usando motion-v (la librería de
  animación que usa Vue Bits internamente).

  REFERENCIA: https://vue-bits.dev/text-animations/split-text
  Se implementa localmente siguiendo el patrón de Vue Bits para
  no depender del CLI jsrepo en el setup.

  NOTA PEDAGÓGICA: Vue Bits usa motion-v para las animaciones.
  motion-v es un port de Framer Motion para Vue, que permite
  definir animaciones declarativamente con springs y transiciones.
-->
<template>
  <!--
    Cada carácter se envuelve en un <span> con animación individual.
    El delay escalonado (stagger) crea el efecto de "reveal" letra por letra.
  -->
  <span class="split-text-container" aria-label="text">
    <span
      v-for="(char, index) in characters"
      :key="index"
      :class="textClass"
      :style="{
        display: 'inline-block',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.4s ease ${index * delay}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * delay}ms`,
        whiteSpace: char === ' ' ? 'pre' : 'normal',
        minWidth: char === ' ' ? '0.3em' : 'auto'
      }"
    >
      {{ char === ' ' ? '\u00A0' : char }}
    </span>
  </span>
</template>

<script setup>
/**
 * SplitText — Animación de texto tipo Vue Bits
 *
 * Funciona así:
 * 1) Recibe un string de texto
 * 2) Lo divide en caracteres individuales (computed)
 * 3) Cada carácter se renderiza con un delay incremental
 * 4) Al montarse, activa isVisible para triggear la animación CSS
 *
 * Se usa CSS transitions en vez de motion-v directamente para
 * mantener las dependencias mínimas, pero el efecto visual es
 * equivalente al SplitText de Vue Bits.
 */
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 50
  },
  textClass: {
    type: String,
    default: ''
  },
  // Props de compatibilidad con Vue Bits API (no usados internamente)
  animationType: {
    type: String,
    default: 'spring'
  },
  spring: {
    type: Object,
    default: () => ({})
  }
})

// Dividir el texto en caracteres individuales
const characters = computed(() => props.text.split(''))

// Control de visibilidad para triggear la animación al montar
const isVisible = ref(false)

onMounted(() => {
  // Pequeño delay para asegurar que el DOM está listo antes de animar
  requestAnimationFrame(() => {
    isVisible.value = true
  })
})
</script>

<style scoped>
.split-text-container {
  display: inline;
}

/* Si el usuario prefiere reducir movimiento, mostrar todo de golpe */
@media (prefers-reduced-motion: reduce) {
  .split-text-container span {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
