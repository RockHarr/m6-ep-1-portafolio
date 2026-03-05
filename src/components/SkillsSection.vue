<!--
  SkillsSection.vue — Sección de habilidades técnicas
  ────────────────────────────────────────────────────
  Renderiza las habilidades curadas del JSON en categorías,
  con barras de progreso animadas al entrar en viewport.

  Anatomía del profe (referencia): "Skills: Solo tecnologías
  relevantes al puesto que buscas." — Sección #2.
-->
<template>
  <section id="skills" class="py-16 sm:py-24 scroll-mt-20">
    <div class="max-w-6xl mx-auto px-6">
      <ScrollReveal>
        <SectionHeader
          title="Skills"
          subtitle="Tecnologías y herramientas relevantes en mi stack actual"
        />
      </ScrollReveal>

      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        <div v-for="(group, gi) in skills" :key="group.category">
          <ScrollReveal :delay="gi * 100">
            <!-- Encabezado de categoría -->
            <h3 class="text-xs font-bold uppercase tracking-widest text-neon mb-6 font-mono">
              / {{ group.category }}
            </h3>

            <!-- Lista de skills con barras animadas -->
            <ul class="space-y-4">
              <li v-for="(skill, si) in group.items" :key="skill.name">
                <ScrollReveal :delay="gi * 100 + si * 50">
                  <div class="flex justify-between items-center mb-1.5">
                    <span class="text-sm font-medium text-ink-200">{{ skill.name }}</span>
                    <!-- 5 bloques de cursor de terminal como indicador visual -->
                    <div class="flex gap-1.5" :aria-label="`${Math.round(skill.level / 20)} de 5`">
                      <div
                        v-for="i in 5"
                        :key="i"
                        class="w-1.5 h-4 rounded-[1px] transition-all duration-700"
                        :class="i <= Math.round(skill.level / 20) 
                          ? 'bg-neon drop-shadow-[0_0_5px_rgba(0,229,255,0.4)] dark:drop-shadow-[0_0_5px_rgba(0,102,204,0.4)] cursor-blink' 
                          : 'bg-ink-800'"
                        :style="{ animationDelay: `${(gi * 100) + (si * 50) + (i * 100)}ms` }"
                      ></div>
                    </div>
                  </div>
                </ScrollReveal>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ScrollReveal from './ScrollReveal.vue'
import SectionHeader from './SectionHeader.vue'

defineProps({
  skills: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.cursor-blink {
  animation: cursor-blink 2s cubic-bezier(0.4, 0, 0.2, 1) infinite forwards;
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink {
    animation: none;
  }
}
</style>
