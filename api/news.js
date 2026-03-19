// api/news.js — Vercel Serverless Function
// El browser llama a /api/news (tu propio dominio, sin CORS).
// Esta función hace el fetch a GNews desde el servidor y retorna el JSON.

export default async function handler(req, res) {
  const API_KEY = process.env.VITE_GNEWS_API_KEY

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const query = req.query.topic || 'technology'
    const lang  = req.query.lang  || 'es'
    const max   = req.query.max   || '5'

    const url = `https://gnews.io/api/v4/top-headlines?topic=${query}&lang=${lang}&max=${max}&apikey=${API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
      return res.status(response.status).json({ error: 'GNews error', status: response.status })
    }

    const data = await response.json()

    // Cache 1 hora en el CDN de Vercel — ahorra cuota de la API
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
