const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true, // Enforce unique category names (optional)
  },
  status: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  updation_date: {
    type: Date,
    default: Date.now, // Optional: update on modification
  }
});

const Categories = mongoose.model('categories', categorySchema); // Corrected model name

module.exports = Categories;
