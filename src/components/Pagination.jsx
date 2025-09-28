export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button className="btn btn-ghost" disabled={!canPrev} onClick={() => onPageChange(page - 1)}>Prev</button>
      <span className="badge">Page {page} of {totalPages}</span>
      <button className="btn btn-ghost" disabled={!canNext} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  )
}
