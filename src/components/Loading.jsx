export default function Loading({ label = 'Loading...' }) {
  return (
    <div className="card p-6 text-center">
      <div className="animate-pulse text-sm text-slate-600">{label}</div>
    </div>
  )
}
