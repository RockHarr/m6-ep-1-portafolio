<template>
  <main class="min-h-screen">
    <!-- Navbar recibe datos del objeto meta y el array de links -->
    <NavBar 
      :brand-name="meta.brand || 'Portafolio'" 
      :nav-links="navLinks" 
    />
    
    <!-- Hero con datos del objeto hero -->
    <HeroSection 
      v-if="hero.title"
      :title="hero.title" 
      :subtitle="hero.subtitle"
      :cta="hero.cta"
    />

    <!-- NUEVA: Sección Sobre Mí con Ilustración de Perfil -->
    <AboutSection 
      v-if="meta.bio" 
      :bio="meta.bio"
      :image-path="getImagePath('profile')"
    />

    <!-- Sección Proyectos (con Nexus) -->
    <section id="proyectos" class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20">
      <SectionHeader 
        title="Proyectos" 
        subtitle="Trabajos integradores desarrollados durante el curso"
        :image-src="getImagePath('nexus')"
      />
      
      <!-- Grid de proyectos filtrados con stagger animation -->
      <CardsGrid :items="projects" />
    </section>

    <!-- Sección Ejercicios (con Spark) -->
    <section id="ejercicios" class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20">
      <SectionHeader 
        title="Ejercicios" 
        subtitle="Prácticas y desafíos resueltos paso a paso"
        :image-src="getImagePath('spark')"
      />
      
      <!-- Grid de ejercicios filtrados -->
      <CardsGrid :items="exercises" />
    </section>

    <FooterSection 
      :author="meta.author"
      :year="meta.year"
    />
  </main>
</template>

<script setup>
/**
 * HomeView.vue — Landing page principal
 * ─────────────────────────────────────
 * Integra los componentes estructurales y distribuye los datos del JSON.
 * Ahora incluye AboutSection para el perfil y pasa las mascotas a los headers.
 */
import { ref, onMounted, computed } from 'vue'
// Importamos el JSON directamente para tener los datos disponibles
import portfolioData from '../assets/portfolio.json'

import NavBar from '../components/NavBar.vue'
import HeroSection from '../components/HeroSection.vue'
import SectionHeader from '../components/SectionHeader.vue'
import CardsGrid from '../components/CardsGrid.vue'
import FooterSection from '../components/FooterSection.vue'
import AboutSection from '../components/AboutSection.vue'

// Estado reactivo
const meta = ref({})
const navLinks = ref([])
const hero = ref({})
const items = ref([])
const images = ref({})

// Computed properties para filtrar items
const projects = computed(() => items.value.filter(i => i.type === 'project'))
const exercises = computed(() => items.value.filter(i => i.type === 'exercise'))

/**
 * Helper para construir rutas de imágenes de assets.
 * @param {string} key - Clave de la imagen ('nexus', 'spark', 'profile')
 */
function getImagePath(key) {
    // Si no hay imagen definida en el JSON, retornar vacío
    if (!images.value || !images.value[key]) return ''
    
    // Vite asset URL handling:
    // Construimos la URL relativa basada en la estructura de carpetas conocida.
    // Usamos new URL(path, import.meta.url).href para que Vite procese el asset.
    try {
        return new URL(`../assets/img/${key}.png`, import.meta.url).href
    } catch (e) {
        console.warn(`No se pudo cargar la imagen: ${key}`, e)
        return ''
    }
}

// Carga de datos al montar el componente
onMounted(() => {
  meta.value = portfolioData.meta || {}
  // FIX: Cargar nav.links correctamente desde el JSON
  navLinks.value = portfolioData.nav?.links || []
  // FIX: Cargar brand desde nav.brand
  meta.value.brand = portfolioData.nav?.brand || 'Portafolio'
  hero.value = portfolioData.hero || {}
  items.value = portfolioData.items || []
  images.value = portfolioData.images || {}
  
  // Título de la pestaña
  if (meta.value.author) {
      document.title = `${meta.value.brand || 'Portafolio'} — ${meta.value.author}`
  }
})
</script>
