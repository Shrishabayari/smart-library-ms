import React, {useState, useEffect} from 'react';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './AdminDashboard.css'
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';

library.add(fas);

function AdminDashboard() {

  const [bookCount, setBookCount] = useState(0);
    const fetchBookCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books/bookCount');
        setBookCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchBookCount();
  }, []);
  
  const [userCount, setUserCount] = useState(0);
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/userCount');
        setUserCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchUserCount();
  }, []);

  const [authorCount, setauthorCount] = useState(0);
  const fetchAuthorCount = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/authors/count');
      setauthorCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAuthorCount();
}, []);

const [categoryCount, setCategoryCount] = useState(0);
const fetchCatgoryCount = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/categories/:id/categoryCount');
    setCategoryCount(response.data.count);
  } catch (error) {
    console.error(error);
  }
};
useEffect(() => {
  fetchCatgoryCount();
}, []);

  return (
    <div>
      <Head />
      <hr />
      <div className="dashboard1">
      <div className="navba">
        <Navbar /></div>
        <div className="heading1">
          <h4>ADMIN DASHBOARD</h4>
        </div>
        <div className="list1">
          <div className="col-md-3"><a href="/manageBook">
            <div className="card">
              <div className="card-body ">
                <div className="card-icon">
                  <FontAwesomeIcon icon="book" />
                </div>
                <div className="ADcard-text">
                  <h5>Books Listed</h5>
                  <p>{bookCount}</p>
                </div>
              </div>
            </div></a>
          </div>
          <div className="col-md-3"><a href="/registeredstudents">
            <div className="card">
              <div className="card-body">
                <div className="card-icon">
                  <FontAwesomeIcon icon="users" />
                </div>
                <div className="ADcard-text">
                  <h5>Registered Users</h5>
                  <p>{userCount}</p>
                </div>
              </div>
            </div></a>
          </div>
          <div className="col-md-3"><a href="/manageAuthor">
            <div className="card">
              <div className="ADcard-body">
                <div className="card-icon">
                  <FontAwesomeIcon icon="user" />
                </div>
                <div className="ADcard-text">
                  <h5>Authors Listed</h5>
                  <p>{authorCount}</p>

                </div>
              </div>
            </div></a>
          </div>
          <div className="col-md-3"><a href="/manageCategory">
            <div className="card">
              <div className="card-body">
                <div className="card-icon">
                  <FontAwesomeIcon icon="file-archive" />
                </div>
                <div className="ADcard-text">
                  <h5>Listed Categories</h5>
                  <p>{categoryCount}</p>
                  </div>
              </div>
            </div></a>
          </div>
        </div>
      </div><hr /><Footer/>
    </div>
  );
}

export default AdminDashboard;
