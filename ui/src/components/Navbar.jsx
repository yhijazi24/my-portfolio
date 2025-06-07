import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './css/navbar.css';
import { MenuSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
const { i18n } = useTranslation();
  const dropDown = () => {
    if (window.innerWidth < 768) {
      setMobileMenuVisible(!isMobileMenuVisible);
    }
  };
const { t } = useTranslation();
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
            <p className='navbar-link'>{t("Resume")}</p>
          </a>
          <Link to={'/projects'}>
            <p className='navbar-link'>{t("project")}</p>
          </Link>
          <Link to={'/contact'}>
            <button className='navbar-button'>{t("contactMe")}</button>
          </Link>
          <div className='lang-pref'>
            
<button className='lang-button' onClick={() => i18n.changeLanguage('en')}>EN</button>
<button className='lang-button' onClick={() => i18n.changeLanguage('fr')}>FR</button>
          </div>

        </div>
        <div className='hamburger-menu' onClick={dropDown}>
          <MenuSharp />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
