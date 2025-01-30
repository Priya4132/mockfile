import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'


//creating the conetxt
const AuthContext1=createContext();
const AuthContext = ({children}) => {
    //setting state of login 
    const[isAuthenticated,setIsAuthenticated]=useState(false);
    //setting state of token 
    const[token,setToken]=useState(null);

    //login function

    const login=()=>{
        setIsAuthenticated(true);
        setToken(token)

    }
    const logout=()=>{
        setIsAuthenticated(false);
        setToken(null)
        
    }
    
  return (
    <AuthContext1.Provider value={{isAuthenticated,login,logout,token}}> {children}</ AuthContext1.Provider>
  )
}

export default AuthContext
