const API_KEY = 'fea6abd1';  // your OMDB API key
const BASE_URL = 'https://www.omdbapi.com';  // no trailing slash

function buildUrl(params) {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({ apikey: API_KEY, ...params }).toString();
  return url.toString();
}

async function request(params) {
  const url = buildUrl(params);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const data = await res.json();

  // OMDB returns { Response: "False", Error: "Movie not found!" }
  if (data.Response === 'False') {
    const err = new Error(data.Error || 'OMDB error');
    err.code = 'OMDB_ERROR';
    throw err;
  }

  return data;
}

// Search movies by query and page. Optionally specify type (movie|series|episode)
export async function searchMovies({ query, page = 1, type }) {
  const params = { s: query, page: String(page) };
  if (type && type !== 'all') params.type = type; // delegate filtering to API
  return request(params);
}

// Get full details by IMDb ID
export async function getMovieById(imdbID) {
  return request({ i: imdbID, plot: 'full' });
}