import React from 'react';
import './Head.css';
import logo from '../../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const Head = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage (if applicable)
    sessionStorage.clear();
    localStorage.clear();

    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className='head-contaier'>
      <div className='heading'>
        <div className='left-heading1'>
         <img className='home-logo1' src={logo} alt="logo" />
          <h1 className='home-heading1'>SRINIVAS  LIBRARY  MANAGEMNT  SYSTEM</h1>
        </div>
        <div className='right-heading1'>
          <button className='logout-buttion1' onClick={handleLogout}>LOG ME OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Head;
