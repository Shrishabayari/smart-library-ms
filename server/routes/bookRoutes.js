const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer')
const { getAllBooks, addBook, getBooks, getBooksByName, getBookNames, getBookCount, updateBook, deleteBook } = require('../controllers/booksCtrl');

router.get('/', getAllBooks);
router.post('/', upload.single("bookPicture"), addBook);
router.get('/bookNames', getBooks);
router.get('/book', getBookNames);
router.get('/bookName', getBooksByName);
router.get('/bookCount', getBookCount);
router.delete('/:bookId', deleteBook);
router.put('/:bookId', updateBook);


module.exports = router;
