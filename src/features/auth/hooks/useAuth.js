import { useContext } from "react";
import { AuthContext } from "../authContext";
import {login , register , logout , getMe} from "../services/authApis"
export const useAuth = () => {
    const context = AuthContext()
    const {user , setUser , loading , setLoading} = context

    const handleLogin = ({email , password}) => {
        setLoading(true)
    }
}