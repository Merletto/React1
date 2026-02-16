import React from 'react'
import Search from './components/Search.jsx'
import { useEffect, useState } from 'react'
import Spinner from './components/Spinner.jsx';
import MovieCard from './components/MovieCard.jsx';

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  }
}

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setmovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const fetchMovies = async () => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }

      const data = await response.json();
      
      if(data.response === "False") {
        setErrorMessage(data.error || "No se encontraron películas.");
        setmovieList([]);
        return;
      }
      setmovieList(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Ocurrió un error al buscar las películas. Por favor, inténtalo de nuevo.");
    } finally {
      setisLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <div className='pattern'/>
      
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>Encuentra <span className="text-gradient"> Peliculas </span>que disfrutaras sin problemas</h1>

          <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className='all-movies'>
          <h2 className='mt-40px'>Todas las peliculas</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}; 
            </ul>
          )}
        </section>        
      </div>
      
    </main>
  )
}

export default App