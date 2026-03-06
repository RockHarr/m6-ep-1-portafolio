<!--
  CardsGrid.vue — Contenedor grid responsive para las cards
  ──────────────────────────────────────────────────────────
  Responsabilidades:
  1) Recibe un array de items por props
  2) Los renderiza con v-for (REQUISITO PDF: render dinámico)
  3) Pasa cada item como props individuales a InfoCard
  4) Maneja el layout responsive: 1 col → 2 cols → 3 cols

  MEJORA #1 aplicada: TransitionGroup con stagger para entrada
  escalonada de las cards al cargar la sección.

  NOTA PEDAGÓGICA: TransitionGroup es como Transition pero para listas.
  Vue aplica las clases de transición a cada elemento del v-for
  cuando se agregan/remueven del DOM.
-->
<template>
  <!--
    TransitionGroup renderiza las cards con animación stagger.
    tag="div" indica que el contenedor será un <div> (default es <span>).
    Las clases card-enter-* están en style.css (tokens globales).
  -->
  <TransitionGroup
    name="card"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <!--
      REQUISITO PDF: v-for — itera sobre los items filtrados.
      :key es obligatorio en v-for y debe ser único (usamos item.id).
      El :style con transitionDelay crea el efecto stagger (Mejora #1):
      cada card espera un poco más que la anterior antes de aparecer.
    -->
    <InfoCard
      v-for="(item, index) in items"
      :key="item.id"
      :title="item.title"
      :summary="item.summary"
      :tags="item.tags"
      :type="item.type"
      :status="item.status"
      :icon="item.icon"
      :repo-url="item.repoUrl"
      :demo-url="item.demoUrl"
      :style="{ transitionDelay: index * 80 + 'ms' }"
    />
  </TransitionGroup>
</template>

<script setup>
/**
 * CardsGrid solo se encarga del layout y la iteración.
 * Los datos de cada card se pasan como props individuales a InfoCard,
 * cumpliendo el requisito de "cards por props" del PDF.
 */
import InfoCard from './InfoCard.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/*
 * El grid responsive se maneja con las clases de Tailwind:
 * - 1 columna por defecto (mobile)
 * - 2 columnas desde sm (640px)
 * - 3 columnas desde lg (1024px)
 * El gap de 1.5rem (24px) da respiro visual entre cards.
 */
</style>
