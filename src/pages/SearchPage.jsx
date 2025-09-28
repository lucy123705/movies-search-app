import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import TypeFilter from '../components/TypeFilter.jsx'
import Pagination from '../components/Pagination.jsx'
import MovieCard from '../components/MovieCard.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { searchMovies } from '../api/omdb.js'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // total pages from OMDB (10 items per page)
  const totalPages = useMemo(() => {
    if (!data?.totalResults) return 0
    return Math.ceil(Number(data.totalResults) / 10)
  }, [data])

  async function doSearch(q, p = 1, t = type) {
    if (!q) {
      setData(null)
      setError('')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await searchMovies({ query: q, page: p, type: t })
      setData(res)
    } catch (err) {
      setData(null)
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(newQuery) {
    setQuery(newQuery)
    setPage(1)
    doSearch(newQuery, 1, type)
  }

  function handleTypeChange(newType) {
    setType(newType)
    setPage(1)
    if (query) doSearch(query, 1, newType)
  }

  function handlePageChange(newPage) {
    setPage(newPage)
    doSearch(query, newPage, type)
  }

  // re-render on favorites update for buttons
  const [, force] = useState(0)
  useEffect(() => {
    const fn = () => force(x => x + 1)
    window.addEventListener('favorites:update', fn)
    return () => window.removeEventListener('favorites:update', fn)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex-1">
          <SearchBar defaultQuery={query} onSearch={handleSearch} />
        </div>
        <TypeFilter value={type} onChange={handleTypeChange} />
      </div>

      {loading && <Loading label="Searching OMDB..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (!data || !data.Search) && (
        <EmptyState title="Search for a movie" subtitle="Try 'Inception', 'Avengers', or 'Harry Potter'." />
      )}

      {!loading && !error && data?.Search && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.Search.map((m) => (
              <MovieCard key={m.imdbID} movie={m} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}
