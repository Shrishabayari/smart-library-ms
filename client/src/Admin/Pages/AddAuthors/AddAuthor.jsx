import React, { useState } from "react";
import axios from "axios";
import Head from '../../Components/Head/Head';
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import './AddAuthor.css';

const AddAuthorForm = () => {
  const [author, setAuthor] = useState("");
  const [error, setError] = useState(""); // State for error message

  const AddAuthor = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a new request

    try {
      const response = await axios.post('http://localhost:3000/api/v1/authors', {
        author: author,
      });

      if (response.data.message === 'Success') {
        alert('Author added successfully');
        setAuthor(''); // Reset the author input after successful submission
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); // Display error message from the backend
      } else {
        setError('An error occurred while adding the author');
      }
    }
  };

  return (
    <div>
      <Head />
      <hr /><Navbar />
      <div className="a">
      <h1 className="author-heading">ADD AUTHORS</h1>
      <form className="form" onSubmit={AddAuthor}>
        <div className="form-group">
          <h1 className='author-heading1'>Author Info</h1>
          <label className='author-label'>Author Name : </label><br /><br />
          <input
            type="text"
            className='author-input'
            name="author"
            placeholder="Please enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <br />
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </div>
        <button type="submit" className="author-button">
          Add
        </button><br /><br />
      </form>
      </div><hr />
      <Footer />
    </div>
  );
};

export default AddAuthorForm;
