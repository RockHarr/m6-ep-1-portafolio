<template>
  <div class="cv-page text-black bg-white min-h-screen">
    <div class="max-w-[800px] mx-auto p-12 bg-white print:max-w-none print:p-0 print:m-0">
      
      <!-- Control Panel (Hidden on Print) -->
      <div class="flex items-center justify-between mb-12 print:hidden pb-6 border-b border-gray-200">
        <button 
          @click="$router.push('/')"
          class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Volver al Portafolio
        </button>
        <button 
          @click="printCV"
          class="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Imprimir / PDF
        </button>
      </div>

      <!-- CV Header -->
      <header class="mb-10 text-center sm:text-left sm:flex sm:items-start sm:justify-between">
        <div>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight uppercase mb-2">
            {{ meta.author }}
          </h1>
          <h2 class="text-xl font-medium text-blue-700 mb-4">
            {{ meta.role }}
          </h2>
          <p class="text-sm text-gray-600 max-w-2xl leading-relaxed">
            {{ meta.bio }}
          </p>
        </div>
      </header>

      <!-- Contact Info Grid -->
      <div class="grid grid-cols-2 gap-4 mb-10 pb-8 border-b border-gray-200 text-sm text-gray-600">
        <div class="flex flex-col gap-2">
          <a :href="`mailto:${meta.email}`" class="flex items-center gap-2 hover:text-blue-600">
            <span class="font-semibold text-gray-900 w-16">Email:</span> {{ meta.email }}
          </a>
          <a :href="meta.web" class="flex items-center gap-2 hover:text-blue-600">
            <span class="font-semibold text-gray-900 w-16">Web:</span> {{ meta.web.replace('https://', '') }}
          </a>
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-gray-900 w-20">Ubicación:</span> {{ meta.location }}
          </div>
          <a v-if="social?.linkedin" :href="social.linkedin" class="flex items-center gap-2 hover:text-blue-600">
            <span class="font-semibold text-gray-900 w-20">LinkedIn:</span> linkedin.com/in/rockwell-harrison-rockcode
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
        <!-- Izquierda: Proyectos -->
        <main>
          <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6 uppercase tracking-wider">
            Experiencia & Proyectos
          </h3>
          
          <div class="flex flex-col gap-8">
            <article v-for="project in projects" :key="project.id" class="break-inside-avoid">
              <div class="flex justify-between items-baseline mb-2">
                <h4 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                  {{ project.icon }} {{ project.title }}
                </h4>
                <a v-if="project.demoUrl" :href="project.demoUrl" class="text-sm text-blue-600 hover:underline">
                  Ver Proyecto →
                </a>
              </div>
              <p class="text-sm text-gray-600 mb-3 leading-relaxed">
                {{ project.summary }}
              </p>
              <div class="flex gap-2 text-xs font-mono text-gray-500">
                <span v-for="tag in project.tags" :key="tag" class="bg-gray-100 px-2 py-0.5 rounded">
                  {{ tag }}
                </span>
              </div>
            </article>
          </div>
        </main>

        <!-- Derecha: Skills y Stats -->
        <aside>
          <!-- Skills -->
          <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6 uppercase tracking-wider">
            Habilidades
          </h3>
          <div class="flex flex-col gap-6 mb-10">
            <div v-for="cat in skills" :key="cat.category" class="break-inside-avoid">
              <h4 class="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">{{ cat.category }}</h4>
              <ul class="flex flex-col gap-2">
                <li v-for="skill in cat.items" :key="skill.name" class="flex justify-between items-center text-sm text-gray-600">
                  <span>{{ skill.name }}</span>
                  <!-- Small visual dots for level -->
                  <div class="flex gap-1">
                    <div v-for="i in 5" :key="i" class="w-1.5 h-1.5 rounded-full" 
                         :class="i <= Math.round(skill.level / 20) ? 'bg-gray-800' : 'bg-gray-200'">
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Educación / Opcional -->
          <h3 class="text-2xl font-bold text-gray-900 border-b-2 border-gray-900 pb-2 mb-6 uppercase tracking-wider">
            Formación
          </h3>
          <div class="text-sm text-gray-600 break-inside-avoid">
            <p class="font-bold text-gray-900">{{ meta.course }}</p>
            <p class="mb-1">Escuela DEV</p>
            <p class="text-gray-500">{{ meta.year }}</p>
          </div>
        </aside>
      </div>

      <!-- Footer for Print -->
      <footer class="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 hidden print:block">
        Este documento ha sido generado automáticamente desde {{ meta.web }}/cv
      </footer>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const meta = computed(() => t.value.meta)
const social = computed(() => t.value.social)
const skills = computed(() => t.value.skills)
const items = computed(() => t.value.items || [])

const projects = computed(() => items.value.filter(i => i.type === 'project').slice(0, 4)) // Top 4 projects

function printCV() {
  window.print()
}

onMounted(() => {
  // Opcional: Autoprint al cargar si viene con un parametro ?print=true
  if (window.location.search.includes('print=true')) {
    setTimeout(printCV, 500)
  }
})
</script>

<style scoped>
/* Reseteamos colores globables específicamente para esta vista de CV */
.cv-page {
  font-family: ui-sans-serif, system-ui, sans-serif;
  color-scheme: light;
}

@media print {
  @page {
    margin: 1cm;
    size: A4 portrait;
  }
  
  html, body {
    background: white !important;
  }

  /* Aseguramos que los links no muestren subrayados feos al imprimir */
  a {
    text-decoration: none !important;
    color: inherit !important;
  }

  /* Color print override para Tailwind */
  .text-gray-900 { color: #111827 !important; }
  .text-gray-600 { color: #4B5563 !important; }
  .text-gray-500 { color: #6B7280 !important; }
  .text-blue-700 { color: #1D4ED8 !important; }
  .bg-gray-100 { background-color: #F3F4F6 !important; }
  .bg-gray-800 { background-color: #1F2937 !important; }
  
  .print\:hidden {
    display: none !important;
  }
  .print\:block {
    display: block !important;
  }
}
</style>
