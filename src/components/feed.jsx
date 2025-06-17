import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addfeed } from '../utils/feedslice';
import BASE_URL from '../utils/base_url';
import Usercard from './usercard';

const Feed = () => {
  const feed = useSelector((store) => store.feed); // Access the feed state
  const dispatch = useDispatch();

  const getFeed = async () => {
    // Fetch feed only if feed is null or an empty array
    if (feed) return; 
    try {
      const response = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      console.log('Feed fetched successfully:', response.data.connections); // Log the fetched data
      if (response.data.connections) {
        dispatch(addfeed(response.data.connections)); // Dispatch the feed data to Redux store
      } else {
        console.error('No connections found in the response');
      }
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []); // Fetch feed on component mount

  return (
    feed && (
      <div className='flex flex-col items-center justify-center gap-4 my-10'>
        
          <Usercard  user={feed[0]} />
       
      </div>
    )
  );
};

export default Feed;
