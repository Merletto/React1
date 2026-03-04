import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login.jsx'
import Register from './pages/Register'
import PrivateRoutes from './utils/PrivateRoutes.jsx'

function App() {

  return (
    <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>

          <Route element={<PrivateRoutes/>}> 
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
        </Routes>
    </Router>
  )
}

export default App