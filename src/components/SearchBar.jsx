import { useState } from 'react'

export default function SearchBar({ defaultQuery = '', onSearch }) {
  const [query, setQuery] = useState(defaultQuery)

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="input"
        placeholder="Search for movies, series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search movies"
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  )
}
