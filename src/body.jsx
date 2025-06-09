import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import React from 'react'
import { Outlet } from 'react-router-dom'

const body = () => {
  return (
   <div>
   <Navbar/>
    <Outlet />
    <Footer/>
    </div>
    
  )
}

export default body