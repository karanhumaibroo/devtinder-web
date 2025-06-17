
import Body from './body.jsx';
import Login from './login.jsx';
import Profile from './profile.jsx';
import Feed from './feed.jsx';
import React from 'react';
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import './App.css'
import { Provider } from 'react-redux';
import appstore from '../utils/appstore.js';
import Connections from './connections.jsx';
import Requests from './request.jsx';
function App() {
  
  return (
    <>
    <Provider store={appstore}>
    <BrowserRouter basename='/'>
    <Routes >
      <Route path='/' element={<Body />} >
     <Route path='/' element={<Feed/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/connections' element={<Connections/>} />
      <Route path='/requests' element={<Requests />} />
      
      </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
