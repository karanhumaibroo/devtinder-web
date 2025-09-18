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

  



// ...existing code...

return (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-300 w-full max-w-xl mx-auto mt-2 mb-6 shadow-xl"
    >
      <figure className="h-80">
        <img 
          src={photourl || defaultPhotoUrl} 
          alt="User photo" 
          className="object-cover w-full h-full" 
        />
      </figure>
      <div className="card-body p-6">
        {/* User Name */}
        <h2 className="card-title text-2xl mb-4">{name}</h2>
        
        {/* User Details Section */}
        <div className="space-y-4">
          {/* Age and Gender */}
          {(age || gender) && (
            <div className="flex items-center gap-2">
              <i className="fas fa-user text-primary"></i>
              <p className="text-lg">{[age, gender].filter(Boolean).join(", ")}</p>
            </div>
          )}

          {/* About Section */}
          {about && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <i className="fas fa-info-circle text-primary"></i>
                <h3 className="font-semibold">About</h3>
              </div>
              <p className="text-base pl-7">{about}</p>
            </div>
          )}

          {/* Skills Section */}
          {user.skills && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="fas fa-code text-primary"></i>
                <h3 className="font-semibold">Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 pl-7">
                {user.skills.split(',').map((skill, index) => (
                  <span key={index} className="badge badge-primary">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {message && (
          <p className="text-center text-red-500 my-4 text-sm">{message}</p>
        )}

        {/* Action Buttons */}
        <div className="card-actions justify-center mt-6">
          <button 
            onClick={() => handleButtonClick("ignored", _id)} 
            className="btn btn-primary min-w-[120px]"
            disabled={loading}
          >
            {loading ? 'Ignoring...' : 'Ignore'}
          </button>
          <button 
            onClick={() => handleButtonClick("interested", _id)} 
            className="btn btn-secondary min-w-[120px]"
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