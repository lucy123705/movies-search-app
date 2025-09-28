export default function ErrorMessage({ message }) {
  if (!message) return null
  return (
    <div className="card p-4 border-red-200 bg-red-50 text-red-800">
      <p className="font-medium">Something went wrong</p>
      <p className="text-sm">{message}</p>
    </div>
  )
}
