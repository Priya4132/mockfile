import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'


//creating the conetxt
const AuthContext=createContext();
const AuthContextProvider = ({children}) => {
    //setting state of login 
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    //setting state of token 
    const[token,setToken]=useState(null);

    //login function

    const login=(authToken)=>{
        setIsAuthenticated(true);
        setToken(authToken)
        localStorage.setItem("token",authToken)

    }
    const logout=()=>{
        setIsAuthenticated(false);
        setToken(null)
        localStorage.removeItem("token")
        
    }
    
  return (
    <AuthContext.Provider value={{isAuthenticated,login,logout,token}}> {children}</ AuthContext.Provider>
  )
}

export default AuthContextProvider
