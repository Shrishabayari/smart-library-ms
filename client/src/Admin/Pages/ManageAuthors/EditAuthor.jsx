import React, { useState } from 'react';
import './EditAuthor.css'

function EditAuthorForm({ authorData, onSubmit, onCancel, error }) {
  const [updatedAuthorData, setUpdatedAuthorData] = useState({
    ...authorData, // Initialize with existing author data
  });

  const handleChange = (e) => {
    setUpdatedAuthorData({
      ...updatedAuthorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedAuthorData); // Pass the updated author data to the parent component
  };

  return (
    <div className="edit-author-form">
      <h3 className='edit-author'>Edit Author : </h3>
      <form className='edit-author-form1' onSubmit={handleSubmit}>
        {/* Update the name field to match your backend field, which is 'author' */}
        <label className='edit-author-label'>Name : </label>
        <input
        className='edit-author-input'
          type="text"
          name="author" // Ensure this matches the field in your backend (e.g., 'author')
          value={updatedAuthorData.author} // Update the state correctly
          onChange={handleChange}
          placeholder="Author Name"
        />
        {/* ... other input fields if needed */}
        <button className='edit-author-butn1' type="submit">Save Changes</button>
        <button className='edit-author-butn2' type="button" onClick={onCancel}>Cancel</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditAuthorForm;
