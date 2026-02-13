import { useEffect, useState } from "react"

const Card = ({title}) => {

  const [hasLiked, setHasLiked] = useState(false);
  const [count, setcount] = useState(0);
  

  useEffect( () => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked] /*Verifica que solo se ejecute cuando esa variable a 
  cambiado de valor */);

  return (
    <div className="card" onClick={() => setcount(count + 1)}>
    <h2>{title} - {count ? count: null}</h2>  
    <button onClick={() => setHasLiked(!hasLiked)}>
      {hasLiked ? "Liked" : "Like"}
    </button>
    </div>
  )
}

const App = () => {
  return (
      <div className="card-container">
        <Card title="Star wars" />
        <Card title="Avatar"/>
        <Card title="Titanic"/>
        
      </div>
  )
}

export default App
