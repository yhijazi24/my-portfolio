import './css/projectList.css';
import { projectData } from '../project';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProjectsList = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const [filters, setFilters] = useState([]); 
  const [type, setType] = useState(null); 


  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };


  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(`https://13.36.69.227.nip.io/projects/`);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getProjects();
  }, []);

  const allLanguages = Array.from(
    new Set(
      projects.flatMap((project) => project.lang)
    )
  );

  useEffect(() => {
    if (filters.length > 0) {
      setFilteredProjects(
        projects.filter((project) =>
          filters.every((filter) => project.lang.includes(filter))
        )
      );
    } else {
      setFilteredProjects(projects); 
    }
  }, [projects, filters]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleFilter = (filter) => {
    setFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <div className='project-list-container'>
      <div className='project-list-wrapper'>
        <div className='project-list-header'>
          <div className='project-list-title'>
            <h1 className='project-list-h1'>PROJECTS & CERTIFICATIONS</h1>
          </div>
          <div className='project-list-filter'>
            <div className='projects-filter'>
              <button className='filter-button' onClick={() => setFilters([])}>
                All
              </button>
              {filtersVisible ? (
                <ExpandMore className='filter-less' onClick={toggleFilters} />
              ) : (
                <ExpandLess className='filter-more' onClick={toggleFilters} />
              )}
            </div>
            <div
              className={`filter-buttons-wrapper ${filtersVisible ? 'show-filters' : 'hide-filters'}`}
            >
              {allLanguages.map((lang) => (
                <button
                  key={lang}
                  className={`project-list-filter-button ${filters.includes(lang) ? 'active-filter' : ''}`}
                  onClick={() => toggleFilter(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='project-list-body'>
          <div className='project-list-cards'>
            {currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <div className='project-list-card' key={project.id}>
                 <img src={project.img[0]} alt='project image' className='project-list-image' />

                  <div className='project-list-info'>
                    <h3 className='project-list-title'>{project.title}</h3>
                    <div className='project-list-lang'>
                      {project.lang.map((langItem, index) => (
                        <span key={index}>{langItem}</span>
                      ))}
                    </div>
                    <div className='button-wrapper'>
                      <Link to={`/project/${project.title}`}>
                        <button className='project-list-button'> MORE </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        </div>
        <div className='pagination'>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`page-button ${i + 1 === currentPage ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
