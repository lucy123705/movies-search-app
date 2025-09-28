import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMovieById } from '../api/omdb.js'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites.js'

export default function MovieDetailsPage() {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fav, setFav] = useState(isFavorite(imdbID))

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true)
      setError('')
      try {
        const data = await getMovieById(imdbID)
        setMovie(data)
      } catch (err) {
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [imdbID])

  function toggleFav() {
    if (fav) removeFavorite(imdbID)
    else addFavorite(imdbID)
    setFav(!fav)
    window.dispatchEvent(new Event('favorites:update'))
  }

  if (loading) return <Loading label="Fetching details..." />
  if (error) return <ErrorMessage message={error} />
  if (!movie) return <div className="card p-6">No data.</div>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card overflow-hidden">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} className="w-full object-cover" />
        ) : (
          <div className="h-96 grid place-items-center text-slate-500">No Image</div>
        )}
      </div>

      <div className="md:col-span-2 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold">{movie.Title}</h1>
          <button onClick={toggleFav} className="btn btn-ghost">{fav ? '★ Remove' : '☆ Favorite'}</button>
        </div>

        <div className="card p-4 space-y-2">
          <div className="text-sm text-slate-700">
            {movie.Year} • {movie.Rated} • {movie.Runtime}
          </div>
          <div className="text-sm"><span className="badge">Genre</span> {movie.Genre}</div>
          <div className="text-sm"><span className="badge">Released</span> {movie.Released}</div>
          <div className="text-sm"><span className="badge">Language</span> {movie.Language}</div>
          <div className="text-sm"><span className="badge">Country</span> {movie.Country}</div>
        </div>

        <div className="card p-4">
          <h2 className="font-semibold mb-2">Plot</h2>
          <p className="text-sm leading-relaxed">{movie.Plot}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Cast</h3>
            <p className="text-sm">{movie.Actors}</p>
            <p className="text-sm mt-2"><span className="badge">Director</span> {movie.Director}</p>
            <p className="text-sm mt-1"><span className="badge">Writer</span> {movie.Writer}</p>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Ratings</h3>
            {Array.isArray(movie.Ratings) && movie.Ratings.length > 0 ? (
              <ul className="list-disc list-inside text-sm">
                {movie.Ratings.map((r, idx) => (
                  <li key={idx}><span className="font-medium">{r.Source}:</span> {r.Value}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-600">No ratings available.</p>
            )}
            <p className="text-sm mt-2"><span className="badge">IMDB</span> {movie.imdbRating} / 10</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/" className="btn btn-ghost">← Back to search</Link>
          {movie.Website && movie.Website !== 'N/A' && (
            <a className="btn btn-primary" href={movie.Website} target="_blank" rel="noreferrer">Official Website</a>
          )}
        </div>
      </div>
    </div>
  )
}
