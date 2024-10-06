import React  from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import './Header.css';
import logo from '../../assets/logo.jpeg';

const Header = () => {

  return (
    <div className='headingbody'>
      <div className='header-heading'>
        <div className='left-heading'>
            <img className='home-logo' src={logo} alt="logo" />
            <h1 className='home-heading'>SRINIVAS LIBRARY<br/> MANAGEMNT SYSTEM</h1>
        </div>
        <div className='right-heading'>
          <Navbar></Navbar>
        </div>
      </div>
    </div>
  );
};

export default Header;
