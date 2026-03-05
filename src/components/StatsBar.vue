<template>
  <div class="stats-bar py-14 sm:py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x sm:divide-ink-800">
        <ScrollReveal v-for="(stat, i) in stats" :key="stat.label" :delay="i * 100" class="text-center px-8">
          <p class="text-5xl sm:text-6xl font-black text-neon tracking-tighter leading-none">
            <CountUp :to="stat.value" :suffix="stat.suffix" :duration="1800" />
          </p>
          <p class="mt-3 text-sm text-ink-400 font-medium uppercase tracking-widest">
            {{ stat.label }}
          </p>
        </ScrollReveal>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * StatsBar.vue — Barra de estadísticas animadas
 * ──────────────────────────────────────────────
 * Renderiza los stats del JSON (proyectos, repos, módulos)
 * con la animación CountUp al entrar en viewport.
 * Usa ScrollReveal para el efecto de entrada escalonado.
 */
import CountUp from './CountUp.vue'
import ScrollReveal from './ScrollReveal.vue'

defineProps({
  stats: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.stats-bar {
  background: linear-gradient(
    180deg,
    var(--color-ink-950) 0%,
    var(--color-ink-900) 50%,
    var(--color-ink-950) 100%
  );
  border-top: 1px solid var(--color-ink-800);
  border-bottom: 1px solid var(--color-ink-800);
}
</style>
