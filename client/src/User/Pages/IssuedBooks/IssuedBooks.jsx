import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Components/Head/Head';
import Footer from '../../Components/Footer/Footer';
import './IssuedBooks.css';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchIssuedBooks = async () => {
    try {
      const token = localStorage.getItem('library-jwtToken');
      const userObjId = JSON.parse(atob(token.split('.')[1])).id;

      const response = await axios.get(
        'http://localhost:3000/api/v1/issueBook/bookDetails',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userObjId,
          },
        }
      );
      console.log('Received data:', response.data); // Debugging log
      setIssuedBooks(response.data.bookValue);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching issued books:', error);
      setError('There is no books to show.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  const handleMoreInfo = (book) => {
    console.log('Selected book:', book); // Debugging log
    setSelectedBook(book);
  };

  const handleCloseInfo = () => {
    setSelectedBook(null);
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not Returned';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="issued-books-container">
      <Header /><hr />
      <h1 className="issued-books-title">ISSUED BOOKS</h1>
      <main className="issued-books-main">
        <div className='book'>
        <h1 className='issue-book-heading'>Issued Books</h1>
        {loading ? (
          <p className="loading-message">Loading issued books...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <ul className="issued-books-list">
            {issuedBooks.map((book) => (
              <li key={book._id} className="issued-book-item">
                <span className="book-name">{book.bookName}</span>
                <button 
                  className="more-info-button"
                  onClick={() => handleMoreInfo(book)}
                >
                  More Info
                </button>
              </li>
            ))}
          </ul>
        )}

        {selectedBook && (
          <div className="book-details-modal">
            <div className="book-details-content">
              <h2 className="book-details-title">Book Details</h2>
              <div className='BookDetails'>
                <div className="issuedBooks-image">
                  {selectedBook.bookDetails.bookPicture ? (
                    <img
                      className="book-image"
                      src={selectedBook.bookDetails.bookPicture}
                      alt={selectedBook.bookDetails.bookName}
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div>
                  <p><strong>Book Name:</strong> {selectedBook.bookName}</p>
                  {selectedBook.bookDetails ? (
                    <>
                      <p><strong>Author:</strong> {selectedBook.bookDetails.author}</p>
                      <p><strong>Category:</strong> {selectedBook.bookDetails.category}</p>
                      <p><strong>ISBN:</strong> {selectedBook.bookDetails.isbn}</p>
                    </>
                  ) : (
                    <p>Detailed book information not available.</p>
                  )}
                  <p><strong>Issued Date:</strong> {formatDate(selectedBook.issued_date)}</p>
                  <p><strong>Return Date:</strong> {formatDate(selectedBook.return_date)}</p>
                  <p><strong>Book fine:</strong> {selectedBook.fine}</p>
                </div>
              </div>
              <button 
                className="close-details-button"
                onClick={handleCloseInfo}
              >
                Close
              </button>
            </div>
          </div>
        )}
        </div>
      </main><hr />
      <Footer />
    </div>
  );
};

export default IssuedBooks;