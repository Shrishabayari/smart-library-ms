import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Head/Head'
import Footer from '../../Components/Footer/Footer'
import './Myprofile.css'
const MyProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('library-jwtToken');
      axios
        .get('http://localhost:3000/api/v1/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setProfileData(res.data.data);
        });
    } catch (error) {
      console.error(error);
      setUpdateError('Error retrieving profile data');
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form field input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission to update profile
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const token = localStorage.getItem('library-jwtToken'); // Retrieve the token
      const updatedData = {
        name: profileData.name,
        mobile: profileData.mobile,
      };
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/updateProfile',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(response.data.data); // Update state with new profile data
      setUpdateError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setUpdateError('Error updating profile data');
    } finally {
      alert("update success")
      setIsUpdating(false); // Stop showing loading state
    }
  };

  return (
    <div className='profile-container'>
    <Header/><hr />
      <h2 className='profie-header'>MY PROFILE</h2>
      {profileData && (
        <form className='form-std' onSubmit={handleSubmit}>
          <h1 className='he'>My Profile</h1>
          <div className='myProfileForm'>
            <div>
              <label className='labl'>Student ID : </label>
              <input type='text' className='inpt' value={profileData.userId || ''} disabled />
            </div>
            <div>
              <label className='labl'>Reg Date : </label>
              <input
              className='inpt'
                type='text'
                value={
                  new Date(profileData.creation_date).toLocaleDateString(
                    'en-GB'
                  ) || ''
                }
                disabled
              />
            </div>
            <div className='span'>
              <label className='labl'>Profile Status : </label>
              <input
                type='text'
                className='inpt'
                name='status'
                value={profileData.status || ''}
                required
                disabled
              />
            </div>
            <div>
              <label className='labl'>Enter Full Name : </label>
              <input
                type='text'
                className='inpt'
                name='name'
                value={profileData.name || ''}
                onChange={handleInputChange}
                required
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className='labl'>Mobile Number : </label>
              <input
                type='text'
                className='inpt'
                name='mobile'
                value={profileData.mobile || ''}
                onChange={handleInputChange}
                required
                disabled={isUpdating}
              />
            </div>
            <div>
              <label className='labl'>Enter Email : </label>
              <input className='inpt' type='email' value={profileData.email || ''} disabled />
            </div>
            <button className='bttn' type='submit' disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Now'}
            </button><br />
          </div>
        </form>
      )}
      {updateError && <p style={{ color: 'red' }}>Error: {updateError}</p>}
    <hr /><Footer/>
    </div>
  );
};

export default MyProfile;
