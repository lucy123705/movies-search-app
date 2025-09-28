/**
 * TypeFilter: Delegates filtering to the OMDB API via the 'type' param.
 * Allowed values: 'all' | 'movie' | 'series' | 'episode'
 * (We do NOT use Array.filter() anywhere for results filtering.)
 */
export default function TypeFilter({ value, onChange }) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by type"
      title="Filter by type"
    >
      <option value="all">All Types</option>
      <option value="movie">Movies</option>
      <option value="series">Series</option>
      <option value="episode">Episodes</option>
    </select>
  )
}
