import React, { useState, useEffect } from 'react';
import './css/projectPage.css';
import { Close } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { i18n, t } = useTranslation(); // added t for translations

  const titleParam = location.pathname.split("/")[2];

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`https://portfolio-w14d.onrender.com/projects/find/${titleParam}`);
        setProject(res.data);
        if (res.data.img && res.data.img.length > 0) {
          setMainImage(res.data.img[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getProject();
  }, [projectId]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  if (!project) return <p>Loading...</p>;

  // Translated fields (safe to use here)
  const translatedTitle = i18n.language === 'fr' ? project.titleFr : project.title;
  const translatedDesc = i18n.language === 'fr' ? project.descFr : project.desc;
  const translatedFullDesc = i18n.language === 'fr' ? project.fullDescFr : project.fullDesc;

  return (
    <div className='project-container'>
      <div className='project-wrapper'>
        <div className='project-header'>
          <h1 className='project-title'>{translatedTitle}</h1>
          <Link to={'/projects'}>
            <Close className='project-close' />
          </Link>
        </div>
        <div className='project-desc'>
          <div className='pi'>
            <img src={mainImage} alt='project main' className='project-image' />
            <div className='thumbnail-container'>
              {project.img?.length > 0 ? (
                project.img.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`project thumbnail ${index}`}
                    className={`project-thumbnail ${image === mainImage ? 'selected' : 'unselected'}`}
                    onClick={() => handleImageClick(image)}
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>
          <div className='pp'>
            <p className='project-info'>{translatedDesc}</p>
          </div>
        </div>

        <div className='project-lang'>
          {project.lang?.length > 0 ? (
            project.lang.map((lang, index) => (
              <h4 key={index} className='lang'>{lang}</h4>
            ))
          ) : (
            <p>No languages specified</p>
          )}
        </div>

        <div className='project-more-desc'>
          <p className='project-more-p'>
            {translatedFullDesc.split('-').map((line, index) => (
              <span key={index}>
                {index > 0 && <br />}
                {line.trim()}
              </span>
            ))}
          </p>

          <div className='project-buttons'>
            {project.webLink && (
              <a href={project.webLink} target='_blank' rel='noopener noreferrer'>
                <button className='project-button'>{t("Website")}</button>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target='_blank' rel='noopener noreferrer'>
                <button className='project-button'>{t("Github")}</button>
              </a>
            )}
            <Link to={'/projects'}>
              <button className='project-button'>{t("otherProjects")}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
