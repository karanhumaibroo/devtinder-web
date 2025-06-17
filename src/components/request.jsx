import axios from 'axios';
import React, { useEffect } from 'react';
import BASE_URL from '../utils/base_url';
import { useDispatch, useSelector } from 'react-redux';
import { addrequest, removerequest } from '../utils/requestslice';

const Requests = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.requests); // Use the correct selector for requests
  
const handlebuttonclick=async(status, _id)=>{
 try {
    const response=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true});
    console.log('Button clicked:');
   dispatch(removerequest(_id)); // Dispatch the action to remove the request from the Redux store
 }
  catch (error) {
    console.error('Error handling button click:', error);
  }
}


  const fetchrequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/request", { withCredentials: true });
      console.log('Requests fetched successfully:', response.data);
      dispatch(addrequest(response.data.requests)); // Dispatch the connections data to Redux store
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };


  useEffect(() => {
    fetchrequest();
  }, []);

  // Conditional rendering based on connections
  if (!Array.isArray(connections) || connections.length === 0) {
    return (
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold">No Requests Found</h1>
        <p className="text-lg text-gray-600">You have no requests yet. Start connecting with others!</p>
      </div>
    );
  }

  return (
  <>
  <div className="text-center my-5">
    <h1 className="text-4xl font-bold">Requests</h1>
    <p className="text-lg text-gray-600">Here are your requests</p>
  </div>
  <div className="flex justify-center">
    <div className="">
      {connections.map((connection) => {
        const { name, about, photourl, age, gender, skills } = connection.fromUserid;
        return (
          <div
            key={name}
            className="card card-side bg-neutral-content shadow-lg my-4 transition-transform transform hover:scale-105 max-w-lg w-full min-h-[220px]"
          >
            <figure className="h-44 w-44 md:h-56 md:w-56">
              <img
                src={photourl || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                alt="User photo"
                className="object-cover rounded-full"
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title font-extrabold text-3xl">{name}</h2>
              <p className="font-semibold text-lg">{about}</p>
              <p className="font-semibold text-lg">Age: {age}</p>
              <p className="font-semibold text-lg">Gender: {gender}</p>
              <p className="font-semibold text-lg">Skills: {skills}</p>
              <div className="card-actions justify-end mt-6">
                <button className="btn btn-secondary mr-4 px-8 py-3 text-lg" onClick={()=>handlebuttonclick("accepted",connection._id)}>Accepted</button>
                <button className="btn btn-primary px-8 py-3 text-lg" onClick={()=>handlebuttonclick("rejected",connection._id)}>Rejected</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</>

);

};

export default Requests;
