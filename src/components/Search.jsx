import React from 'react'

const Search = ({SearchTerm, setSearchTerm}) => {
  return (
    <div className="search">
        <div>
          <img src="search.svg" alt="Icono de busqueda"/>  

          <input 
          type="text"
          placeholder='Busca entre miles de peliculas'
          value={SearchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
    </div>
  )
}

export default Search   