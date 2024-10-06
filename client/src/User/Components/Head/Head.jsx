import React, {useState}  from 'react';
import './Head.css';
import logo from '../../assets/logo.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';   
import { useNavigate } from 'react-router-dom';

const Head = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage (if applicable)
    sessionStorage.clear();
    localStorage.clear();

    // Navigate to the index page
    navigate('/');
  };
  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div>
      <div className='heading2'>
        <div className='left-heading2'>
          <div className='left-heading2'>
            <img className='home-logo2' src={logo} alt="logo" />
            <h1 className='home-heading2'>SRINIVAS LIBRARY<br/> MANAGEMNT SYSTEM</h1>
          </div>
        </div>
        <div className='right-nav2'>
        <ul><div className='r-nav2'>
          <li className='link2'><a href="/userDashboard">DASHBOARD</a></li>
          <li className='link2'><a href="/issuedBooks">ISSUED BOOKS</a></li>
          <div className="navbarr-item2" onClick={handleAccountClick}>
            <div className='itms2'><p className='account-Drop2'>ACCOUNT</p> <FontAwesomeIcon className='ic2' icon={faCaretDown} /></div>
              {isAccountOpen && (
                <ul className="dropdown2">
                  <li className='li2'><a href="/myProfile">MY PROFILE</a></li>
                  <li className='li2'><a href="/password">CHANGE PASSWORD</a></li>
                </ul>
              )}
            </div>
            <button className='user-logout-button' onClick={handleLogout}>Logout</button>
          </div>
        </ul>
        </div>
      </div>
    </div>
  );
};

export default Head;
