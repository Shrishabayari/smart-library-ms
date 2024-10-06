import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminLogin.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const LoginForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Utilize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/admin/login', {
        name:name,
        password:password,
      });

      if (response.data.message === 'Login successful') {
        // Store the token (if returned) for future authentication
        localStorage.setItem('adminToken', response.data.token);

        alert('Login successful!');
        navigate('/AdminDashboard'); // Navigate to the admin dashboard
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header/><hr />
      <h1 className='head'>ADMIN LOGIN PAGE</h1>
      <form onSubmit={handleSubmit} className='admin-container'>
        <h2 className='admin-heading'>Admin Login Form</h2>
        <div className='form-group3'>
          <input className='admin-input' type="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label className={name ? 'filled' : ''}>Name </label>
        </div>
        <div className='form-group3'>
          <input className='admin-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label className={name ? 'filled' : ''}>Password </label>
        </div>
        <button className='admin-button' type="submit">Login</button><br /><br />
        <a className='Register-link' href="/admin/">For Admin Register</a>
      </form><br /><br />
      <hr /><Footer/>
    </div>
  );
};

export default LoginForm;