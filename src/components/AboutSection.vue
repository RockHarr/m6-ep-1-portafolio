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
            <!-- Si no hay imagen, mostrar placeholder elegante -->
            <div v-if="!imageSrc || imageError" class="text-ink-500 text-6xl">
                👤
            </div>
            <img 
              v-else 
              :src="imageSrc" 
              alt="Foto de perfil" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
