import React from 'react'
import './css/contact.css'
import ContactForm from '../components/ContactForm'
import Navbar from '../components/Navbar'
import Name from '../components/Name'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className='contact-card'>
       
        <div className='contact-infos'> 
          <h1 className='contact-h1'>Contact Me</h1>
          <p className='contact-info'><span>Email : </span>yahyahijazi643@gmail.com</p>
          <p className='contact-info'><span>Phone Number : </span>+33 77 20 10 363</p>
        </div>
        <ContactForm />
      </div>
      
      <Name />
      <Footer />
    </div>
  )
}

export default Contact
