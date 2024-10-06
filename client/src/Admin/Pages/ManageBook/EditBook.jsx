import React, { useState } from "react";
import './EditBook.css'
function EditBookForm({ bookData, onSubmit, onCancel, error }) {
  const [updatedBookData, setUpdatedBookData] = useState({
    ...bookData, // Initialize with existing book data
  });

  const handleChange = (e) => {
    setUpdatedBookData({
      ...updatedBookData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedBookData); // Pass the updated book data to the parent component
  };

  return (
    <div className="edit-book-form">
      <h3 className="edit-book-heading">Edit Book : </h3>
      <form className="edit-book-form1" onSubmit={handleSubmit}>
        <input
          type="text"
          className="edit-input"
          name="bookName"
          value={updatedBookData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
        />
        <input
          type="text"
          className="edit-input"
          name="category"
          value={updatedBookData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="text"
          className="edit-input"
          name="author"
          value={updatedBookData.author}
          onChange={handleChange}
          placeholder="Author"
        /><br/><br/>
        <input
          type="text"
          className="edit-input"
          name="isbn"
          value={updatedBookData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
        />
        <input
          type="number"
          className="edit-input"
          name="price"
          value={updatedBookData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button className="edit-button1" type="submit">Save Changes</button>
        <button className="edit-button2" type="button" onClick={onCancel}>Cancel</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditBookForm;
