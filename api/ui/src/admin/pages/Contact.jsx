import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/contact.css'
import Topbar from '../conponents/Topbar'
import Sidebar from '../conponents/Sidebar'

import { userRequest } from '../../requestMethods';
import { getSubmissions } from '../redux/apiCalls';

const Contact = () => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const data = await getSubmissions();
                console.log("Fetched submissions:", data);
                setSubmissions(data);
            } catch (error) {
                console.error("Failed to fetch projects:", error.message);
            }
        };
        fetchSubmissions();
    }, []);
    return (
        <>
        <Topbar />
        <Sidebar />
        <div className="admin-submissions">
            
            <h2>Contact Form Submissions</h2>
            {error && <p className="error-message">{error}</p>}
            {submissions.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission, index) => (
                            <tr key={index}>
                                <td>{submission.firstName}</td>
                                <td>{submission.lastName}</td>
                                <td>{submission.email}</td>
                                <td>{submission.subject}</td>
                                <td>{submission.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No submissions yet.</p>
            )}
        </div>
        </>
    );
};

export default Contact;
