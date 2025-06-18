import { useDispatch } from "react-redux";
import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../utils/base_url';
import { removefeed } from "../utils/feedslice";

const UserCard = ({ user }) => {
  const { _id, name, photourl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Message state for feedback

  const handleButtonClick = async (status, userId) => {
    setLoading(true); // Set loading to true when the request starts
    setMessage(''); // Clear previous messages
    try {
      const response = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
      console.log('Button clicked:', response.data);
      dispatch(removefeed(userId)); // Dispatch the action to remove the feed from the Redux store
      // Remove the success message
      // setMessage(`Request sent successfully: ${status}`); // Inform the user of success
    } catch (error) {
      console.error('Error handling button click:', error);
      if (error.response && error.response.status === 400) {
        setMessage('You have already sent a connection request to this user.'); // Specific error message
      } else {
        setMessage('An error occurred while sending the request. Please try again.'); // General error message
      }
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  // Default photo URL
  const defaultPhotoUrl = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photourl || defaultPhotoUrl} alt="User  photo" className="object-cover h-48 w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        {message && <p className="text-center text-red-500 my-2">{message}</p>} {/* Display message here */}
        <div className="card-actions justify-center my-4">
          <button 
            onClick={() => handleButtonClick("ignored", _id)} 
            className="btn btn-primary" 
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Ignoring...' : 'Ignore'}
          </button>
          <button 
            onClick={() => handleButtonClick("interested", _id)} 
            className="btn btn-secondary" 
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Sending...' : 'Interested'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
