import React from 'react'
import { useState } from 'react'
import '../styles/login.css'
import { useContext } from 'react';
import AuthContext1 from '../context/AuthContext';

const Login = () => {
    //setting state of username and password
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
const[error,setError]=useState("");

//geting authentication from context
const{login}=useContext(AuthContext1);
console.log(login())



const handleLogin= async()=>{
    try{
      let response=  await axios.post("https://prairie-excited-garage.glitch.me/login")
      console.log(response)

    }catch(err){

    }

}

  return (
    <div>
      <h1>Please Login</h1>
      <div id="form">
      <form onSubmit={handleLogin}>
        <input type="text" placeholder='Enter Username'  value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder='Enter Password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>
<input type="submit" value="Login" />

      </form>
      </div>
    </div>
  )
}

export default Login
