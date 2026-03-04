import { useContext, useState, useEffect, createContext } from "react";
import Spinner from '../components/Spinner.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(false)
    }, [])

    const loginUser = (userInfo) => {}

    const logoutUser = () => {}

    const registerUser = (userInfo) => {}

    const checkUserStatus = () => {}

    const contextData = {
        user,
        loginUser,
        logoutUser,
        registerUser
        
    }
    
  return (
  <AuthContext.Provider value={contextData}>
    {loading ? <Spinner/> : children}
  </AuthContext.Provider>
  )  
}

export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext;