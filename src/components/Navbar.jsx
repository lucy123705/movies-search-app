import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="container-narrow flex items-center justify-between py-3">
        <NavLink to="/" className="text-xl font-bold">🎬 Movies</NavLink>
        <div className="flex items-center gap-4">
          <NavLink to="/" className={({isActive}) => isActive ? 'link font-semibold' : 'link'}>Search</NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? 'link font-semibold' : 'link'}>Favorites</NavLink>
        </div>
      </div>
    </nav>
  )
}
