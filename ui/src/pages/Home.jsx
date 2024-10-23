import React from 'react'
import './css/home.css'
import Navbar from '../components/Navbar'
import Body from '../components/Body'
import HomeProjects from '../components/HomeProjects'
import Name from '../components/Name'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Navbar />
      <Body />
      <HomeProjects />
      <Name />
      <Footer />
    </div>
  )
}

export default Home
