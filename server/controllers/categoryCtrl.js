const Categories = require('../model/category'); // Corrected path

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({ category: { $exists: true } });
    const categoryValues = categories.map((item) => item.category);
    res.status(200).json({ categoryValues });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find({}, {
      _id: 1, 
      category: 1, 
      status: 1, 
      creation_date: 1, 
      updation_date: 1 
    });
    const categoryValues = categories.map((item) => ({
      _id: item._id,
      category: item.category,
      status: item.status,
      creation_date: item.creation_date,
      updation_date: item.updation_date
    }));
    res.status(200).json({ categoryValues });
  } catch (error) {
    console.error('Error fetching all categories:', error);
    res.status(500).json({ message: 'Error fetching all categories' });
  }
};

const getCategoryCount = async (req, res) => {
  try {
    const count = await Categories.countDocuments();
    res.send({ message: 'Success', count: count });
  } catch (error) {
    console.error('Error fetching category count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addCategory = async (req, res) => {
  try {
    const { category, status } = req.body;

    // Check if category already exists
    const existingCategory = await Categories.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({ message: 'The category already exists. Please try again.' });
    }

    // Proceed to create a new category
    const newCategory = new Categories({
      category,
      status: status === '1' ? 1 : 0, // Ensure status is stored as 1 or 0
    });

    const savedData = await newCategory.save(); 
    res.status(201).json({ message: 'Success', data: savedData });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ message: 'Error adding category' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    res.status(500).json({ message: 'Error fetching category' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.categoryId,
      {
        category: req.body.category, // Update the category name
        status: req.body.status === 1 ? 1 : 0, // Ensure status is stored as 1 or 0
        updation_date: new Date(), 
      },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error updating category' });
  }
};


const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category' });
  }
};

module.exports = { 
  addCategory, 
  getCategories, 
  updateCategory, 
  getAllCategories, 
  getCategoryCount, 
  deleteCategory, 
  getCategoryById 
};
