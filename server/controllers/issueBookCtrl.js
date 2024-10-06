const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const IssueBook = require('../model/issueBook');
const User = require('../model/user');
const Book = require('../model/books'); // Make sure to import the Book model

const getIssuedBooksByUser = async (req, res) => {
  try {
    const { userObjId } = req.query;

    if (!userObjId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userObjId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const issuedBooks = await IssueBook.find({ userId: user.userId });

    if (!issuedBooks.length) {
      return res.status(404).json({ message: 'No books found for this user' });
    }

    // Fetch detailed book information for each issued book
    const detailedIssuedBooks = await Promise.all(
      issuedBooks.map(async (issuedBook) => {
        const bookDetails = await Book.findOne({
          bookName: issuedBook.bookName,
        });
        return {
          ...issuedBook.toObject(),
          bookDetails: bookDetails ? bookDetails.toObject() : null,
        };
      })
    );

    res.status(200).json({ bookValue: detailedIssuedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getisuedBookCount = async (req, res) => {
  const { userId } = req.query;

  try {
    const issuedBooks = await IssueBook.find();
    res.send({ message: 'Success', count: issuedBooks.length });
  } catch (error) {
    console.error('Error fetching book count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Assuming the token contains user info like id
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const getIssueBooks = async (req, res) => {
  try {
    const issueBook = await IssueBook.find(
      {},
      { _id: 1, userId: 1, bookName: 1, issued_date: 1, return_date: 1, status:1 }
    ); // Changed from student_id to userId
    const bookValues = issueBook.map((item) => ({
      _id: item._id,
      userId: item.userId, // Changed from student_id to userId
      bookName: item.bookName,
      issued_date: item.issued_date,
      return_date: item.return_date,
      status:item.status,
    }));
    res.status(200).send({ bookValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error in fetching issueBooks' });
  }
};

const addIssueBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body; // Changed from student_id to userId

    const existingBook = await IssueBook.findOne({ bookId });

    if (existingBook) {
      return res
        .status(400)
        .json({ message: 'The book already exists. Please try again.' });
    }

    const getBook = await Book.findById({ _id: bookId });
    if (!getBook) {
      return res.status(400).json({ message: 'The book does not exist' });
    }

    const newIssueBook = new IssueBook({
      userId,
      bookId,
      bookName: getBook.bookName,
    });
    const savedData = await newIssueBook.save();

    res.status(201).json({ message: 'Success', data: savedData });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book' });
  }
};

const updateIssuedBook = async (req, res) => {
  try {
    const { issuedId } = req.params;
    const updatedData = req.body;

    // Ensure fine is a number
    if (updatedData.fine) {
      updatedData.fine = Number(updatedData.fine);
    }

    const updatedBook = await IssueBook.findByIdAndUpdate(
      issuedId,
      updatedData,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Issued book not found' });
    }

    res
      .status(200)
      .json({ message: 'Issued book updated successfully', data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating issued book' });
  }
};
const deleteIssuedBook = async (req, res) => {
  try {
    const ibook = await IssueBook.findByIdAndDelete(req.params.issuedId);
    if (!ibook) {
      return res.status(404).json({ error: 'Issued book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  authenticateToken,
  getisuedBookCount,
  addIssueBook,
  getIssuedBooksByUser,
  getIssueBooks,
  updateIssuedBook,
  deleteIssuedBook,
};
