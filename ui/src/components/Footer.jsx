import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import './css/footer.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const [footer, setFooter] = useState(null); // null until loaded
const { t } = useTranslation();
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(`https://portfolio-w14d.onrender.com/footer/`);
        console.log('Fetched Footer Data:', res.data);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setFooter(res.data[0]);
        }
      } catch (err) {
        console.error("Footer fetch error:", err);
      }
    };
    getFooter();
  }, []);

  if (!footer) return null; // avoid rendering until data is ready

  return (
    <div className='footer-container'>
      <div className='footer-wrapper'>
        <div className='footer-cred'>
          <p className='footer-creds'>
            2024 {footer.creator || 'ScarletWeb24'}.<br />
            &#169; {t("AllRightsReserved")}
          </p>
        </div>
        <div className='footer-links'>
          <Link to={'/'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>{t("Home")}</p>
          </Link>
          <Link to={'/contact'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>{t("contact")}</p>
          </Link>
          {footer.resumeLink && (
            <a href={footer.resumeLink} target="_blank" rel="noopener noreferrer">
              <p className='footer-link'><span className='arrow'>&gt; </span>{t("Resume")}</p>
            </a>
          )}
          {footer.linkedinLink && (
            <a href={footer.linkedinLink} target="_blank" rel="noopener noreferrer">
              <p className='footer-link'><span className='arrow'>&gt; </span>LinkedIn</p>
            </a>
          )}
          <Link to={'/projects'}>
            <p className='footer-link'><span className='arrow'>&gt; </span>{t("project")}</p>
          </Link>
          {footer.githubLink && (
            <a href={footer.githubLink} target="_blank" rel="noopener noreferrer">
              <p className='footer-link'><span className='arrow'>&gt; </span>GitHub</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
