const express = require('express');
const { getAllAuthors, getAuthors, getAuthorCount, addAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorsCtrl');

const router = express.Router();

router.get('/', getAllAuthors);
router.post('/', addAuthor);
router.get('/authorNames', getAuthors);
router.get('/count', getAuthorCount);
router.put('/:authorId', updateAuthor);
router.delete('/:authorId', deleteAuthor);

module.exports = router;