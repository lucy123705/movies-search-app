const KEY = 'favorites_imdb_ids_v1'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isFavorite(imdbID) {
  return getFavorites().includes(imdbID)
}

export function addFavorite(imdbID) {
  const set = new Set(getFavorites())
  set.add(imdbID)
  localStorage.setItem(KEY, JSON.stringify([...set]))
}

export function removeFavorite(imdbID) {
  const set = new Set(getFavorites())
  set.delete(imdbID)
  localStorage.setItem(KEY, JSON.stringify([...set]))
}
