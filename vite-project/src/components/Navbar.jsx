import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/navbar.css'

const Navbar = () => {
  return (
    <div >
        <nav className='navbar'>
            <Link to="/" className='nav-link'>Home</Link>
            <Link to="/books" className='nav-link'>Books</Link>
            <Link to="/login" className='nav-link'>Login</Link>
        </nav>
      
    </div>
  )
}

export default Navbar
