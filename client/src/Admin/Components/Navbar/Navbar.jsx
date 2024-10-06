import React, { useState } from 'react';
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';   


const Navbar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const handleCatgoriesClick = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const handleAuthorsClick = () => {
    setIsAuthorsOpen(!isAuthorsOpen);
  };

  const [isBooksOpen, setIsBooksOpen] = useState(false);
  const handleBooksClick = () => {
    setIsBooksOpen(!isBooksOpen);
  };

  const [isIssueBooksOpen, setIsIssueBooksOpen] = useState(false);

  const handleIssueBooksClick = () => {
    setIsIssueBooksOpen(!isIssueBooksOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-item"><a href="/adminDashboard">DASHBOARD</a></div>
      <div className="navbar-item" onClick={handleCatgoriesClick}>
        <div className='items'>
        <p className='select2'>CATEGORIES</p><FontAwesomeIcon className='drop' icon={faCaretDown} />
        </div>
        {isCategoriesOpen && (
          <ul className="dropdown">
            <li className='option'><a  href="/addCategory">ADD CATEGORY</a></li>
            <li><a className='option' href="/manageCategory">MANAGE CATEGORY </a></li>
          </ul> 
        )}
      </div>
      <div className="navbar-item" onClick={handleAuthorsClick}>
        <div className='items'>
        <p className='select2'>AUTHORS</p><FontAwesomeIcon className='drop' icon={faCaretDown} />
        </div>
        {isAuthorsOpen && (
          <ul className="dropdown">
            <li><a href="/addAuthor">ADD AUTHORS</a></li>
            <li><a href="/manageAuthor">MANAGE AUTHORS</a></li>
          </ul>
        )}
      </div>
      <div className="navbar-item" onClick={handleBooksClick}>
      <div className='items'>
        <p className='select2'>BOOKS</p><FontAwesomeIcon className='drop' icon={faCaretDown} />
        </div>
        {isBooksOpen && (
          <ul className="dropdown">
            <li><a href="/addBook">ADD BOOKS</a></li>
            <li><a href="/manageBook">MANAGE BOOKS </a></li>
          </ul>
        )}
      </div>
      <div className="navbar-item" onClick={handleIssueBooksClick}>
        <div className='items'>
          <p className='select2'>ISSUE BOOKS</p> <FontAwesomeIcon className='drop' icon={faCaretDown} />
        </div>        {isIssueBooksOpen && (
          <ul className="dropdown">
            <li><a href="/issueBooks">ISSUE NEW BOOK</a></li>
            <li><a href="/manageIssuedBook">MANAGE ISSUED BOOK</a></li>
          </ul>
        )}
      </div>
      <div className="navbar-item"><a href="/registeredstudents">REG STUDENTS</a></div>
      <div className="navbar-item"><a href="/changePassword">CHANGE PASSWORD</a></div>


    </nav>
  );
};

export default Navbar;
