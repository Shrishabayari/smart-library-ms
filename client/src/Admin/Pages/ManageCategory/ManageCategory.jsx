import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCategory.css';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import EditCategory from './UpdateCategory';

function ManageCategory() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/v1/categories');
                console.log('Fetched categories:', response.data); // Debugging line
                setCategories(response.data.categoryValues);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteClick = async (categoryId) => {
        const confirmation = window.confirm('Are you sure you want to delete this category?');
        if (!confirmation) {
            return;
        }

        try {
            await axios.delete(`http://localhost:3000/api/v1/categories/${categoryId}`);
            setCategories(categories.filter((category) => category._id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleEditClick = (categoryId) => {
        console.log('Editing category ID:', categoryId); // Debugging line
        setEditingCategoryId(categoryId);
    };

    const handleEditSuccess = (updatedCategory) => {
        console.log('Updated category:', updatedCategory); // Debugging line
        setEditingCategoryId(null);
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category._id === updatedCategory._id ? updatedCategory : category
            )
        );
    };

    return (
        <div className="table-container">
            <Head />
            <hr /><Navbar />
            <h2 className='manage-heading1'>MANAGE CATEGORIES</h2>
            {isLoading ? <p>Loading categories...</p> : null}
            <div className="container1">
                <p className='th'>Categories Listed</p>
                <table className="table1">
                    <thead>
                        <tr className='tr'>
                            <th>#</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Creation Date</th>
                            <th>Updation Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.category}</td>
                                    <td>{item.status}</td>
                                    <td>{new Date(item.creation_date).toLocaleDateString()}</td>
                                    <td>{new Date(item.updation_date).toLocaleDateString()}</td>
                                    <td className='hu'>
                                        <button className='edit' onClick={() => handleEditClick(item._id)}>Edit</button>
                                        <button className='delete' onClick={() => handleDeleteClick(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No categories found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {editingCategoryId && (
                <EditCategory
                    categoryId={editingCategoryId}
                    onEditSuccess={handleEditSuccess}
                />
            )}<br/> <br/>  
            <hr />
            <Footer />
        </div>
    );
}

export default ManageCategory;
