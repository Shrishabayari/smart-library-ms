import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './ManageIssuedBooks.css';
import EditIssueBookForm from './EditIssuedBook';

const ManageIssueBook = () => {
  const [issueBooks, setIssueBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBookData, setEditBookData] = useState(null);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/v1/issueBook/issuedBooks');
      setIssueBooks(response.data.bookValues);
      console.log(response.data.bookValues);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (book) => {
    setIsEditing(true);
    setEditBookData(book);
  };

  const handleEditSubmit = async (updatedBookData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/issueBook/${updatedBookData._id}`,
        updatedBookData
      );

      setIssueBooks(issueBooks.map((existingBook) => 
        existingBook._id === response.data.data._id ? response.data.data : existingBook
      ));

      setIsEditing(false);
      setEditBookData(null);
      fetchBooks(); // Refetch books to ensure we have the latest data
    } catch (error) {
      console.error(error);
      setEditError(error.message || 'An error occurred during editing.');
    }
  };

  const handleDeleteClick = async (issuedId) => {
    const confirmation = window.confirm('Are you sure you want to delete this issued book?');
    if (!confirmation) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/v1/issueBook/${issuedId}`);
      setIssueBooks(issueBooks.filter((b) => b._id !== issuedId));
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Returned';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <Head /><hr /><Navbar />
      <h1 className='manage-heading5'>MANAGE ISSUED BOOKS</h1>
      {isLoading && <p>Loading issued books...</p>}
      <div className="table-heading3">
        <p className='th'>Listed Issued Books </p>
        <table className="table3">
          <thead>
            <tr className='tr'>
              <th>User ID</th>
              <th>Book Name</th>
              <th>Issued date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {issueBooks.map((item, index) => (
              <tr key={index}>
                <td>{item.userId}</td>
                <td>{item.bookName}</td>
                <td>{formatDate(item.issued_date)}</td>
                <td>{formatDate(item.return_date)}</td>
                <td>{formatDate(item.status)}</td>
                <td className="td">
                  <button className="edit" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteClick(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!issueBooks.length && <p>No issued books found.</p>}
      
      {isEditing && (
        <EditIssueBookForm
          bookData={editBookData}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setIsEditing(false);
            setEditBookData(null);
          }}
          error={editError}
        />
      )}
      <hr /><Footer />
    </div>
  );
};

export default ManageIssueBook;