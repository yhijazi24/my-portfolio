import React from 'react'
import './css/contact.css'
import ContactForm from '../components/ContactForm'
import Navbar from '../components/Navbar'
import Name from '../components/Name'
import Footer from '../components/Footer'

import { useTranslation } from 'react-i18next';
const Contact = () => {
  
  const { t } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className='contact-card'>
       
        <div className='contact-infos'> 
          <h1 className='contact-h1'>{t("contactMe")}</h1>
          <p className='contact-info'><span>Email : </span>yahyahijazi643@gmail.com</p>
          <p className='contact-info'><span>{t("Number")}</span>+33 77 20 10 363</p>
        </div>
        <ContactForm />
      </div>
      
      <Name />
      <Footer />
    </div>
  )
}

export default Contact
