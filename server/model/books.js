const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
    unique: true, // Ensure unique ISBNs
  },
  price: {
    type: Number,
    required: true,
  },
  bookPicture: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema); // Corrected model name

module.exports = Book;
