import React, { useEffect, useState } from 'react';
import Head from '../../Components/Head/Head';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './AddBooks.css';

const AddBookForm = () => {
  const [bookName, setBookName] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState('');
  const [bookPicture, setBookPicture] = useState(null);
  const [error, setError] = useState('');

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  const handleFileChange = (e) => {
    setBookPicture(e.target.files[0]);
  };

  const AddBook = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('category', category);
    formData.append('author', author);
    formData.append('isbn', isbn);
    formData.append('price', price);
    if (bookPicture) {
      formData.append('bookPicture', bookPicture);
    }

    try {
      console.log(formData);
      
      const response = await axios.post(
        'http://localhost:3000/api/v1/books',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.message === 'Success') {
        alert('Book added successfully');
        setBookName('');
        setCategory('');
        setAuthor('');
        setBookPicture('');
        setIsbn('');
        setPrice('');
      }
    } catch (error) {
      console.error('Error details:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred while adding the book');
      }
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/authors/authorNames')
      .then((res) => {
        setAuthorOptions(res.data.authorValues);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/v1/categories/categories')
      .then((res) => {
        setCategoryOptions(res.data.categoryValues);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Head />
      <hr />
      <Navbar />
      <div className='book-heading'>
        <h1>ADD BOOK</h1>
      </div>
      <div className='book-container'>
        <h3 className='book-heading1'>Book Info</h3>
        <form onSubmit={AddBook} className='form-addbook'>
          <div className='form-group'>
            <label htmlFor='bookName' className='book-label'>
              Book Name :{' '}
            </label>
            <input
              className='book-input1'
              type='text'
              placeholder='Please enter Book name'
              id='bookName'
              name='bookName'
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
            />
          </div>
          {error && <p className='error-message'>{error}</p>}{' '}
          {/* Display error message */}
          <div className='form-group'>
            <label htmlFor='category' className='book-label'>
              Category :
            </label>
            <select
              id='category'
              className='book-select'
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value=''>Select Category</option>
              {categoryOptions?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='author' className='book-label'>
              Author :
            </label>
            <select
              id='author'
              className='book-select'
              name='author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            >
              <option value=''>Select author</option>
              {authorOptions?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='isbn' className='book-label'>
              ISBN Number :{' '}
            </label>
            <input
              type='text'
              className='book-input1'
              id='isbn'
              name='isbn'
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
              placeholder='International Standard Book No'
            />
          </div>
          {error && <p className='error-message'>{error}</p>}{' '}
          {/* Display error message */}
          <div className='form-group'>
            <label htmlFor='price' className='book-label'>
              Price :{' '}
            </label>
            <input
              type='number'
              placeholder='Please enter price'
              className='book-input1'
              id='price'
              name='price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='bookPicture' className='book-label'>
              Book Picture:{' '}
            </label>
            <input
              className='book-input2'
              type='file'
              id='bookPicture'
              name='bookPicture'
              onChange={handleFileChange}
              required
            />
          </div>
          <button type='submit' className='book-button'>
            Submit
          </button>
        </form>
      </div>
      <hr />
      <Footer />
    </div>
  );
};
export default AddBookForm;
