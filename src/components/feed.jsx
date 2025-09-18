/*import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addfeed } from '../utils/feedslice';
import BASE_URL from '../utils/base_url';
import UserCard from './usercard';

const Feed = () => {
  const feed = useSelector((store) => store.feed); // Access the feed state
  const dispatch = useDispatch();

  const getFeed = async () => {
    // Fetch feed only if feed is an empty array
    if (feed && feed.length > 0) return; 
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      // Log the fetched data
      console.log('Fetched feed data:', response.data);
      dispatch(addfeed(response.data.connections)); // Dispatch the feed data to Redux store
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Fetch feed on component mount

  if (!feed) return <div>Loading...</div>; // Show loading state while fetching feed
  if (feed.length <= 0) {
    return (
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold">No Feed Available</h1>
        <p className="text-lg text-gray-600">You have no feed yet. Start connecting with others!</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4 my-10'>
      {feed.map((user) => (
        <UserCard key={user._id} user={user} /> // Render UserCard for each user in the feed
      ))}
    </div>
  );
};

export default Feed;*/

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addfeed } from '../utils/feedslice';
import BASE_URL from '../utils/base_url';
import UserCard from './usercard';
import { AnimatePresence } from 'framer-motion';
import FeedUserCard from './Feeduser';
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      console.log('Fetched feed data:', response.data);
      dispatch(addfeed(response.data.connections));
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  );

  if (feed.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">No Feed Available</h1>
          <p className="text-lg text-gray-600 mt-2">
            You have no feed yet. Start connecting with others!
          </p>
        </div>
      </div>
    );
  }

  if (currentIndex >= feed.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">No More Profiles</h1>
          <p className="text-lg text-gray-600 mt-2">
            Check back later for more connections!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <FeedUserCard
          key={feed[currentIndex]._id}
          user={feed[currentIndex]}
          onSwipe={() => setCurrentIndex(prev => prev + 1)}
        />
      </AnimatePresence>
    </div>
  );
};

export default Feed;

