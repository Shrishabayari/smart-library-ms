import React, { useState } from 'react';
import axios from 'axios';
import Head from '../../Components/Head/Head';
import Footer from '../../Components/Footer/Footer';
import Navbar from "../../Components/Navbar/Navbar";
import './AddCategory.css';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('1'); // Active by default
  const [error, setError] = useState(''); // For displaying error messages

  const addCategory = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before making a new request

    try {
      const response = await axios.post('http://localhost:3000/api/v1/categories', {
        category: category,
        status: status,
      });

      if (response.data.message === 'Success') {
        alert('Category added successfully');
        setCategory(''); // Reset the category input after successful submission
        setStatus('1'); // Reset status to default
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display error message from the backend
      } else {
        setError('An error occurred while adding the category');
      }
    }
  };

  return (
    <div>
      <Head />
      <hr />
      <Navbar />
      <h1 className='category-heading'>ADD CATEGORIES</h1>
        <form onSubmit={addCategory} className='category-form'>
          <h1 className='catagory-Name'>Category Info</h1>
          <div className='form-group'>
            <label className='category-label'>Category Name : </label><br/><br/>
            <input
              type='text'
              className='category-input'
              placeholder='Enter category name'
              name='category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            /><br/>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
              <label className='category-label1'>Status : </label>
              <div className='radio-buttons'>
                <div className='radio'>
                  <input className='in'
                    type='radio'
                    name='status'
                    value='1'
                    checked={status === '1'}
                    onChange={(e) => setStatus(e.target.value)}
                  /> Active
                </div>
                <div className='radio'>
                    <input className='in1'
                      type='radio'
                      name='status'
                      value='0'
                      checked={status === '0'}
                      onChange={(e) => setStatus(e.target.value)}
                    /> Inactive
                </div>
            </div><br/>
            <button className='category-button'>Create</button><br/><br/>
          </div>
        </form>
      <hr />
      <Footer />
    </div>
  );
};

export default AddCategory;
