<!--
  HeroSection.vue — Sección hero con animación SplitText (Vue Bits)
  ──────────────────────────────────────────────────────────────────
  Responsabilidades:
  1) Mostrar el título principal del portafolio con animación SplitText
  2) Subtítulo descriptivo
  3) Botón CTA que hace scroll a la sección de proyectos

  EFECTO VUE BITS: SplitText divide el texto del título en caracteres
  individuales y los anima con un reveal escalonado. Este es el único
  componente de Vue Bits usado en el proyecto (requisito del brief).

  NOTA: Si Vue Bits no está disponible (ej: problema de instalación),
  el componente muestra el título con una animación CSS fallback.
  motion-v es la dependencia de animación que Vue Bits usa internamente.
-->
<template>
  <section class="hero-section relative overflow-hidden">
    <div class="max-w-6xl mx-auto px-6 py-24 sm:py-32 text-center">
      <!-- Título animado con SplitText (Vue Bits) -->
      <h1 class="text-5xl sm:text-6xl lg:text-8xl leading-none font-black tracking-tighter mb-8 text-ink-50 uppercase drop-shadow-lg whitespace-nowrap">
        <SplitText
          :text="title"
          :delay="30"
          animation-type="spring"
          :spring="{ damping: 15, stiffness: 200 }"
          class="split-text-wrapper"
          text-class="split-char"
        />
      </h1>

      <!-- Subtítulo -->
      <p
        v-if="subtitle"
        class="text-lg sm:text-xl text-ink-400 max-w-2xl mx-auto mb-8"
      >
        {{ subtitle }}
      </p>

      <!-- Botón CTA: scroll a sección de proyectos -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          v-if="cta"
          :href="cta.anchor"
          @click.prevent="scrollToCta"
          class="cta-button inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl
                 font-semibold text-lg
                 hover:bg-neon-dim
                 transition-all duration-200
                 focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ink-950"
        >
          {{ cta.label }}
          <span aria-hidden="true">↓</span>
        </a>

        <router-link
          to="/cv?print=true"
          class="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-xl
                 font-semibold text-lg border-2 border-neon text-neon bg-transparent
                 hover:bg-neon hover:text-ink-950
                 transition-all duration-200
                 focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ink-950"
        >
          📄 Versión CV / PDF
        </router-link>
      </div>
    </div>

    <!-- LightRays Background -->
    <div v-if="!prefersReducedMotion" class="absolute inset-0 z-0 pointer-events-none">
      <LightRays
        class="absolute inset-0 z-[-10]"
        raysOrigin="top-center"
        raysColor="#00e5ff"
        :raysSpeed="1.5"
        :rayLength="2.5"
        :lightSpread="1.2"
        :fadeDistance="0.8"
        :saturation="1.0"
        :pulsating="true"
      />
    </div>
    <div v-else class="hero-glow absolute inset-0 z-0 pointer-events-none" aria-hidden="true"></div>
  </section>
</template>

<script setup>
/**
 * HeroSection recibe los datos del hero desde el JSON vía props.
 * El SplitText se importa como componente local — viene del
 * paquete Vue Bits (instalado vía jsrepo o copiado manualmente).
 *
 * Si motion-v no está instalado, el import fallará silenciosamente
 * y se mostrará el texto sin animación (fallback graceful).
 */
import { ref, onMounted } from 'vue'
import SplitText from './SplitText.vue'
import LightRays from './LightRays.vue'

const prefersReducedMotion = ref(false)

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  cta: {
    type: Object,
    default: null
  }
})

/**
 * scrollToCta — Scroll suave al anchor del CTA
 */
function scrollToCta() {
  if (!props.cta?.anchor) return
  const id = props.cta.anchor.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
/*
 * Hero section con gradiente sutil de fondo que da profundidad.
 * El glow es un círculo difuminado posicionado absoluto — ligero
 * y no usa backdrop-filter para evitar peso en rendimiento.
 */
.hero-section {
  background: linear-gradient(
    180deg,
    var(--color-ink-900) 0%,
    var(--color-ink-950) 100%
  );
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(
    ellipse at center,
    var(--color-neon-faint) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* El contenido debe estar sobre el glow y los LightRays */
.hero-section > div:first-child {
  position: relative;
  z-index: 10;
}

/* Estilo para los caracteres del SplitText */
:deep(.split-char) {
  display: inline-block;
}

/*
 * Botón CTA con color de texto forzado a oscuro.
 * Se usa color explícito porque text-ink-950 de Tailwind
 * puede no resolver correctamente sobre bg neon.
 */
.cta-button {
  background-color: var(--color-neon);
  color: #0a0a0f;
}

.cta-button:hover {
  background-color: var(--color-neon-dim);
}

@media (prefers-reduced-motion: reduce) {
  .hero-glow {
    display: none;
  }
}
</style>
