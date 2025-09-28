import { Routes, Route, NavLink } from 'react-router-dom'
import SearchPage from './pages/SearchPage.jsx'
import MovieDetailsPage from './pages/MovieDetailsPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-slate-200">
        <div className="container-narrow flex items-center justify-between py-3">
          <NavLink to="/" className="text-xl font-bold">🎬 Movies</NavLink>
          <div className="flex items-center gap-4">
            <NavLink to="/" className={({isActive}) => isActive ? 'link font-semibold' : 'link'}>Search</NavLink>
            <NavLink to="/favorites" className={({isActive}) => isActive ? 'link font-semibold' : 'link'}>Favorites</NavLink>
          </div>
        </div>
      </nav>

      <main className="container-narrow py-6">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<div className="card p-6">Not found.</div>} />
        </Routes>
      </main>
    </div>
  )
}
