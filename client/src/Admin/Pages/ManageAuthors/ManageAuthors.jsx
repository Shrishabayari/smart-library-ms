import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAuthors.css';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import EditAuthorForm from '../../Pages/ManageAuthors/EditAuthor';
import { useParams } from 'react-router-dom';

function ManageAuthor() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditting, setIsEditing] = useState(false);
  const [editAuthorData, setEditAuthorData] = useState({});
  const [editError, setEditError] = useState(null);
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/authors');
        setAuthors(response.data.authorValues);

        // Pre-populate edit form data if authorId exists
        if (authorId) {
          setEditAuthorData(response.data.authorValues.find((a) => a._id === authorId));
        }
      } catch (error) {
        console.error(error);
        // Handle error if necessary (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, [authorId]);

  const handleEditClick = (author) => {
    setIsEditing(true);
    setEditAuthorData(author); // Set edit form data with the selected author
  };

  const handleEditSubmit = async (updatedAuthorData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/authors/${updatedAuthorData._id}`, // Send the correct data
        updatedAuthorData
      );
  
      // Update the authors state with the response data
      setAuthors(authors.map((existingAuthor) => (existingAuthor._id === response.data.data._id ? response.data.data : existingAuthor)));
  
      setIsEditing(false);
      setEditAuthorData({}); // Clear the form after submission
    } catch (error) {
      console.error(error);
      setEditError(error.message || 'An error occurred during editing.');
    }
  };
  
  const handleEditCancel = () => {
    setIsEditing(false);
    setEditAuthorData({}); // Clear edit form data on cancellation
    setEditError(null); // Clear any errors
  };

  const handleDeleteClick = async (authorId) => {
    const confirmation = window.confirm('Are you sure you want to delete this author?');
    if (!confirmation) {
      return; // User canceled deletion
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/authors/${authorId}`);
      setAuthors(authors.filter((a) => a._id !== authorId)); // Update author state immediately after deletion
    } catch (error) {
      console.error(error);
      // Handle deletion error gracefully (e.g., display an error message)
    }
  };

  return (
    <div className="table-container">
      <Head />
      <hr />
      <Navbar />
      <h2 className="manage-heading6">MANAGE AUTHORS</h2>
      {isLoading && <p>Loading authors...</p>}
      
      <div className='table-heading2'>
        <p className='th'>Authors Listed</p>
      <table className="table2">
        <thead>
          <tr className="tr">
            <th>#</th>
            <th>Name</th>
            <th>Creation Date</th>
            <th>Updation Date</th>            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((item, index) => (
            <tr key={index} className="tRow">
              <td>{index + 1}</td>
              <td>{item.author}</td>
              <td>{new Date(item.creation_date).toLocaleDateString()}</td>
              <td>{new Date(item.updation_date).toLocaleDateString()}</td>
              <td className='ha'>
                <button className='edit' onClick={() => handleEditClick(item)}>Edit</button>
                <button className='delete' onClick={() => handleDeleteClick(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {isEditting && (
        <EditAuthorForm
          authorData={editAuthorData}
          onSubmit={handleEditSubmit}
          onCancel={handleEditCancel}
          error={editError}
        />
      )}
      {!authors.length && <p>No authors found.</p>}
      <br /><hr />
      <Footer />
    </div>
  );
}

export default ManageAuthor;