import { useContext, useState, useEffect, createContext } from "react";
import Spinner from '../components/Spinner.jsx';
import { account } from '../appwrite.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        checkUserStatus()
    }, [])

    const loginUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.createEmailPasswordSession(
                userInfo.email, 
                userInfo.password)

                let accountDetails = await account.get()

                console.log("accountDetails:", accountDetails)
                setUser(accountDetails)
        } catch (error) {
            console.error("Login error:", error)
        }
        setLoading(false)
    }

    const logoutUser = () => {}

    const registerUser = (userInfo) => {}

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.error("Error checking user status:", error)
        }
         setLoading(false)
    }

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