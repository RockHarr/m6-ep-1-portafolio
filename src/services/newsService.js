const BASE_URL = 'https://gnews.io/api/v4'
const API_KEY = import.meta.env.VITE_GNEWS_API_KEY

// ─── Cache en localStorage ─────────────────────────────────────
// De esta forma las noticias persisten entre sesiones.
// TTL 1h — frescura razonable sin gastar la cuota gratuita (100 req/día).
const CACHE_KEY = 'portfolio_news_cache'
const CACHE_TTL = 60 * 60 * 1000 // 1 hora

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cache = JSON.parse(raw)
    if (Date.now() - cache.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return cache.data
  } catch {
    return null
  }
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }))
  } catch {
    // localStorage puede estar lleno o bloqueado — no es crítico
  }
}

/** Mapea la fecha ISO a formato legible 'DD MMM YYYY'. */
function formatearFecha(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Obtiene noticias de tecnología y economía usando GNews.io.
 * GNews sí permite fetch directo desde el browser en cualquier dominio.
 * Cache localStorage 1h para no gastar la cuota de 100 req/día.
 */
export async function fetchNoticias() {
  // 1. Intentar cache primero
  const cached = getCache()
  if (cached) return cached

  if (!API_KEY) {
    console.warn('[newsService] VITE_GNEWS_API_KEY no configurada — agrega tu token en .env')
    return []
  }

  try {
    // Dos queries: tecnología/informática + economía/negocios en español
    const techUrl = `${BASE_URL}/top-headlines?topic=technology&lang=es&max=4&apikey=${API_KEY}`
    const ecoUrl  = `${BASE_URL}/top-headlines?topic=business&lang=es&max=4&apikey=${API_KEY}`

    const [techRes, ecoRes] = await Promise.allSettled([
      fetch(techUrl),
      fetch(ecoUrl),
    ])

    const articulos = []

    for (const result of [techRes, ecoRes]) {
      if (result.status === 'fulfilled' && result.value.ok) {
        const data = await result.value.json()
        articulos.push(...(data.articles ?? []))
      }
    }

    // Deduplicar por URL
    const urlsVistas = new Set()
    const unicos = articulos.filter(a => {
      if (urlsVistas.has(a.url)) return false
      urlsVistas.add(a.url)
      return true
    })

    const resultado = unicos.map((article, index) => ({
      id: `gnews_${index}_${Date.now()}`,
      type: 'article',
      title: article.title,
      summary: article.description || 'Sin resumen disponible.',
      date: formatearFecha(article.publishedAt),
      url: article.url,
      image: article.image || '',
    }))

    setCache(resultado)
    return resultado
  } catch (e) {
    console.error('[newsService] Error al obtener noticias:', e)
    return []
  }
}

/** Limpia el cache manualmente (útil para testing o botón "refrescar"). */
export function clearNewsCache() {
  localStorage.removeItem(CACHE_KEY)
}
