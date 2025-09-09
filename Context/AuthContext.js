"use client "
import { useContext, createContext, useState, useEffect } from "react"
import { Router, useRouter } from "next/router";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [loading, setloading] = useState(true)
    const router = useRouter();

    const checkAuthStatus = async () => {
        const data = await fetch('http://localhost:3000/verification', {
            credentials: 'include',
            method: 'GET'
        })
        const response = await data.json();
        if (data.success) {
            setisAuthenticated(true)
            setloading(false)
        }
        else {
            setisAuthenticated(false);
            setloading(false)
        }
    }
    const value ={
        isAuthenticated,
        loading,
        checkAuthStatus
    }

    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}