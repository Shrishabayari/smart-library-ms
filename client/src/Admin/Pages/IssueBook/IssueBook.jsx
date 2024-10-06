import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './IssueBook.css';

const IssueBookForm = () => {
  const [userId, setUserId] = useState(''); // Changed from student_id to userId
  const [bookId, setBookId] = useState('');
  const [userIdOptions, setUserIdOptions] = useState([]);
  const [books, setBooks] = useState();
  const [error, setError] = useState(''); // For displaying error messages

  const issueBook = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before making a new request

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/issueBook',
        {
          userId: userId, // Changed from student_id to userId
          bookId: bookId,
        }
      );

      if (response.data.message === 'Success') {
        alert('Book issued successfully');
        setUserId(''); // Reset the category input after successful submission
        setBookId(''); // Reset status to default
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Display error message from the backend
      } else {
        setError('An error occurred while adding the category');
      }
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/user/getId')
      .then((res) => {
        setUserIdOptions(res.data.userIdValues);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/books`)
      .then((res) => {
        setBooks(res.data.books);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Head />
      <hr />
      <Navbar />
      <h1 className='issuebooks-heading'>ISSUE NEW BOOK</h1>
      <form action='' onSubmit={issueBook} className='books-container'>
        <h1 className='issuebooks-heading1'>Issue Book Form</h1>
        <div className='form-group'>
          <label htmlFor='books' className='book-label'>
            User Id :
          </label>
          <select
            id='book'
            className='issuebook-select'
            name='user id'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value=''>Select User Id</option>
            {userIdOptions?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className='form-group'>
          <label htmlFor='books' className='book-label'>
            Book Name :
          </label>
          <select
            id='book'
            className='issuebook-select'
            name='book Name'
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          >
            <option value=''>Select book</option>
            {books?.map((book, index) => (
              <option key={index} value={book._id}>
                {book.bookName}
              </option>
            ))}
          </select>
          {error && <p className='error-message'>{error}</p>}{' '}
          {/* Display error message */}
        </div>
        <br />
        <button type='submit' className='books-button'>
          ISSUE BOOK
        </button>
        <br />
        <br />
      </form>
      <hr />
      <Footer />
    </div>
  );
};

export default IssueBookForm;
