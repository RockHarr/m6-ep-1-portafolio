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
      
      <!-- Controles: Filtros y Orden de Proyectos -->
      <div v-if="projectTags.length > 2" class="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 mb-10">
        <div class="flex flex-wrap justify-center gap-2">
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
        <div class="flex items-center gap-2">
          <span class="text-sm text-ink-400">{{ words.sort || 'Ordenar por:' }}</span>
          <button @click="projectsOrder = 'asc'" class="px-3 py-1 rounded text-sm transition-colors border" :class="projectsOrder === 'asc' ? 'border-neon text-neon bg-neon/10' : 'border-ink-800 text-ink-400 hover:text-ink-100'"><span class="mr-1">↑</span>{{ words.sortAsc || 'Antiguos ↓' }}</button>
          <button @click="projectsOrder = 'desc'" class="px-3 py-1 rounded text-sm transition-colors border" :class="projectsOrder === 'desc' ? 'border-neon text-neon bg-neon/10' : 'border-ink-800 text-ink-400 hover:text-ink-100'"><span class="mr-1">↓</span>{{ words.sortDesc || 'Recientes ↑' }}</button>
        </div>
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
      
      <!-- Controles: Filtros y Orden de Ejercicios -->
      <div v-if="exerciseTags.length > 2" class="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 mb-10">
        <div class="flex flex-wrap justify-center gap-2">
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
        <div class="flex items-center gap-2">
          <span class="text-sm text-ink-400">{{ words.sort || 'Ordenar por:' }}</span>
          <button @click="exercisesOrder = 'asc'" class="px-3 py-1 rounded text-sm transition-colors border" :class="exercisesOrder === 'asc' ? 'border-neon text-neon bg-neon/10' : 'border-ink-800 text-ink-400 hover:text-ink-100'"><span class="mr-1">↑</span>{{ words.sortAsc || 'Antiguos ↓' }}</button>
          <button @click="exercisesOrder = 'desc'" class="px-3 py-1 rounded text-sm transition-colors border" :class="exercisesOrder === 'desc' ? 'border-neon text-neon bg-neon/10' : 'border-ink-800 text-ink-400 hover:text-ink-100'"><span class="mr-1">↓</span>{{ words.sortDesc || 'Recientes ↑' }}</button>
        </div>
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
import { ref, watch, computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { fetchNoticias } from '../services/newsService.js'

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
const projectsOrder = ref('desc') // desc: ID de mayor a menor (recientes)
const exercisesOrder = ref('desc')

const projects  = computed(() => items.value.filter(i => i.type === 'project'))
const exercises = computed(() => items.value.filter(i => i.type === 'exercise'))
const apiArticles = ref([])

onMounted(async () => {
  apiArticles.value = await fetchNoticias()
})

const articles  = computed(() => {
  const staticArticles = items.value.filter(i => i.type === 'article')
  return [...apiArticles.value, ...staticArticles]
})

const projectTags = computed(() => {
  const tags = projects.value.flatMap(p => p.tags || [])
  return [words.value.all, ...new Set(tags)]
})

const exerciseTags = computed(() => {
  const tags = exercises.value.flatMap(e => e.tags || [])
  return [words.value.all, ...new Set(tags)]
})

const filteredProjects = computed(() => {
  let result = projects.value
  if (selectedProjectFilter.value !== words.value.all && selectedProjectFilter.value !== 'Todos' && selectedProjectFilter.value !== 'All' && selectedProjectFilter.value !== '全部') {
    result = result.filter(p => p.tags?.includes(selectedProjectFilter.value))
  }
  return result.slice().sort((a, b) => projectsOrder.value === 'asc' ? a.id - b.id : b.id - a.id)
})

const filteredExercises = computed(() => {
  let result = exercises.value
  if (selectedExerciseFilter.value !== words.value.all && selectedExerciseFilter.value !== 'Todos' && selectedExerciseFilter.value !== 'All' && selectedExerciseFilter.value !== '全部') {
    result = result.filter(e => e.tags?.includes(selectedExerciseFilter.value))
  }
  return result.slice().sort((a, b) => exercisesOrder.value === 'asc' ? a.id - b.id : b.id - a.id)
})

function getImagePath(key) {
  if (images.value && key in images.value === false) return ''
  try {
    const rawValue = images.value[key]
    const filename = rawValue ? rawValue.split('/').pop() : `${key}.png`
    return `/img/${filename}`
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
