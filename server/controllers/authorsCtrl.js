const Author = require('../model/author');

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({}, { _id: 1, author: 1, creation_date:1, updation_date:1 });
    const authorValues = authors.map((item) => {
      return { _id: item._id, author: item.author, creation_date:item.creation_date, updation_date:item.updation_date };
    });
    res.status(200).send({ authorValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching authors' });
  }
};
const getAuthors = async (req, res) => {
  try {
    const author = await Author.find({ author: { $exists: true } });
    const authorValues = author.map((item) => item.author);
    res.status(200).send({ authorValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching authors' });
  }
}; 
const getAuthorCount = async (req, res) => {
  try {
    const count = await Author.countDocuments();
    res.send({ message: 'Success', count: count });
  } catch (error) {
    console.error('Error fetching book count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addAuthor = async (req, res) => {
  try {
    const { author } = req.body;

    // Check if the author already exists
    const existingAuthor = await Author.findOne({ author });
    if (existingAuthor) {
      return res.status(400).json({ message: 'Author already exists...' });
    }

    // If the author does not exist, save the new author
    const newAuthor = new Author({
      author,
    });
    const savedData = await newAuthor.save();
    res.status(201).json({ message: 'Success', data: savedData });
  } catch (error) {
    console.error('Error adding author:', error);
    res.status(500).json({ message: 'Error adding author' });
  }
};


const updateAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;
    const { author } = req.body; // Updated author data

    const existingAuthor = await Author.findById(authorId);
    if (!existingAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    // Update the existing author document with the new data
    existingAuthor.author = author; // Set the updated author name
    const updatedAuthor = await existingAuthor.save(); // Save the updated document

    res.status(200).json({ message: 'Author updated successfully', data: updatedAuthor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating author' });
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

module.exports = { getAllAuthors, getAuthors, getAuthorCount, addAuthor, updateAuthor, deleteAuthor };