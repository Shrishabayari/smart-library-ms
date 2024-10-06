import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './RegisteredStud.css';

const RegisteredStudents = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/user/users');
        setUsers(response.data.userValues);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, action) => {
    const confirmationMessage = action === 'block'
      ? 'Are you sure you want to block this student?'
      : 'Are you sure you want to activate this student?';

    if (window.confirm(confirmationMessage)) {
      try {
        const url = `http://localhost:3000/api/v1/user/${userId}/${action}`;
        const response = await axios.put(url);  // Use PUT request as per your routes

        if (response.data.success) {
          // Update the user's status locally after the API call succeeds
          setUsers(users.map(user =>
            user._id === userId ? { ...user, status: action === 'block' ? 'blocked' : 'active' } : user
          ));
        } else {
          console.error(`Failed to ${action} user`);
        }
      } catch (error) {
        console.error(`Error in ${action} user:`, error);
      }
    }
  };

  const handleDetailsClick = (userId) => {
    navigate(`/student/${userId}`); // Navigate to the student details page
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div>
      <Head /><hr /><Navbar />
      <div className="tablecontainer">
        <h2 className='manage-heading4'> REGISTERED STUDENTS</h2>
        {isLoading && <p>Loading users...</p>}
        <div className="table-heading4">
          <p className='th'>Registered Students</p>
          <table className="table4">
            <thead>
              <tr className='tr'>
                <th>UserID</th>
                <th>Student Name</th>
                <th>Email ID</th>
                <th>Mobile Number</th>
                <th>Reg Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td>{item.userId}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{formatDate(item.creation_date)}</td>
                  <td>{item.status === 'blocked' ? 'Blocked' : 'Active'}</td>
                  <td className="btnn">
                    <button
                      className={item.status === 'blocked' ? "activate-btn" : "block-btn"}
                      onClick={() => handleStatusChange(item._id, item.status === 'blocked' ? 'activate' : 'block')}
                    >
                      {item.status === 'blocked' ? 'Activate' : 'Block'}
                    </button>

                    <button className="details" onClick={() => handleDetailsClick(item._id)}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!users.length && <p>No users found.</p>}
      </div>
      <hr /><Footer />
    </div>
  );
};

export default RegisteredStudents;
