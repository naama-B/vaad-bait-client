import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User, userLoginInput } from "./model/interfaces";
import { loginSer, Me } from "./service/user";
import { Navigate, useLocation } from "react-router";
interface AuthContextType{
    user:User|null,
    token:string|null
    login: (u:userLoginInput) => void,
    logout: () => void
}
export const AuthContext=createContext<AuthContextType>({user:null,token:null,login:()=>{},logout:()=>{}})

export const AuthProvider=({children }: { children: ReactNode })=>{
    const [user,setuser]=useState<User|null>(null)
    const [token,settoken]=useState<string|null>(sessionStorage.getItem('token'))
    const [loading,setloading]=useState(token != null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const u = await Me()
                setuser(u)
            } catch {
                logout()
            } finally {
                setloading(false)
            }
        }
        if (token) getUser()
    }, [])

    const login=async (u:userLoginInput)=>{

      const res=await loginSer(u)
      sessionStorage.setItem('token', res.token)
      settoken(res.token)
      setuser(res.user)
    }

    const logout=()=>{
        sessionStorage.removeItem('token')
        settoken(null)
        setuser(null)
    }

       const location = useLocation()

        if (loading) return <p className="state-loading pt-40">טוען...</p>
const isAuthenticated = token != null
if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" />
}
    return <AuthContext.Provider value={{  user, login, logout, token }}>{children}</AuthContext.Provider>
}


