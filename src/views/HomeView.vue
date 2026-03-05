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
        :title="words.projects" 
        :subtitle="meta.role"
      />
      
      <!-- Filtros Proyectos -->
      <div v-if="projectTags.length > 2" class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="tag in projectTags"
          :key="tag"
          @click="selectedProjectFilter = tag"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          :class="selectedProjectFilter === tag 
            ? 'bg-neon/10 border-neon text-neon shadow-[0_0_12px_rgba(0,229,255,0.2)] dark:shadow-[0_0_12px_rgba(0,102,204,0.2)]' 
            : 'bg-ink-900/50 border-ink-800 text-ink-400 hover:text-ink-100 hover:border-ink-600'"
        >
          {{ tag }}
        </button>
      </div>
      
      <!-- Grid con componentes animados -->
      <CardsGrid :items="filteredProjects" />
    </section>

    <!-- ── Sección Ejercicios ── -->
    <section id="ejercicios" class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20">
      <SectionHeader 
        :title="words.exercises" 
        :subtitle="meta.course"
      />
      
      <!-- Filtros Ejercicios -->
      <div v-if="exerciseTags.length > 2" class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="tag in exerciseTags"
          :key="tag"
          @click="selectedExerciseFilter = tag"
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          :class="selectedExerciseFilter === tag 
            ? 'bg-neon/10 border-neon text-neon shadow-[0_0_12px_rgba(0,229,255,0.2)] dark:shadow-[0_0_12px_rgba(0,102,204,0.2)]' 
            : 'bg-ink-900/50 border-ink-800 text-ink-400 hover:text-ink-100 hover:border-ink-600'"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Grid con componentes animados -->
      <CardsGrid :items="filteredExercises" />
    </section>

    <!-- ── Sección Artículos ── -->
    <section
      id="articulos"
      v-if="articles.length"
      class="py-16 sm:py-24 max-w-6xl mx-auto px-6 scroll-mt-20"
    >
      <SectionHeader 
        :title="words.articles" 
        :subtitle="meta.role"
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

    <!-- ── Sección Contacto ── -->
    <ContactSection />

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
import { ref, watch, computed } from 'vue'
import { useI18n } from '../composables/useI18n.js'

import NavBar       from '../components/NavBar.vue'
import HeroSection  from '../components/HeroSection.vue'
import StatsBar     from '../components/StatsBar.vue'
import SkillsSection from '../components/SkillsSection.vue'
import SectionHeader from '../components/SectionHeader.vue'
import InfoCard     from '../components/InfoCard.vue'
import CardsGrid    from '../components/CardsGrid.vue'
import FooterSection from '../components/FooterSection.vue'
import AboutSection   from '../components/AboutSection.vue'
import ArticleCard    from '../components/ArticleCard.vue'
import ScrollReveal   from '../components/ScrollReveal.vue'
import ContactSection from '../components/ContactSection.vue'

// ── Estado multi-idioma ──
const { t } = useI18n()

const meta   = computed(() => t.value.meta || {})
const nav    = computed(() => t.value.nav || { brand: 'RH', links: [] })
const social = computed(() => t.value.social || null)
const stats  = computed(() => t.value.stats || [])
const skills = computed(() => t.value.skills || [])
const hero   = computed(() => t.value.hero || {})
const items  = computed(() => t.value.items || [])
const images = computed(() => t.value.images || {})
const words  = computed(() => t.value.words || {
  projects: 'Proyectos',
  exercises: 'Ejercicios',
  articles: 'Artículos',
  all: 'Todos'
})

// ── Filtros y lógica ──
const selectedProjectFilter = ref('Todos')
const selectedExerciseFilter = ref('Todos')

const projects  = computed(() => items.value.filter(i => i.type === 'project'))
const exercises = computed(() => items.value.filter(i => i.type === 'exercise'))
const articles  = computed(() => items.value.filter(i => i.type === 'article'))

const projectTags = computed(() => {
  const tags = projects.value.flatMap(p => p.tags || [])
  return [words.value.all, ...new Set(tags)]
})

const exerciseTags = computed(() => {
  const tags = exercises.value.flatMap(e => e.tags || [])
  return [words.value.all, ...new Set(tags)]
})

const filteredProjects = computed(() => {
  if (selectedProjectFilter.value === words.value.all || selectedProjectFilter.value === 'Todos' || selectedProjectFilter.value === 'All' || selectedProjectFilter.value === '全部') return projects.value
  return projects.value.filter(p => p.tags?.includes(selectedProjectFilter.value))
})

const filteredExercises = computed(() => {
  if (selectedExerciseFilter.value === words.value.all || selectedExerciseFilter.value === 'Todos' || selectedExerciseFilter.value === 'All' || selectedExerciseFilter.value === '全部') return exercises.value
  return exercises.value.filter(e => e.tags?.includes(selectedExerciseFilter.value))
})

/**
 * getImagePath — Resuelve la URL del asset de imagen para Vite
 * @param {string} key - Nombre del archivo sin extensión (e.g. 'profile')
 */
function getImagePath(key) {
  if (images.value && key in images.value === false) return ''
  try {
    return new URL(`../assets/img/${key}.png`, import.meta.url).href
  } catch (e) {
    return ''
  }
}

// ── Hidratación de datos desde el JSON y actualización del título ──
watch(() => t.value, (newT) => {
  document.title = `${newT.nav.brand || 'RH'} — ${newT.meta.author || 'Portafolio'}`
}, { immediate: true })

watch(() => words.value.all, (newAllText) => {
  // reset filters when language changes to avoid empty grids
  selectedProjectFilter.value = newAllText
  selectedExerciseFilter.value = newAllText
})
</script>
