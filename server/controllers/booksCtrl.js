const Book = require('../model/books');
const { uploadImages } = require('../config/multer');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    // const formattedBooks = books.map((book) => {
    //   return {
    //     ...book.toObject(),
    //     bookPictureBase64: book.bookPicture
    //       ? book.bookPicture.toString('base64')
    //       : null,
    //   };
    // });
    res.status(200).send({ books });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send({ message: 'Error fetching books' });
  }
};
const getBooksByName = async (req, res) => {
  try {
    const { bookName } = req.query;

    if (!bookName) {
      return res.status(400).json({ message: 'Book name is required' });
    }

    const bookname = await issuedBooks.findByName(bookName);

    if (!bookname) {
      return res.status(404).json({ message: 'bookname not found' });
    }

    const bookInfo = await Book.find({
      bookName: issuedBooks.bookName,
      category: issuedBooks.category,
    });
    if (!bookInfo.length) {
      return res
        .status(404)
        .json({ message: 'No books found for this book name' });
    }
    res.status(200).json({ bookValue: bookInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBookNames = async (req, res) => {
  try {
    const bookNames = await Book.find({ bookName: { $exists: true } });
    const booknameValues = bookNames.map((item) => item.bookName);
    res.status(200).send({ booknameValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching book Names' });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find(
      {},
      { _id: 1, bookName: 1, category: 1, author: 1, isbn: 1, price: 1, bookPicture:1 }
    );
    const bookValues = books.map((item) => {
      return {
        _id: item._id,
        bookName: item.bookName,
        category: item.category,
        author: item.author,
        isbn: item.isbn,
        price: item.price,
        bookPicture:item.bookPicture,
      };
    });
    res.status(200).send({ bookValues });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'error in feaching books' });
  }
};

const getBookCount = async (req, res) => {
  try {
    const count = await Book.countDocuments();
    res.send({ message: 'Success', count: count });
  } catch (error) {
    console.error('Error fetching book count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addBook = async (req, res) => {
  try {
    const { bookName, category, author, isbn, price } = req.body;
    const bookPicture = req.file;

    let imageUrl = '';
    if (bookPicture) {
      const uploadedImage = await uploadImages([bookPicture]); // Wrap single file in array
      imageUrl = uploadedImage[0];
    }
    
    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      return res
        .status(400)
        .json({ message: 'The book with the same ISBN already exists. Please try again.' });
    }

    const newBook = new Book({
      bookName,
      category,
      author,
      isbn,
      price,
      bookPicture: imageUrl,
    });

    const savedBook = await newBook.save();
    res.send({ message: 'Success', data: savedBook });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding book' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const updatedData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res
      .status(200)
      .json({ message: 'Book updated successfully', data: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating book' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: 'book not found' });
    }
    res.status(200).json({ message: 'book deleted successfully' });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to delete book',
    });
  }
};

module.exports = {
  getAllBooks,
  getBooksByName,
  getBooks,
  getBookNames,
  addBook,
  getBookCount,
  updateBook,
  deleteBook,
};
