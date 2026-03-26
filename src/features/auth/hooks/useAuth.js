import { useContext } from "react";
import {login , register , logout , getMe} from "../services/authApis"
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

export const useAuth = () => {
    const navigate = useNavigate()
    const context = useContext(AuthContext)
    const {user , setUser , loading , setLoading} = context

    const handleLogin = async({email , password}) => {
        setLoading(true)
        try {
        const data = await login({email , password});
        setUser(data)    
          navigate("/")      
        } catch (error) {
           
            
        } finally {
            setLoading(false)
        }
    }
    const handleRegister = async({userName , email , password}) => {
        setLoading(true)
        try {          
            const data = await register({userName , email , password})
            setUser(data)
            navigate("/login")
        } catch (error) {
            
            
        } finally  {
            setLoading(false)
        }
    }
    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout();
            setUser(null)
        } catch (error) {
            console.log(error);
            
        } finally {          
            setLoading(false)
        }
        
    }
    return {user , loading , handleRegister , handleLogin , handleLogout}
}