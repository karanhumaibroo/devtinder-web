import axios from 'axios';
import React, { useEffect } from 'react';
import BASE_URL from '../utils/base_url';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/coonectionslice'; // Corrected the typo here

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connection", { withCredentials: true });
      console.log('Connections fetched successfully:', response.data);
      dispatch(addConnection(response.data.data)); // Dispatch the connections data to Redux store
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // Conditional rendering based on connections
  if (!Array.isArray(connections) || connections.length === 0) {
    return (
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold">No Connections Found</h1>
        <p className="text-lg text-gray-600">You have no connections yet. Start connecting with others!</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center my-5">
        <h1 className="text-4xl font-bold">Connections</h1>
      
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {connections.map((connection) => {
          const { name, about, photourl, age, gender, skills } = connection; // Destructure directly in the map function
          return (
            <div key={name} className="card bg-black shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <figure className="h-36 w-full"> {/* Reduced height from h-48 to h-36 */}
                <img
                  src={photourl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                  alt="User  photo"
                  className="object-cover w-full h-full"
                />
              </figure>
              <div className="card-body p-4"> {/* Reduced padding for a more compact look */}
                <h2 className="card-title font-bold text-2xl mb-2">{name}</h2>
                <p className="text-white-700 mb-2">{about}</p>
                <p className="font-semibold">Age: {age}</p>
                <p className="font-semibold">Gender: {gender}</p>
                <p className="font-semibold">Skills: {skills}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary px-4 py-2 text-lg">View Profile</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
