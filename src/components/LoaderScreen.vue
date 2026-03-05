<template>
  <div class="fixed inset-0 z-[100] bg-ink-950 flex flex-col items-center justify-center transition-colors duration-500">
    <!-- Contenedor animado -->
    <div class="flex flex-col items-center gap-6 animate-pulse-slow">
      <!-- Logo RH animado -->
      <div class="relative w-20 h-20 flex items-center justify-center">
        <!-- Aro exterior brillante -->
        <div class="absolute inset-0 border-2 border-neon/30 rounded-full animate-spin-slow"></div>
        <div class="absolute inset-2 border-t-2 border-neon rounded-full animate-spin-fast"></div>
        <!-- Texto central -->
        <span class="text-3xl font-black text-neon tracking-widest uppercase font-mono relative z-10">
          RH
        </span>
      </div>
      
      <!-- Loading Text -->
      <div class="flex flex-col items-center gap-2">
        <p class="text-ink-300 text-sm tracking-[0.3em] uppercase font-medium">Iniciando</p>
        <!-- Progress bar line -->
        <div class="w-32 h-[2px] bg-ink-800 rounded-full overflow-hidden">
          <div class="w-full h-full bg-neon origin-left animate-progress"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-pulse-slow {
  animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}

.animate-spin-slow {
  animation: spin 4s linear infinite;
}

.animate-spin-fast {
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-progress {
  animation: progress 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes progress {
  0% { transform: scaleX(0); }
  50% { transform: scaleX(0.7); }
  100% { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .animate-pulse-slow,
  .animate-spin-slow,
  .animate-spin-fast,
  .animate-progress {
    animation: none;
    transform: none;
  }
}
</style>
