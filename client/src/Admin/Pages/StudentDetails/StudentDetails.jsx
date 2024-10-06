import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Head from '../../Components/Head/Head';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './StudentDetails.css'; // Optional: Add styling for the details page

const StudentDetails = () => {
    const { id } = useParams(); // Get userId from URL
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/user/user/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudentDetails();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (!student) return <p>No student data found.</p>;

    return (
        <div>
            <Head /><hr /><Navbar />
            <h2 className='details-heading'>STUDENT DETAILS</h2>
            <div className="details-container">
                <h2 className='studnt-details'>Student Info</h2>
                <p><strong>ID:</strong> {student.userId}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
                <p><strong>Mobile:</strong> {student.mobile}</p>
                <p><strong>Registration Date:</strong> {new Date(student.creation_date).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {student.status === 'blocked' ? 'Blocked' : 'Active'}</p>
                {/* Add any other student details you want to display */}
            </div>
            <hr /><Footer />
        </div>
    );
}

export default StudentDetails;
