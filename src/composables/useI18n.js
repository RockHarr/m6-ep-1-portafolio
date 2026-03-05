import { ref, computed } from 'vue'
import portfolioData from '../assets/portfolio.json'

// Recuperar el idioma almacenado o por defecto "es"
const savedLocale = localStorage.getItem('locale') || 'es'
const locale = ref(savedLocale)

export function useI18n() {
    const setLocale = (l) => {
        locale.value = l
        localStorage.setItem('locale', l)
    }

    // Retorna todo el bloque de datos correspondiente al idioma actual
    const t = computed(() => {
        return portfolioData[locale.value] || portfolioData['es']
    })

    return {
        locale,
        setLocale,
        t
    }
}
