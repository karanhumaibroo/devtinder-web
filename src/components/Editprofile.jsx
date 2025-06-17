import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import BASE_URL from '../utils/base_url';
import { adduser } from '../utils/userslice';
import UserCard from './usercard';

const EditProfile = ({ user }) => {
    const [name, setName] = useState(user.name);
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [skills, setSkills] = useState(user.skills || '');
    const [photourl, setPhotourl] = useState(user.photourl || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const res = await axios.patch(
                BASE_URL + '/profile/update',
                { name, age, gender, photourl, skills, about },
                { withCredentials: true }
            );

            console.log('Update successful:', res.data);
            dispatch(adduser(res.data.user));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000); // Hide toast after 3 seconds
        } catch (error) {
            console.error('Update failed:', error);
            setErrorMessage('Update failed. Please check your credentials.');
        }
    };

    return (
        <>
        <div className="flex justify-center items-center">
            <div className="h-screen place-items-center my-10 mx-5">
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">Edit</h2>
                        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="name" className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Your age"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Gender"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="photourl" className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your photo URL"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={photourl}
                                    onChange={(e) => setPhotourl(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="about" className="label">
                                    <span className="label-text">About</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="About you"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="skills" className="label">
                                    <span className="label-text">Skills</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your skills"
                                    className="input input-bordered text-black max-w-xs w-full"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                />
                            </div>
                            <div className="card-actions justify-end">
                                <button type="submit" className="btn">
                                    SAVE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <UserCard user={{ name, age, gender, about, skills, photourl }} /> {/* Pass updated state to UserCard */}
        </div>
        {showToast && (
            <div className="toast toast-top toast-center">
 
  <div className="alert alert-success">
    <span> Profile updated successfully</span>
  </div>
</div>
        )}
        </>
    );
}

export default EditProfile;
