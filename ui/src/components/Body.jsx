import React, { useEffect, useRef, useState } from 'react';
import './css/body.css';
import axios from 'axios';

const Body = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [home, setHome] = useState({});
  const tabletRef = useRef(null);
  const contentResumeRefs = useRef([]);

  const scrollToSection = (index) => {
    setActiveSection(index);
  };

  // Fetch data from API
  useEffect(() => {
    const getHome = async () => {
      try {
        const res = await axios.get("https://portfolio-w14d.onrender.com/homeHeader/");
        console.log(res)
        setHome(res.data[0]);
      } catch (err) {
        console.error("Error fetching data: ", err.response ? err.response.data : err.message);
      }
    };
    getHome();
  }, []);

  useEffect(() => {
    const tablet = tabletRef.current;
    
    const handleMouseMove = (e) => {
      const rect = tablet.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * 10;
      const rotateY = (centerX - x) / centerX * 10;

      tablet.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      tablet.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    tablet.addEventListener('mousemove', handleMouseMove);
    tablet.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      tablet.removeEventListener('mousemove', handleMouseMove);
      tablet.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Manage mouseover/mouseleave for resumes
  useEffect(() => {
    const contentResumes = contentResumeRefs.current;

    contentResumes.forEach((resume, index) => {
      const handleMouseOver = () => {
        contentResumes.forEach((otherResume, otherIndex) => {
          if (otherIndex < index) {
            otherResume.classList.add('move-left');
          } else if (otherIndex > index) {
            otherResume.classList.add('move-right');
          }
        });
      };

      const handleMouseLeave = () => {
        contentResumes.forEach((otherResume) => {
          otherResume.classList.remove('move-left', 'move-right');
        });
      };

      resume.addEventListener('mouseover', handleMouseOver);
      resume.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        resume.removeEventListener('mouseover', handleMouseOver);
        resume.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <div className='body-container'>
      <div className='body-wrapper'>
        <div className='swiper-container'>
          <div className='swiper-wrapper' style={{ transform: `translateX(-${activeSection * 100}%)` }}>
            <div className='swiper-slide'>
              <div className='content'>
                <h1 className='content-title' ref={tabletRef}>Yahya Hijaz Yahya Hijazi Yahy Hiajzi{home.title}</h1>
              </div>
            </div>
            <div className='swiper-slide'>
              <div className='content'>
                <p className='content-info'>
                  {home.aboutMe}
                </p>
              </div>
            </div>
            <div className='swiper-slide'>
              <div className='content content3'>
                <div className='content-resume'>
                  <button className='resume-button resume1' ref={el => (contentResumeRefs.current[0] = el)}>
                    <img src={home.resumeImg && home.resumeImg[0]} className='resume' alt='French resume' />
                    <div className='layer'></div>
                    <p className='resume-lang'>FRENCH</p>
                  </button>
                </div>
                <div className='content-resume'>
                  <button className='resume-button resume2' ref={el => (contentResumeRefs.current[1] = el)}>
                    <img src={home.resumeImg && home.resumeImg[1]} className='resume' alt='English resume' />
                    <div className='layer'></div>
                    <p className='resume-lang'>ENGLISH</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='body-list'>
          <button className={`list-button ${activeSection === 0 ? 'active' : ''}`} onClick={() => scrollToSection(0)}>HOME</button>
          <button className={`list-button ${activeSection === 1 ? 'active' : ''}`} onClick={() => scrollToSection(1)}>ABOUT ME</button>
          <button className={`list-button ${activeSection === 2 ? 'active' : ''}`} onClick={() => scrollToSection(2)}>RESUME</button>
        </div>
      </div>
    </div>
  );
};

export default Body;
