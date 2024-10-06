import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import './AdminRegister.css'

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/register', {
        name,
        password,
      });

      if (response.data.message === 'Admin registered successfully') {
        alert('Registration successful!');
        navigate('/admin/login'); // Navigate to admin login page after success
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Admin already exists. Please try again.');
    }
  };

  return (
    <div >
      <Header/><hr />
      <h1 className='header'>ADMIN REGISTER PAGE</h1>
      <form onSubmit={handleSubmit} className='Register-container'>
        <h2 className='register-heading'>Admin Register Form</h2>
        <div className='form-group4'>
          <input className='registerInput' type="text" value={name} onChange={(e) => setName(e.target.value)} /><br/>
          <label className={name ? 'filled' : ''}>Name</label>
        </div>
        <div className='form-group4'>
          <input className='registerInput' type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
          <label className={password ? 'filled' : ''}>Password</label>
        </div>
        <button className='register-buttion' type="submit">Register</button><br /><br />
        <a className='register-link' href="/admin/login">Admin Login</a>
      </form><br /><br />
      <hr /><Footer/>
    </div>
  );
};

export default RegisterForm;