export default function EmptyState({ title = 'No results', subtitle }) {
  return (
    <div className="card p-6 text-center">
      <p className="font-semibold">{title}</p>
      {subtitle && <p className="text-sm text-slate-600 mt-1">{subtitle}</p>}
    </div>
  )
}
