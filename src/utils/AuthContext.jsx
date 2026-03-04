import { useContext, useState, useEffect, createContext } from "react";
import Spinner from '../components/Spinner.jsx';
import { account } from '../appwrite.js';
import { ID } from 'appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    const checkUserStatus = async () => {
        try {
            let accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.error("Error checking user status:", error)
        }
         setLoading(false)
    }

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

    const logoutUser = () => {
        account.deleteSession('current')
        setUser(null)
    }

    const registerUser = async (userInfo) => {
        setLoading(true)
        try {
            let response = await account.create(
                ID.unique(),
                userInfo.email,
                userInfo.password1,
                userInfo.name
            )

            await account.createEmailPasswordSession(
                userInfo.email, 
                userInfo.password1)

                let accountDetails = await account.get()
                setUser(accountDetails)
        } catch (error) {   
            console.error("Registration error:", error)
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