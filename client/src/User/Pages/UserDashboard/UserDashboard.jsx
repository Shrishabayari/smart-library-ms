import React, { useState, useEffect } from 'react';
import Head from '../../Components/Head/Head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UserDashboard.css';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';

function UserDashboard() {
  const [bookCount, setBookCount] = useState(0);
  const [issuedbookCount, setissuedBookCount] = useState(0);

  const fetchBookCount = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/books/bookCount'
      );
      setBookCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookCount();
  }, []);

  const fetchissuedBookCount = async () => {
    try {
      const token = localStorage.getItem('library-jwtToken');
      const userId = JSON.parse(atob(token.split('.')[1])).id;
      
      const response = await axios.get(
        'http://localhost:3000/api/v1/issueBook/count',
        {
          params: { userId }
        }
      );
      setissuedBookCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchissuedBookCount();
  }, []);

  return (
    <div>
      <Head />
      <hr />
      <div className='heding1'>
        <h1>USER DASHBOARD</h1>
      </div>
      <div className='lis1'>
        <div className='col-md-3'>
          <a href='/listedBook'>
            <div className='card1'>
              <div className='card-body1 '>
                <div className='card-icon1'>
                  <FontAwesomeIcon icon='book' />
                </div>
                <div className='card-text1'>
                  <h5>Books Listed</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className='col-md-3'>
          <a href='/issuedBooks'>
            <div className='card1'>
              <div className='card-body1'>
                <div className='card-icon1'>
                  <FontAwesomeIcon icon='book' />
                </div>
                <div className='card-text1'>
                  <h5>Issued Books</h5>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
}

export default UserDashboard;
