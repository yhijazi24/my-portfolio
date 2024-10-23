import React from 'react'
import './css/projects.css'
import ProjectsList from '../components/ProjectsList'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectPage from '../components/ProjectPage'

const Projects = () => {
  return (
    <div>
      <Navbar />
      <ProjectsList />
      <Footer />
    </div>
  )
}

export default Projects
