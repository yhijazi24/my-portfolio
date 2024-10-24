import React, { useState, useEffect } from 'react';
import './css/projectPage.css';
import { Close } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectPage = () => {
  const { projectId } = useParams(); 
  const [project, setProject] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const title = location.pathname.split("/")[2];
  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`https://my-portfolio0-drab.vercel.app/projects/find/${title}`);
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

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className='project-container'>
      <div className='project-wrapper'>
        <div className='project-header'>
          <h1 className='project-title'>{project.title}</h1> 
          <Link to={'/projects'}>
            <Close className='project-close' />
          </Link>
        </div>
        <div className='project-desc'>
          <div className='pi'>
            <img src={mainImage} alt='project main' className='project-image' />
            <div className='thumbnail-container'>
              {project.img && project.img.length > 0 ? (
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
            <p className='project-info'>{project.desc}</p>
          </div>
        </div>
        <div className='project-lang'>
          {project.lang && project.lang.length > 0 ? (
            project.lang.map((lang, index) => (
              <h4 key={index} className='lang'>{lang}</h4>
            ))
          ) : (
            <p>No languages specified</p>
          )}
        </div>
        <div className='project-more-desc'>
          <p className='project-more-p'>{project.fullDesc}</p>
          <div className='project-buttons'>
            {project.webLink && (
              <a href={project.webLink} target='_blank' rel='noopener noreferrer'>
                <button className='project-button'>Visit Website</button>
              </a>
            )}
            {project.github && (
              <a href={project.githubLink} target='_blank' rel='noopener noreferrer'>
                <button className='project-button'>Visit Github Repository</button>
              </a>
            )}
            <Link to={'/projects'}>
              <button className='project-button'>View Other Projects</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
