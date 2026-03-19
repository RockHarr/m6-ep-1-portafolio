const BASE_URL = 'https://newsapi.org/v2'
const API_KEY = import.meta.env.VITE_NEWS_API_KEY

/** Mapea la fecha ISO de NewsAPI a formato legible 'DD MMM YYYY'. */
function formatearFecha(isoDate) {
  if (!isoDate) return ''
  return new Date(isoDate).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Obtiene noticias de tecnología usando NewsAPI
 */
export async function fetchNoticias() {
  if (!API_KEY) {
    console.warn('[newsService] VITE_NEWS_API_KEY no configurada — agrega tu token en .env')
    return []
  }

  try {
    // Hacemos dos peticiones simultáneas:
    // 1. Titulares destacados de Negocios (Economía)
    // 2. Titulares destacados de Tecnología (Informática/Software)
    // Nota: NewsAPI para titulares (top-headlines) requiere elegir un país (ej. mx, ar, co, es, us) 
    // o podemos usar 'everything' pero siendo mucho más estrictos con las palabras para evitar ruido.
    
    // Búsqueda estricta en el título para evitar noticias de otros temas donde solo se menciona la palabra.
    const query = encodeURIComponent('intitle:tecnología OR intitle:economía OR intitle:informática OR "desarrollo web"')
    const url = `${BASE_URL}/everything?q=${query}&language=es&sortBy=publishedAt&pageSize=6&apiKey=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Error en la petición a NewsAPI: ${response.status}`)
    }

    const data = await response.json()

    // Filtra artículos que hayan sido removidos
    const validArticles = (data.articles || []).filter(a => a.title !== '[Removed]')

    return validArticles.map((article, index) => ({
      id: `newsapi_${index}_${Date.now()}`,
      type: 'article',
      title: article.title,
      summary: article.description || 'Sin resumen disponible.',
      date: formatearFecha(article.publishedAt),
      url: article.url,
      // Aunque portfolio.json tiene 'image', ArticleCard no la requiere como obligatoria.
      // Se puede incluir urlToImage por si se necesita más adelante.
      image: article.urlToImage || 'https://placehold.co/600x400/1a1a1a/666666?text=Noticia'
    }))
  } catch (e) {
    console.error('[newsService] Error al obtener noticias:', e)
    return []
  }
}
