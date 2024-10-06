import React, { useState } from 'react';
import axios from 'axios';
import Head from '../../Components/Head/Head';
import Footer from '../../Components/Footer/Footer';
import './ChangePassword.css'
import { useNavigate } from 'react-router-dom';

const PasswordChangeForm = () => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    try {
      const token = localStorage.getItem('library-jwtToken');
      const response = await axios.put(
        'http://localhost:3000/api/v1/user/change-password',
        {
          email,
          currentPassword,
          newPassword,
          confirmPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Password changed successfully');
      navigate('/userDashboard');
    } catch (error) {
      alert(error.response?.data?.errorMessage || 'Error changing password. Please try again.');
    }
  };

  return (
    <div>
      <Head/><hr />
      <h1 className='headpass'>CHANGE PASSWORD </h1>
    <form onSubmit={changePassword} className='passwordForm'>
      <h1 className='passheading'>Change Password Form</h1>
      <div className='change-pass'>
        <label className='lbls' htmlFor="">Enter Email Address : </label>
        <input
          className='inpts'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
          autoComplete="email"
        /><br/>
        <label className='lbls' htmlFor="">Enter Current Password : </label>
        <input className='inpts'
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          required
          autoComplete="current-password"
        /><br/>
        <label className='lbls' htmlFor="">Enter New Password : </label>
        <input className='inpts'
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
          autoComplete="new-password"
        /><br/>
        <label className='lbls' htmlFor="">Confirm New Password : </label>
        <input className='inpts'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          required
          autoComplete="new-password"
        /><br/>
        <button className='btnsss' type="submit">Change Password </button>
      </div>
    </form><hr />
    <Footer/>
    </div>
  );
};

export default PasswordChangeForm;