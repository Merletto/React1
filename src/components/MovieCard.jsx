import React from 'react'
import { useAuth } from '../utils/AuthContext.jsx';
import { toggleFavorite } from '../appwrite.js';

const MovieCard = ({movie: { title, vote_average, poster_path, release_date, original_language, id }}) => {

    const { user } = useAuth()

    const handleLike = async () => {
    if (!user) {
      alert("Debes iniciar sesión")
      return
    }

    await toggleFavorite({ id, title, poster_path }, user.$id)
  }
  return (
    <div className='movie-card'>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/no-movie.png'} alt={title} />

        <div className='mt-4'>
            <h3 >{title}</h3>

            <div className='content'>
                <div className='rating'>
                    <img src="star.svg" alt="Star icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                </div>

                <span>•</span>
                <p className='lang'>{original_language}</p>

                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                
                <span>•</span>
                <button onClick={handleLike}>
                ❤️🤍
                </button>

            </div>
        </div>
    </div>

    
  )
}

export default MovieCard