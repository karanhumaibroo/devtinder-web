
import Body from './body.jsx';
import Login from './login.jsx';
import Profile from './profile.jsx';
import React from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import './App.css'

function App() {
  
  return (
    <>
    <BrowserRouter basename='/'>
    <Routes >
      <Route path='/' element={<Body />} >
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
