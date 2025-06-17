import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adduser } from '../utils/userslice';
import BASE_URL from '../utils/base_url';
const Login = () => {
  const [email, setEmail] = useState('vaibhav@gmail.com');
  const [password, setPassword] = useState('Vaibhav@123');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setErrorMessage(''); // Clear any previous error messages

    try {
      const res = await axios.post(
        BASE_URL +'/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      // Handle successful login (e.g., redirect, store token)
      console.log('Login successful:');
      dispatch(adduser(res.data));
      return navigate('/');
      // Assuming the response contains user data
      // Example: Redirect to a dashboard page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="h-screen  place-items-center my-10">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Login!</h2>
          {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email ID</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered text-black max-w-xs w-full"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="input input-bordered text-black max-w-xs w-full"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="card-actions justify-end">
              <button type="submit" className="btn">
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
