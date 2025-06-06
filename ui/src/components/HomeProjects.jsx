import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './css/homeProjects.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HomeProjects = () => {
  const [projectsData, setProjectsData] = useState(null);
  const projectRef = useRef(null);
  const { i18n } = useTranslation();
  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const response = await axios.get("https://portfolio-w14d.onrender.com/homeProject/");
        setProjectsData(response.data[0]);
      } catch (error) {
        console.error("Error fetching projects data:", error);
      }
    };

    fetchProjectsData();
  }, []);

  useEffect(() => {
    const project = projectRef.current;
    if (!project) return;

    const handleMouseMove = (e) => {
      const rect = project.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width;
      const centerY = rect.height;

      const rotateX = ((y - centerY) / centerY) * 15;
      const rotateY = ((centerX - x) / centerX) * 15;

      project.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      project.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    project.addEventListener('mousemove', handleMouseMove);
    project.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      project.removeEventListener('mousemove', handleMouseMove);
      project.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!projectsData) {
    return <div className='homeProjects-container'><p>Loading...</p></div>;
  }

  const title = i18n.language === 'fr' ? projectsData.titleFr : projectsData.title;
  const subTitle = i18n.language === 'fr' ? projectsData.subTitleFr : projectsData.subTitle;

  return (
    <div className='homeProjects-container'>
      <div className='homeProjects-wrapper' ref={projectRef}>
        <div className='homeProjects-box'>
          {Array.isArray(projectsData.img) && projectsData.img.length > 0 ? (
            projectsData.img.map((url, index) => (
              <Link key={index} to="/projects">
                <div className={`homeProjects-card img-${index + 1}`}>
                  <div className='homeProjects-rotation'>
                    <img
                      src={url}
                      className={`homeProjects-img home-img-${index + 1}`}
                      alt={`Project ${index + 1}`}
                    />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Loading images...</p>
          )}
        </div>
        <div className='homeProjects-content'>
          <Link to="/projects">
            <h2 className='homeProjects-title'>{title || 'Loading...'}</h2>
          </Link>
          <p className='homeProjects-desc'>{subTitle || 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeProjects;
