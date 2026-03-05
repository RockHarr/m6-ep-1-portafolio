<template>
  <main class="min-h-screen">
    <!-- NavBar recibe brand, links de navegación y social links -->
    <NavBar 
      :brand-name="nav.brand"
      :nav-links="nav.links"
      :social="social"
    />
    
    <!-- Hero: título impactante + subtítulo descriptivo -->
    <HeroSection 
      v-if="hero.title"
      :title="hero.title" 
      :subtitle="hero.subtitle"
      :cta="hero.cta"
    />

    <!-- StatsBar: Proyectos, Repos, Módulos (CountUp al entrar en viewport) -->
    <StatsBar v-if="stats.length" :stats="stats" />

    <!-- Skills: Sección #2 según anatomía del profe -->
    <SkillsSection v-if="skills.length" :skills="skills" />

    <!-- Sobre Mí: perfil e ilustración -->
    <AboutSection 
      v-if="meta.bio" 
      :bio="meta.bio"
      :image-path="getImagePath('profile')"
    />

    <!-- ── Sección Proyectos ── -->
    <section id="proyectos" class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20">
      <SectionHeader 
        title="Proyectos" 
        subtitle="Aplicaciones reales construidas durante el curso y en ROCKCODE SPA"
      />
      
      <!-- Grid con ScrollReveal escalonado por item -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal
          v-for="(item, i) in projects"
          :key="item.id"
          :delay="i * 80"
        >
          <InfoCard v-bind="item" class="h-full" />
        </ScrollReveal>
      </div>
    </section>

    <!-- ── Sección Ejercicios ── -->
    <section id="ejercicios" class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20">
      <SectionHeader 
        title="Ejercicios" 
        subtitle="Prácticas y desafíos resueltos con APIs, DOM y conceptos avanzados"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal
          v-for="(item, i) in exercises"
          :key="item.id"
          :delay="i * 80"
        >
          <InfoCard v-bind="item" class="h-full" />
        </ScrollReveal>
      </div>
    </section>

    <!-- ── Sección Artículos ── -->
    <section
      id="articulos"
      v-if="articles.length"
      class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20"
    >
      <SectionHeader 
        title="Artículos" 
        subtitle="Reflexiones técnicas sobre Vue 3, GovTech y desarrollo frontend"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScrollReveal
          v-for="(article, i) in articles"
          :key="article.id"
          :delay="i * 80"
        >
          <ArticleCard v-bind="article" class="h-full" />
        </ScrollReveal>
      </div>
    </section>

    <FooterSection 
      :author="meta.author"
      :role="meta.role"
      :year="meta.year"
      :social="social"
    />
  </main>
</template>

<script setup>
/**
 * HomeView.vue — Landing page principal
 * ─────────────────────────────────────
 * Orquesta componentes y distribuye datos del JSON a toda la vista.
 * 
 * Fase 4: StatsBar (CountUp) + ScrollReveal escalonado en cada sección.
 * Los datos de social se propagan a NavBar y FooterSection.
 */
import { ref, onMounted, computed } from 'vue'
import portfolioData from '../assets/portfolio.json'

import NavBar       from '../components/NavBar.vue'
import HeroSection  from '../components/HeroSection.vue'
import StatsBar     from '../components/StatsBar.vue'
import SkillsSection from '../components/SkillsSection.vue'
import SectionHeader from '../components/SectionHeader.vue'
import InfoCard     from '../components/InfoCard.vue'
import CardsGrid    from '../components/CardsGrid.vue'
import FooterSection from '../components/FooterSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ArticleCard  from '../components/ArticleCard.vue'
import ScrollReveal from '../components/ScrollReveal.vue'

// ── Estado reactivo ──
const meta   = ref({})
const nav    = ref({ brand: 'RH', links: [] })
const social = ref(null)
const stats  = ref([])
const skills = ref([])
const hero   = ref({})
const items  = ref([])
const images = ref({})

// ── Computed: filtrar por tipo ──
const projects  = computed(() => items.value.filter(i => i.type === 'project'))
const exercises = computed(() => items.value.filter(i => i.type === 'exercise'))
const articles  = computed(() => items.value.filter(i => i.type === 'article'))

/**
 * getImagePath — Resuelve la URL del asset de imagen para Vite
 * @param {string} key - Nombre del archivo sin extensión (e.g. 'profile')
 */
function getImagePath(key) {
  if (!images.value?.[key]) return ''
  try {
    return new URL(`../assets/img/${key}.png`, import.meta.url).href
  } catch (e) {
    return ''
  }
}

// ── Hidratación de datos desde el JSON al montar ──
onMounted(() => {
  meta.value   = portfolioData.meta   || {}
  nav.value    = portfolioData.nav    || { brand: 'RH', links: [] }
  social.value = portfolioData.social || null
  stats.value  = portfolioData.stats  || []
  skills.value = portfolioData.skills || []
  hero.value   = portfolioData.hero   || {}
  items.value  = portfolioData.items  || []
  images.value = portfolioData.images || {}

  // Título de la pestaña
  document.title = `${nav.value.brand || 'RH'} — ${meta.value.author || 'Portafolio'}`
})
</script>
