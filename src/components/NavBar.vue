<!--
  NavBar.vue — Barra de navegación superior
  ──────────────────────────────────────────
  Responsabilidades:
  1) Mostrar el nombre/marca del sitio
  2) Links de navegación con scroll suave y estado activo por sección
  3) Iconos de social media (GitHub, LinkedIn)
  4) Barra de progreso de lectura en la parte inferior del nav

  Técnicas:
  - Intersection Observer: detecta qué sección está en viewport → activa el link
  - scroll event: calcula el % de avance para la barra de progreso
-->
<template>
  <nav class="navbar sticky top-0 z-50" role="navigation" aria-label="Navegación principal">
    <!-- Barra de progreso de lectura -->
    <div
      class="progress-bar"
      :style="{ width: `${scrollProgress}%` }"
      aria-hidden="true"
    />

    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Marca / Logo -->
      <span class="text-base font-black text-neon tracking-widest uppercase font-mono">
        {{ brandName }}
      </span>

      <!-- Centro: Links de navegación -->
      <div class="hidden sm:flex items-center gap-1">
        <button
          v-for="link in navLinks"
          :key="link.anchor"
          type="button"
          @click="scrollToSection(link.anchor)"
          class="nav-link px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeSection === link.anchor.replace('#','')
            ? 'active-link'
            : 'text-ink-400 hover:text-neon'"
        >
          {{ link.label }}
        </button>
      </div>

      <!-- Derecha: Social Links -->
      <div v-if="social" class="flex items-center gap-4">
        <!-- GitHub -->
        <a
          v-if="social.github"
          :href="social.github"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-400 hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>

        <!-- LinkedIn -->
        <a
          v-if="social.linkedin"
          :href="social.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ink-400 hover:text-[#0A66C2] transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// ── Props ──
const props = defineProps({
  brandName: { type: String, default: 'RH' },
  navLinks:  { type: Array,  default: () => [] },
  social:    { type: Object, default: null }
})

const scrollProgress = ref(0)
const activeSection  = ref('')

// ── Barra de progreso de scroll ──
function onScroll() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

// ── Active section via Intersection Observer ──
let sectionObserver = null

function setupSectionObserver() {
  const sections = props.navLinks
    .map(l => document.getElementById(l.anchor.replace('#', '')))
    .filter(Boolean)

  if (!sections.length) return

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  )
  sections.forEach(s => sectionObserver.observe(s))
}

/**
 * scrollToSection — Navega suavemente a una sección de la página
 * Recibe un anchor string como "#proyectos" y busca el elemento por id.
 */
function scrollToSection(anchor) {
  const id = anchor.replace('#', '')
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  // slight delay to allow sections to render
  setTimeout(setupSectionObserver, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  sectionObserver?.disconnect()
})
</script>

<style scoped>
.navbar {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-ink-800);
}

/* Barra de progreso —  posicionada en la parte inferior del nav */
.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--color-neon);
  box-shadow: 0 0 8px var(--color-neon);
  transition: width 0.1s linear;
  pointer-events: none;
}

/* Link activo */
.active-link {
  color: var(--color-neon);
  background: rgba(var(--color-neon-rgb, 0, 255, 212), 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .navbar {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--color-ink-950);
  }
  .progress-bar {
    display: none;
  }
}
</style>
