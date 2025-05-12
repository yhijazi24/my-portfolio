import React, { useState } from 'react';
import axios from 'axios';
import './css/contactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://portfolio-backend-upzy.onrender.com/contact', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
    };

    return (
        <div className='contactform-container'>
            <form className='contact-form' onSubmit={handleSubmit}>
                <div className='contact-form-wrapper'>
                    <div className='contact-form-group'>
                        <div className='contact-form-input'>
                            <label htmlFor='first-name' className='contact-form-label'>First Name<span className="required">*</span></label>
                            <input type='text' id='first-name' name='firstName' placeholder='Enter your first name' required className='contact-form-vrai' value={formData.firstName}
                                onChange={handleChange} />
                        </div>
                        <div className='contact-form-input'>
                            <label htmlFor='last-name' className='contact-form-label'>Last Name<span className="required">*</span></label>
                            <input type='text' id='last-name' name='lastName' placeholder='Enter your last name' required className='contact-form-vrai' value={formData.lastName}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='contact-form-input'>
                            <label htmlFor='email' className='contact-form-label'>Email<span className="required">*</span></label>
                            <input type='email' id='email' name='email' placeholder='Enter your email' required className='contact-form-vrai subject' value={formData.email}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className='contact-form-input'>
                            <label htmlFor="subject" className='contact-form-label'>Subject<span className="required">*</span></label>
                            <input type="text" id="subject" name="subject" placeholder="Subject" required
                                className='contact-form-vrai subject' value={formData.subject}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className='contact-form-input'>
                            <label htmlFor="message" className='contact-form-label'>Message<span className="required">*</span></label>
                            <textarea id="message" name="message" required className='contact-form-vrai help' value={formData.message}
                                onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className='contact-form-button'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
