import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './css/footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [footer, setFooter] = useState({
    creator: '',  
  resumeLink: '',
  linkdinLink: '',
  githubLink: '',
  });

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`https://portfolio-w14d.onrender.com/footer/`);
        console.log('Fetched Footer Data:', res.data);
        setFooter(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getFooter();
  }, []);

  return (
    <div className='footer-container'>
      <div className='footer-wrapper'>
        <div className='footer-cred'>
          <p className='footer-creds'>
            2024 {footer.creator || 'ScarletWeb24'}.<br />
            &#169; All Rights Reserved
          </p>
        </div>
        <div className='footer-links'>
          <Link to={'/'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>Home</p>
          </Link>
          <Link to={'/contact'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>Get in Touch</p>
          </Link>
          <a href={footer.resumeLink} target="_blank" rel="noopener noreferrer">
            <p className='footer-link'><span className='arrow'>&gt; </span>Resume</p>
          </a>
          <a href={footer.linkdinLink} target="_blank" rel="noopener noreferrer">
            <p className='footer-link'><span className='arrow'>&gt; </span>LinkedIn</p>
          </a>
          <Link to={'/projects'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>Projects</p>
          </Link>
          <a href={footer.githubLink} target="_blank" rel="noopener noreferrer">
            <p className='footer-link'><span className='arrow'>&gt; </span>GitHub</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
