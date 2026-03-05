<!--
  ContactSection.vue — Formulario de contacto conectado a Formspree
  ─────────────────────────────────────────────────────────────────
  Envía los datos al endpoint de Formspree sin backend propio.
  Reemplaza YOUR_FORM_ID por el ID que te da Formspree en tu dashboard.
-->
<template>
  <section
    id="contacto"
    class="py-16 sm:py-24 max-w-2xl mx-auto px-6 scroll-mt-20"
  >
    <!-- Encabezado -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-ink-100">
        ✉️ Contacto
      </h2>
      <p class="text-ink-400 mt-3 text-base">
        ¿Tienes un proyecto en mente? Escríbeme y te respondo pronto.
      </p>
    </div>

    <!-- ── Formulario ── -->
    <form
      @submit.prevent="handleSubmit"
      class="bg-ink-900 border border-ink-700 rounded-2xl p-8 space-y-6 shadow-xl"
      novalidate
    >
      <!-- Nombre -->
      <div class="space-y-1">
        <label for="contact-name" class="text-sm text-ink-300 font-medium">
          Nombre
        </label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          name="name"
          placeholder="Tu nombre"
          required
          :disabled="state === 'sending'"
          class="w-full bg-ink-800 border rounded-lg px-4 py-3 text-ink-100 placeholder-ink-600
                 focus:outline-none focus:ring-2 focus:ring-neon/60 transition-colors duration-200
                 disabled:opacity-50"
          :class="errors.name ? 'border-red-500' : 'border-ink-700'"
        />
        <p v-if="errors.name" class="text-xs text-red-400">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div class="space-y-1">
        <label for="contact-email" class="text-sm text-ink-300 font-medium">
          Email
        </label>
        <input
          id="contact-email"
          v-model="form.email"
          type="email"
          name="email"
          placeholder="tu@email.com"
          required
          :disabled="state === 'sending'"
          class="w-full bg-ink-800 border rounded-lg px-4 py-3 text-ink-100 placeholder-ink-600
                 focus:outline-none focus:ring-2 focus:ring-neon/60 transition-colors duration-200
                 disabled:opacity-50"
          :class="errors.email ? 'border-red-500' : 'border-ink-700'"
        />
        <p v-if="errors.email" class="text-xs text-red-400">{{ errors.email }}</p>
      </div>

      <!-- Mensaje -->
      <div class="space-y-1">
        <label for="contact-message" class="text-sm text-ink-300 font-medium">
          Mensaje
        </label>
        <textarea
          id="contact-message"
          v-model="form.message"
          name="message"
          rows="5"
          placeholder="Cuéntame sobre tu proyecto..."
          required
          :disabled="state === 'sending'"
          class="w-full bg-ink-800 border rounded-lg px-4 py-3 text-ink-100 placeholder-ink-600
                 focus:outline-none focus:ring-2 focus:ring-neon/60 transition-colors duration-200
                 resize-none disabled:opacity-50"
          :class="errors.message ? 'border-red-500' : 'border-ink-700'"
        />
        <p v-if="errors.message" class="text-xs text-red-400">{{ errors.message }}</p>
      </div>

      <!-- Botón de envío -->
      <button
        type="submit"
        :disabled="state === 'sending'"
        class="w-full py-3 px-6 rounded-xl font-semibold text-ink-950 transition-all duration-200
               bg-neon hover:brightness-110 active:scale-95 focus:outline-none focus:ring-2
               focus:ring-neon/60 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="state === 'sending'" class="flex items-center justify-center gap-2">
          <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          Enviando…
        </span>
        <span v-else>Enviar mensaje →</span>
      </button>

      <!-- Feedback de estado -->
      <Transition name="fade">
        <div
          v-if="state === 'success'"
          role="alert"
          class="flex items-center gap-3 bg-green-500/10 border border-green-500/30 text-green-400
                 rounded-lg px-4 py-3 text-sm"
        >
          <span class="text-lg">✅</span>
          Mensaje enviado correctamente. ¡Te responderé pronto!
        </div>
        <div
          v-else-if="state === 'error'"
          role="alert"
          class="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400
                 rounded-lg px-4 py-3 text-sm"
        >
          <span class="text-lg">❌</span>
          Hubo un error al enviar. Intenta de nuevo o escríbeme a
          <a href="mailto:rockwell.harrison@gmail.com" class="underline">rockwell.harrison@gmail.com</a>
        </div>
      </Transition>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// ⚠️ Reemplaza este ID con el que te da Formspree en tu dashboard (https://formspree.io)
const FORMSPREE_ID = 'YOUR_FORM_ID'

const form = reactive({ name: '', email: '', message: '' })
const errors = reactive({ name: '', email: '', message: '' })
const state = ref('idle') // 'idle' | 'sending' | 'success' | 'error'

// Validación simple del lado cliente
function validate() {
  let valid = true
  errors.name    = form.name.trim()    ? '' : 'El nombre es obligatorio.'
  errors.email   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Ingresa un email válido.'
  errors.message = form.message.trim() ? '' : 'El mensaje no puede estar vacío.'
  if (errors.name || errors.email || errors.message) valid = false
  return valid
}

async function handleSubmit() {
  if (!validate()) return

  state.value = 'sending'

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
    })

    if (res.ok) {
      state.value = 'success'
      form.name = form.email = form.message = ''
    } else {
      state.value = 'error'
    }
  } catch {
    state.value = 'error'
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from,
.fade-leave-to    { opacity: 0; }
</style>
