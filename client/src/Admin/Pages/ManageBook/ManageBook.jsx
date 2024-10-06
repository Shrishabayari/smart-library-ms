import axios from "axios";
import React, { useEffect, useState } from "react";
import Head from '../../Components/Head/Head'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './ManageBook.css';
import EditBookForm from './EditBook';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBookData, setEditBookData] = useState(null);
  const [editError, setEditError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books/bookNames');
        setBooks(response.data.bookValues);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleEditClick = (book) => {
    setIsEditing(true);
    setEditBookData(book); // Populate the form with selected book's data
  };

  const handleEditSubmit = async (updatedBookData) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/books/${updatedBookData._id}`,
        updatedBookData
      );

      // Update the books state with the edited book's data
      setBooks(books.map((existingBook) => 
        existingBook._id === response.data.data._id ? response.data.data : existingBook
      ));

      setIsEditing(false);
      setEditBookData(null); // Clear edit form data
    } catch (error) {
      console.error(error);
      setEditError(error.message || 'An error occurred during editing.');
    }
  };
  const handleDeleteClick = async (bookId) => {
    const confirmation = window.confirm('Are you sure you want to delete this book?');
    if (!confirmation) {
      return; // User canceled deletion
    }

    try {
      await axios.delete(`http://localhost:3000/api/v1/books/${bookId}`);
      setBooks(books.filter((b) => b._id !== bookId)); // Update book state immediately after deletion
    } catch (error) {
      console.error(error);
      // Handle deletion error gracefully (e.g., display an error message)
    }
  };
  return (
    <div>
      <Head /><hr /><Navbar />
      <h1 className='manage-heading'>MANAGE BOOKS</h1>
      {isLoading && <p>Loading books...</p>}
      <div className='table-heading'>
        <p className='th'>Books Listed</p>
        <div className="books-grid">
          {books.map((item, index) => (
            <div key={index} className="book-item">
              <div className="book-image-container">
                {item.bookPicture ? (
                  <img
                    className="book-image"
                    src={item.bookPicture}
                    alt={item.bookName}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <div className="book-details">
                <p><b>ISBN:</b> {item.isbn}</p>
                <p><b>Book Name:</b> {item.bookName}</p>
                <p><b>Category:</b> {item.category}</p>
                <p><b>Author:</b> {item.author}</p>
                <p><b>Price:</b> {item.price}</p>
                <div className="book-actions">
                  <button className="edit" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteClick(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!books.length && <p>No books found.</p>}
      
      {isEditing && (
        <EditBookForm
          bookData={editBookData}
          onSubmit={handleEditSubmit}
          onCancel={() => {
            setIsEditing(false);
            setEditBookData(null);
          }}
          error={editError}
        />
      )}<br/><br/>
      <hr /><Footer />
    </div>
  );
};

export default ManageBooks;