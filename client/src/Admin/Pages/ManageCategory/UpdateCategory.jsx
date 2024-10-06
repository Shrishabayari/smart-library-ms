import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCategory.css'

const EditCategory = ({ categoryId, onEditSuccess }) => {
    const [category, setCategory] = useState({ category: '', status: 0 });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/categories/${categoryId}`);
                setCategory({
                    category: response.data.category || '',
                    status: response.data.status || 0, // Default to 0 if no status is found
                });
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCategory({
            ...category,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value, // Convert checkbox to 1 or 0 for status
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/categories/${categoryId}`, category);
            onEditSuccess(response.data); // Callback to update parent component
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <div className='edit-category-form'>
            <h3 className='edit-heading'>Edit Category : </h3>
            <form className='edit_category' onSubmit={handleSubmit}>
                <div className='divs'>
                    <label className='edit-category-label'>Category Name : </label>
                    <input
                        className='edit-category-input1'
                        type="text"
                        name="category"
                        value={category.category}
                        onChange={handleChange}
                    />
                </div>
                <div className='divs'>
                    <label className='edit-category-label1'>Status : </label>
                    <label className='edit-category-label2'>Active</label>
                    <input
                        className='edit-category-input2'
                        type="checkbox"
                        name="status"
                        checked={category.status === 1} // Convert 1 to checked
                        onChange={handleChange}
                    />
                </div>
                <button className='EDIT-CATEGORY-btn' type="submit">Update Category</button>
            </form>
        </div>
    );
};

export default EditCategory;
