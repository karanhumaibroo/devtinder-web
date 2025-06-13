import Footer from './footer.jsx';
import Navbar from './navbar.jsx';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import BASE_URL from '../utils/base_url.js';
import { adduser } from '../utils/userslice.js';

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const fetchUser  = async () => {
    if (user && Object.keys(user).length > 0) {
      return; // User data already exists, no need to fetch again
    }
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(adduser(res.data)); // Dispatch the actual user data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser ();
  }, []); // Add user as a dependency to avoid unnecessary calls

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
