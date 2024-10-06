import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from "../../Components/Footer/Footer";
import './ChangePassword.css'
const ChangePasswordForm = () => {
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      const response = await axios.put('http://localhost:3000/api/v1/admin/change-password', {
        name,
        currentPassword,
        newPassword,
        confirmPassword
      });

      setSuccess(response.data.message);
      setName('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setError('The change password endpoint was not found. Please check your server configuration.');
        } else {
          setError(error.response.data.message || 'An error occurred');
        }
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Head/><hr />
    <div className="change-password-form">
      <Navbar/>
      <h2 className='headpass1'>ADMIN CHANGE PASSWORD</h2>
      <form onSubmit={handleSubmit} className='passwordForm1'>
        <h1 className='passheading1'>Change Password Form</h1>
        <div className='formcp'>
        <div>
          <label className='lables1' htmlFor="name">Admin Name : </label>
          <input className='inpts1'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div>
          <label className='lables1' htmlFor="currentPassword">Current Password : </label>
          <input className='inpts1'
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <div>
          <label className='lables1' htmlFor="newPassword">New Password : </label>
          <input className='inpts1'
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        <div>
          <label className='lables1' htmlFor="confirmPassword">Confirm Password : </label>
          <input className='inpts1'
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        </div><br />
        <button className='btnsss1' type="submit">Change Password</button>
        </div>
      </form>
    </div>
    <hr/><Footer/>
    </div>
  );
};

export default ChangePasswordForm;