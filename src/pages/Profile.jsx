import { useEffect, useState } from "react"
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

  useEffect(() => {

    const fetchFavorites = async () => {

      const favorites = await getFavorites(user.$id)

      const moviesData = await Promise.all(
        favorites.map(async (fav) => {
          const res = await fetch(
            `${API_BASE_URL}/movie/${fav.movie_id}`,
            API_OPTIONS
          )
          return res.json()
        })
      )

      setMovies(moviesData)
    }

    if (user) {
      fetchFavorites()
    }

  }, [user])

  return (
    <main >
    <div className='pattern'/>
    <div className="profile-container">
    
    <section className='all-movies'>
          <h2>Peliculas favoritas</h2>
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}; 
            </ul>
          
    </section>
    </div>
    </main>
  )
}

export default Profile