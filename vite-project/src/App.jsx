import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Books from './pages/Books'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes >
        <Route path="/" element={<Home/>}></Route>
        <Route path="/books" element={<Books/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App
