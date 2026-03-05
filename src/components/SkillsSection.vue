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
                  <div class="flex justify-between items-baseline mb-1.5">
                    <span class="text-sm font-medium text-ink-200">{{ skill.name }}</span>
                    <span class="text-xs text-ink-500 font-mono">{{ skill.level }}%</span>
                  </div>
                  <div class="skill-track">
                    <div
                      class="skill-bar"
                      :style="`--target: ${skill.level}%`"
                    />
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
.skill-track {
  width: 100%;
  height: 3px;
  background: var(--color-ink-800);
  border-radius: 999px;
  overflow: hidden;
}

.skill-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--color-neon), rgba(0, 210, 190, 0.6));
  border-radius: 999px;
  /* Dispatch animation with a slight delay for stagger */
  animation: grow-bar 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: inherit;
}

@keyframes grow-bar {
  from { width: 0%; }
  to   { width: var(--target); }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .skill-bar {
    animation: none;
    width: var(--target);
  }
}
</style>
