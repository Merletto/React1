import { useEffect, useState, useCallback } from "react"
import { getFavorites } from "../appwrite.js"
import { useAuth } from "../utils/AuthContext"
import MovieCard from '../components/MovieCard.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  }
}

const Profile = () => {
  const { user } = useAuth()
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState([])

  const loadFavorites = useCallback(async () => {
    if (!user) return
    const favs = await getFavorites(user.$id)
    setFavorites(favs)
    return favs
  }, [user])

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await loadFavorites()
      if (!favs?.length) return

      const moviesData = await Promise.all(
        favs.map(async (fav) => {
          const res = await fetch(`${API_BASE_URL}/movie/${fav.movie_id}`, API_OPTIONS)
          return res.json()
        })
      )
      setMovies(moviesData)
    }

    fetchFavorites()
  }, [loadFavorites])

  return (
    <main>
      <div className='pattern'/>
      <div className="profile-container">
        <section className='all-movies'>
          <div className="flex items-center justify-center relative z-10">
            <h1>Bienvenido, {user.name}</h1>
          </div>
          <h2>Peliculas favoritas</h2>
          <ul>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                favorites={favorites}
                onFavoriteChange={loadFavorites}
              />
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

export default Profile