const express = require('express');
const router = express.Router();
const { getIssuedBooksByUser, getisuedBookCount, getIssueBooks, addIssueBook, updateIssuedBook, deleteIssuedBook } = require('../controllers/issueBookCtrl');

// Route for getting issued books by user
router.get('/bookDetails', getIssuedBooksByUser); // <-- Correct endpoint

// Other routes
router.get('/issuedBooks', getIssueBooks);
router.get('/count', getisuedBookCount); // Fetch issued books based on userId in query
router.post('/', addIssueBook); // Add an issued book
router.put('/:issuedId', updateIssuedBook); // Update an issued book
router.delete('/:issuedId', deleteIssuedBook); // Delete an issued book

module.exports = router;
