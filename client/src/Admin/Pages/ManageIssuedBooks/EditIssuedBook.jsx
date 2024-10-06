import React, { useState } from "react";
import './EditIssuedBooks.css';

function EditIssueBookForm({ bookData, onSubmit, onCancel, error }) {
  const [updatedBookData, setUpdatedBookData] = useState({
    ...bookData,
    fine: bookData.fine || 0,
  });

  const handleChange = (e) => {
    const value = e.target.name === 'fine' ? parseFloat(e.target.value) : e.target.value;
    setUpdatedBookData({
      ...updatedBookData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedBookData);
  };

  const handleReturnBook = () => {
    setUpdatedBookData({
      ...updatedBookData,
      status: new Date().toISOString(),
    }); 
    alert("Book marked as returned. Click 'Save Changes' to confirm.");
  };

  return (
    <div className="edit-issue-book-form">
      <h3 className="editbookhading">Edit Issued Book</h3>
      <form onSubmit={handleSubmit} className="editbookform">
        <input
        className="editissuedbookinpt"
          type="text"
          name="userId"
          value={updatedBookData.userId}
          onChange={handleChange}
          placeholder="User ID"
        />
        <input
          className="editissuedbookinpt"
          type="text"
          name="bookName"
          value={updatedBookData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
        />
        <input
          className="editissuedbookinpt"
          type="number"
          name="fine"
          value={updatedBookData.fine}
          onChange={handleChange}
          placeholder="Fine Amount"
          step="0.01"
          min="0"
        />
        <button type="button" className="editissuedbookbtn" onClick={handleReturnBook}>Return Book</button>
        <button type="submit" className="editissuedbookbtn1">Save Changes</button>
        <button type="button" className="editissuedbookbtn2" onClick={onCancel}>Cancel</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default EditIssueBookForm;