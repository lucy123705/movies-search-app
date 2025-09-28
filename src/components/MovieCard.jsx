import { Link } from 'react-router-dom'
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites.js'

export default function MovieCard({ movie }) {
  const fav = isFavorite(movie.imdbID)

  function toggleFav() {
    if (fav) removeFavorite(movie.imdbID)
    else addFavorite(movie.imdbID)
    // Force a small UI update by reloading state via browser event.
    window.dispatchEvent(new Event('favorites:update'))
  }

  return (
    <div className="card overflow-hidden">
      <div className="aspect-[2/3] bg-slate-100">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={`${movie.Title} poster`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="h-full w-full grid place-items-center text-slate-500">No Image</div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <Link to={`/movie/${movie.imdbID}`} className="font-semibold hover:underline">{movie.Title}</Link>
        <div className="text-sm text-slate-600">{movie.Year} • <span className="uppercase">{movie.Type}</span></div>
        <div className="flex gap-2">
          <Link to={`/movie/${movie.imdbID}`} className="btn btn-ghost">Details</Link>
          <button onClick={toggleFav} className="btn btn-ghost">{fav ? '★ Remove' : '☆ Favorite'}</button>
        </div>
      </div>
    </div>
  )
}
