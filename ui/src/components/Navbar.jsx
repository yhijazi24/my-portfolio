import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './css/navbar.css';
import { MenuSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);

  const dropDown = () => {
    if (window.innerWidth < 768) {
      setMobileMenuVisible(!isMobileMenuVisible);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuVisible(true);
      } else {
        setMobileMenuVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
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
    <div className='navbar-container'>
      <div className='navbar-wrapper'>
        <div className='navbar-title'>
          <Link to={'/'}>
            <h1>Y.HIJAZI</h1>
          </Link>
        </div>
        <div className={`navbar-links ${isMobileMenuVisible ? 'visible' : 'hidden'}`} id='hamburgerMenu'>
          <a href={footer.resumeLink} target="_blank" rel="noopener noreferrer">
            <p className='navbar-link'>Resume</p>
          </a>
          <Link to={'/projects'}>
            <p className='navbar-link'>Projects</p>
          </Link>
          <Link to={'/contact'}>
            <button className='navbar-button'>Contact Me</button>
          </Link>
        </div>
        <div className='hamburger-menu' onClick={dropDown}>
          <MenuSharp />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
