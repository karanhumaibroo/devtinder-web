import { useDispatch } from "react-redux";
import axios from 'axios';
import React, { useState } from 'react';
import BASE_URL from '../utils/base_url';
import { removefeed } from "../utils/feedslice";
import { motion,AnimatePresence } from "framer-motion";

const FeedUserCard = ({ user, onSwipe }) => {
  const { _id, name, photourl, age, gender, about } = user;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleButtonClick = async (status, userId) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`, 
        {}, 
        { withCredentials: true }
      );
      console.log('Button clicked:', response.data);
      dispatch(removefeed(userId));
      onSwipe && onSwipe(); // Call onSwipe to trigger next card
    } catch (error) {
      console.error('Error handling button click:', error);
      if (error.response && error.response.status === 400) {
        setMessage('You have already sent a connection request to this user.');
      } else {
        setMessage('An error occurred while sending the request. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const defaultPhotoUrl = "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  

return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-300 w-full max-w-2xl mx-auto my-8 shadow-2xl" // Changed these classes
    >
      <figure className="h-96"> {/* Increased height */}
        <img 
          src={photourl || defaultPhotoUrl} 
          alt="User photo" 
          className="object-cover w-full h-full" 
        />
      </figure>
      <div className="card-body p-8"> {/* Added more padding */}
        <h2 className="card-title text-3xl mb-4">{name}</h2> {/* Increased text size */}
        {age && gender && <p className="text-xl mb-3">{age + ", " + gender}</p>} {/* Increased text size */}
        <p className="text-lg mb-6">{about}</p> {/* Increased text size */}
        {message && (
          <p className="text-center text-red-500 my-4 text-lg">{message}</p>
        )}
        <div className="card-actions justify-center my-6"> {/* Added more margin */}
          <button 
            onClick={() => handleButtonClick("ignored", _id)} 
            className="btn btn-primary btn-lg" // Made button larger
            disabled={loading}
          >
            {loading ? 'Ignoring...' : 'Ignore'}
          </button>
          <button 
            onClick={() => handleButtonClick("interested", _id)} 
            className="btn btn-secondary btn-lg" // Made button larger
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Interested'}
          </button>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);


};

export default FeedUserCard;