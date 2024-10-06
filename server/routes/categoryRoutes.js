const express = require('express');
const { addCategory, getCategories, getAllCategories, updateCategory,  getCategoryCount, deleteCategory, getCategoryById } = require('../controllers/categoryCtrl');
const router = express.Router();

router.get('/categories', getCategories);
router.post('/', addCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.get('/:id/categoryCount', getCategoryCount);
router.put('/:categoryId',updateCategory);
router.delete('/:categoryId',deleteCategory);

module.exports = router;
