import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adduser } from '../utils/userslice';
import BASEURL from '../utils/base_url';

const BASE_URL = BASEURL; 

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    clearForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true,
      });

      if (isLogin) {
        dispatch(adduser(res.data));
        navigate('/');
      } else {
        dispatch(adduser(res.data.user));
        navigate('/profile');
      }
    } catch (error) {
      setErrorMessage(isLogin ? 'Login failed. Please check your credentials.' : 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center my-12 px-4 ">
      <div className="card bg-gray-200 shadow-lg rounded-lg w-full max-w-md p-6 ">
        <h2 className="text-2xl text-black font-bold text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {errorMessage && (
          <div className="alert alert-error mb-4 text-red-600 font-medium">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="border border-gray-300 rounded-md w-full max-w-xs px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                autoComplete="name"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="border border-gray-300 rounded-md w-full max-w-xs px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              className="border border-gray-300 rounded-md w-full max-w-xs px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={toggleMode}
              className="text-blue-600 underline text-sm hover:text-blue-800"
              aria-label={isLogin ? 'Switch to Signup' : 'Switch to Login'}
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
