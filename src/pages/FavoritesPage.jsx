import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites, removeFavorite } from '../utils/favorites.js'
import { getMovieById } from '../api/omdb.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

export default function FavoritesPage() {
  const [ids, setIds] = useState(getFavorites())
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fn = () => {
      setIds(getFavorites())
    }
    window.addEventListener('favorites:update', fn)
    return () => window.removeEventListener('favorites:update', fn)
  }, [])

  useEffect(() => {
    async function loadAll() {
      if (ids.length === 0) {
        setMovies([])
        return
      }
      setLoading(true)
      setError('')
      try {
        const results = []
        for (const id of ids) {
          try {
            const m = await getMovieById(id)
            results.push(m)
          } catch { /* ignore single failures */ }
        }
        setMovies(results)
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [ids])

  function remove(id) {
    removeFavorite(id)
    window.dispatchEvent(new Event('favorites:update'))
  }

  if (loading) return <Loading label="Loading favorites..." />
  if (error) return <ErrorMessage message={error} />

  if (ids.length === 0) {
    return (
      <div className="card p-6">
        <p className="font-semibold">No favorites saved.</p>
        <p className="text-sm text-slate-600 mt-1">Go to the <Link to="/" className="link">Search</Link> page and add a few!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {movies.map((m) => (
        <div key={m.imdbID} className="card overflow-hidden">
          <div className="aspect-[2/3] bg-slate-100">
            {m.Poster && m.Poster !== 'N/A' ? (
              <img src={m.Poster} alt={`${m.Title} poster`} className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="h-full w-full grid place-items-center text-slate-500">No Image</div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <Link to={`/movie/${m.imdbID}`} className="font-semibold hover:underline">{m.Title}</Link>
            <div className="text-sm text-slate-600">{m.Year} • <span className="uppercase">{m.Type}</span></div>
            <div className="flex gap-2">
              <Link to={`/movie/${m.imdbID}`} className="btn btn-ghost">Details</Link>
              <button onClick={() => remove(m.imdbID)} className="btn btn-ghost">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
