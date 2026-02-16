import React from 'react'
import Search from './components/Search.jsx'
import { useEffect, useState } from 'react'

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

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error(`Failed to fetch movies`);
      }

      const data = await response.json();
      
      console.log(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Ocurrió un error al buscar las películas. Por favor, inténtalo de nuevo.");
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
          <h2>Todas las peliculas</h2>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </section>        
      </div>
      
    </main>
  )
}

export default App