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
    const [loading, setloading] = useState(false)
    const router = useRouter();

    const checkAuthStatus = async () => {
        alert("checkAuthStatus bhi chala hai")
        try{
        const data = await fetch('http://localhost:5174/auth/Verify', {
            credentials: 'include',
            method: 'GET'
        })
        const response = await data.json();
        if (response.success) {
            console.log("Verify to chala hai bhai")
            setisAuthenticated(true)
            setloading(false)
        }
        else {
            setisAuthenticated(false);
            setloading(false)
        }}
        catch(err){
            alert(err.message);
        }
    }

      useEffect(() => {
        checkAuthStatus();
    }, []);
    const value ={
        isAuthenticated,
        loading,
        checkAuthStatus,

    }
    

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}