// ─── Cache en localStorage ──────────────────────────────────────────
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
    /* localStorage lleno o bloqueado — no crítico */
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
 * Obtiene noticias a través del proxy serverless de Vercel (/api/news).
 * Esto evita el CORS de GNews en producción: el browser llama a tu propio
 * dominio y el servidor de Vercel hace el fetch a GNews internamente.
 * Cache localStorage 1h para no gastar la cuota de 100 req/día.
 */
export async function fetchNoticias() {
  console.log('[newsService] Iniciando fetch de noticias...')

  // 1. Cache primero
  const cached = getCache()
  if (cached) {
    console.log('[newsService] Usando cache, artículos:', cached.length)
    return cached
  }

  try {
    // Llamamos a nuestra propia API serverless de Vercel (sin CORS)
    // En localhost, Vite no tiene serverless, así que usamos la variable directa como fallback.
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY

    let techArticles = []
    let ecoArticles  = []

    if (isLocal && API_KEY) {
      // Desarrollo local: llamada directa a GNews (sin CORS en localhost)
      const BASE = 'https://gnews.io/api/v4'
      const [techRes, ecoRes] = await Promise.allSettled([
        fetch(`${BASE}/top-headlines?topic=technology&lang=es&max=4&apikey=${API_KEY}`),
        fetch(`${BASE}/top-headlines?topic=business&lang=es&max=4&apikey=${API_KEY}`),
      ])
      if (techRes.status === 'fulfilled' && techRes.value.ok) techArticles = (await techRes.value.json()).articles ?? []
      if (ecoRes.status  === 'fulfilled' && ecoRes.value.ok)  ecoArticles  = (await ecoRes.value.json()).articles  ?? []
    } else {
      // Producción: llamamos al proxy serverless de Vercel
      console.log('[newsService] Modo producción: llamando a /api/news')
      const [techRes, ecoRes] = await Promise.allSettled([
        fetch('/api/news?topic=technology&lang=es&max=4'),
        fetch('/api/news?topic=business&lang=es&max=4'),
      ])

      console.log('[newsService] Tech response:', techRes.status, techRes.value?.ok)
      console.log('[newsService] Eco response:', ecoRes.status, ecoRes.value?.ok)

      if (techRes.status === 'fulfilled' && techRes.value.ok) {
        const data = await techRes.value.json()
        console.log('[newsService] Tech data:', data)
        techArticles = data.articles ?? []
      }
      if (ecoRes.status === 'fulfilled' && ecoRes.value.ok) {
        const data = await ecoRes.value.json()
        console.log('[newsService] Eco data:', data)
        ecoArticles = data.articles ?? []
      }
    }

    // Deduplicar por URL
    const urlsVistas = new Set()
    const articulos = [...techArticles, ...ecoArticles].filter(a => {
      if (urlsVistas.has(a.url)) return false
      urlsVistas.add(a.url)
      return true
    })

    const resultado = articulos.map((article, index) => ({
      id:      `gnews_${index}_${Date.now()}`,
      type:    'article',
      title:   article.title,
      summary: article.description || 'Sin resumen disponible.',
      date:    formatearFecha(article.publishedAt),
      url:     article.url,
      image:   article.image || '',
    }))

    console.log('[newsService] Total artículos procesados:', resultado.length)

    setCache(resultado)
    return resultado
  } catch (e) {
    console.error('[newsService] Error al obtener noticias:', e)
    return []
  }
}

/** Limpia el cache manualmente. */
export function clearNewsCache() {
  localStorage.removeItem(CACHE_KEY)
}
