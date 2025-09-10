"use client"
import { useContext, createContext, useState, useEffect } from "react"
import {  useRouter } from "next/navigation";
const AuthContext = createContext();

export const useAuth=()=>{
        const context=useContext(AuthContext)
        if(!context){
            throw new Error("Use Auth must be used within AuthProivder")
        }
        return context
}

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [loading, setloading] = useState(true)
    const router = useRouter();

    const checkAuthStatus = async () => {
        const data = await fetch('https://footsense.onrender.com/auth/Verify', {
            credentials: 'include',
            method: 'GET'
        })
        const response = await data.json();
        if (response.success) {
            setisAuthenticated(true)
            setloading(false)
        }
        else {
            setisAuthenticated(false);
            setloading(false)
        }
    }
      useEffect(() => {
        checkAuthStatus();
    }, []);
    const value ={
        isAuthenticated,
        loading,
        checkAuthStatus
    }

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}