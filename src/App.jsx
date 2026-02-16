import React from 'react'
import Search from './components/Search.jsx'
import { useState } from 'react'

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("")

  return (
    <main>
      <div className='pattern'/>
      
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>Encuentra <span className="text-gradient"> Peliculas </span>Que disfrutaras sin problemas</h1>
        </header>

        <Search SearchTerm={SearchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      
    </main>
  )
}

export default App