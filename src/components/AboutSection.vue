<!--
  AboutSection.vue — Sección "Sobre Mí" con ilustración de perfil
  ──────────────────────────────────────────────────────────────
  Nueva sección (Hito 9) para integrar la ilustración personal del autor.
  Diseño: Grid 2 columnas (foto izq, bio der) con marco neon sutil.
-->
<template>
  <section class="max-w-6xl mx-auto px-6 py-16 sm:py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      <!-- Columna Imagen: Ilustración con marco neon -->
      <div class="relative group mx-auto md:mx-0 w-full max-w-sm">
        <!-- Marco decorativo -->
        <div class="absolute -inset-1 bg-gradient-to-r from-neon via-purple-500 to-pink-500 rounded-2xl opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
        
        <!-- Imagen de perfil -->
        <div class="relative bg-ink-900 rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-ink-700">
            <!-- Placeholder elegante cuando no hay imagen -->
            <div v-if="!imageSrc || imageError" class="flex flex-col items-center justify-center gap-3 text-ink-500 px-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-24 h-24 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
              <span class="text-xs tracking-widest uppercase opacity-50">Foto por colocar</span>
            </div>
            <img 
              v-else 
              :src="imageSrc" 
              alt="Foto de perfil" 
              class="profile-image w-full h-full object-cover transition-transform duration-500 -scale-x-100 hover:scale-x-[-1.05] hover:scale-y-[1.05] group-hover:-scale-x-[1.05] group-hover:scale-y-[1.05]"
              @error="handleImageError"
            />
        </div>
      </div>

      <!-- Columna Bio: Texto de presentación -->
      <div class="text-center md:text-left space-y-6">
        <h2 class="text-3xl font-bold text-ink-100 flex items-center justify-center md:justify-start gap-3">
          Sobre Mí
          <span class="text-2xl animate-bounce">👋</span>
        </h2>
        
        <p class="text-lg text-ink-300 leading-relaxed">
          {{ bio }}
        </p>

        <!-- Stats o detalles extra (opcional) -->
        <div class="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
          <div class="bg-ink-800 px-4 py-2 rounded-lg border border-ink-700 text-sm">
            🚀 <strong>Frontend</strong> Focus
          </div>
          <div class="bg-ink-800 px-4 py-2 rounded-lg border border-ink-700 text-sm">
            🎨 <strong>UI/UX</strong> Lover
          </div>
          <div class="bg-ink-800 px-4 py-2 rounded-lg border border-ink-700 text-sm">
            💻 <strong>Vue 3</strong> Enthusiast
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  bio: {
    type: String,
    required: true
  },
  imagePath: {
    type: String,
    default: ''
  }
})

// Manejo de error de carga de imagen
const imageError = ref(false)
function handleImageError() {
  imageError.value = true
}

// Resolver path de imagen (Vite assets)
const imageSrc = computed(() => {
    if (!props.imagePath) return null
    // Si viene del JSON como /src/..., intentar resolverlo
    // Nota: en producción esto requiere manejo de assets de Vite
    return props.imagePath
})
</script>

