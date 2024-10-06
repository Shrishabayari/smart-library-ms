import React, {useState, useEffect} from "react";
import Head from "../../Components/Head/Head";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import './ListedBooks.css';

const BooksListed=()=>{
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/v1/books/bookNames');
        setBooks(response.data.bookValues);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return(
    <div>
      <Head/><hr />
      <h1 className="userbookHeading">BOOKS LISTED</h1>
      <div className='table-headin1'>
        <p className='th'>Books Listing</p>
        <table className="user-book-table">
          <thead>
            <tr className='tr'>
              <th>#</th>
              <th>Books</th>
              <th>Category</th> 
              <th>Author</th>
              <th>ISBN</th>
              <th>Price</th>
              <th>Action</th>   
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bookName}</td>
                <td>{item.category}</td>
                <td>{item.author}</td>
                <td>{item.isbn}</td>
                <td>{item.price}</td>
                <td className="h">
                  <button className="edit" onClick={() => handleEditClick(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteClick(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div><hr /><Footer/>
    </div>
  )
}
export default BooksListed;