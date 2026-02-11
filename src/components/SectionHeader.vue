
<template>
  <header class="mb-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-5">
    <!-- Icono / Mascota de sección (opcional) -->
    <div v-if="imageSrc" class="relative group w-16 h-16 md:w-20 md:h-20 shrink-0">
        <!-- Glow effect -->
        <div class="absolute -inset-2 rounded-full opacity-50 blur-lg transition duration-500 group-hover:opacity-75"
             :class="glowColorClass"></div>
        
        <img :src="imageSrc" 
             :alt="`Icono de ${title}`" 
             class="relative w-full h-full object-contain animate-float"
             @error="hasImageError = true"
             v-if="!hasImageError"
        />
        <span v-else class="text-3xl">✨</span>
    </div>

    <!-- Texto cabecera -->
    <div class="text-center md:text-left flex-1">
      <h2 class="text-2xl sm:text-3xl font-bold text-ink-100 tracking-tight flex items-center justify-center md:justify-start gap-2">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="text-ink-400 mt-2 text-base">
        {{ subtitle }}
      </p>
      <!-- Línea decorativa con acento neon -->
      <div class="section-divider mt-4 mx-auto md:mx-0" aria-hidden="true"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  sectionId: {
    type: String,
    default: ''
  },
  imageSrc: {
    type: String,
    default: ''
  }
})

const hasImageError = ref(false)

// Color de glow dinámico según la sección (Nexus morado, Spark amarillo)
const glowColorClass = computed(() => {
    // Si la imagen es Spark (ejercicios), glow amarillo
    if (props.imageSrc.includes('spark')) return 'bg-yellow-500/40'
    // Si la imagen es Nexus (proyectos), glow morado/cyan
    if (props.imageSrc.includes('nexus')) return 'bg-purple-500/40'
    return 'bg-neon/30'
})
</script>

<style scoped>
/* Animación flotante suave */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/*
 * Línea decorativa que marca el inicio de cada sección.
 * Usa un gradiente del accent neon que se desvanece a transparente,
 * creando un efecto visual sutil pero con carácter.
 */
.section-divider {
  height: 3px;
  width: 60px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    var(--color-neon) 0%,
    var(--color-neon-dim) 50%,
    transparent 100%
  );
}
</style>
