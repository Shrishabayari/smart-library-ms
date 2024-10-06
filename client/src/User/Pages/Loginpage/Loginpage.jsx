import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';
import Footer from '../../Components/Footer/Footer';

const Loginpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        email: email,
        password: password,
      });
      localStorage.setItem('library-jwtToken', response.data.token);
      alert('Login Successful');
      navigate('/userDashboard');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          setErrorMessage('Invalid password. Please try again.');
        } else {
          setErrorMessage('Please enter currect email.Please try again.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Header />
      <hr />
      <div className='body'>
        <div className='header'>
          <h1 className='login-heading1'>USER LOGIN PAGE</h1>
        </div>
        <div className='login-container'>
          <form onSubmit={LoginUser}>
            <h2 className='login-heading2'>Login Form</h2>
            <div className="form-group">
              <input className='login-input'
                type="email" 
                id="" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <label htmlFor="email" className={email ? 'filled' : ''}>Email</label>
            </div>

            <div className="form-group">
              <input className='login-input'
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <label htmlFor="password" className={password ? 'filled' : ''}>Password</label>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
                  <button className='login-buttion' type='submit'>
                    LOGIN
                  </button>
                  <br />
                  <br />
                  <li>
                    <a className='Register-link' href='/register'>
                      Not Registered Yet
                    </a>
                  </li>
          </form>
        </div><br /><br />
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default Loginpage;