import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react"
import { useEffect, useState } from "react";
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectPage from './components/ProjectPage';
import AdminLogin from './admin/pages/Login';
import ProjectList from './admin/pages/ProjectList';
import Project from './admin/pages/Project';
import NewProject from './admin/pages/NewProject';
import HomeHeader from './admin/pages/HomeHeader';
import HomeProjects from './admin/pages/HomeProjects';
import Footer from './admin/pages/Footer';
import ContactAdmin from './admin/pages/Contact';
import ScrollToTop from './ScrollToTop';
import Maintenance from './pages/Maintenance';
import './App.css';

function App() {
  const [admin, setAdmin] = useState(null);
  const isMaintenance = false; // Toggle this manually or fetch it from backend

  useEffect(() => {
    const storedData = localStorage.getItem("persist:root");
    if (storedData) {
      const user = JSON.parse(storedData)?.user;
      const isAdmin = user && JSON.parse(user).currentUser?.isAdmin;
      setAdmin(isAdmin);
    }
  }, []);

  if (isMaintenance) {
    return <Maintenance />;
  }

  if (admin === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* UI Routes */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/projects/:title" element={<ProjectPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={admin ? <Navigate to="/admin" /> : <AdminLogin />} />
        <Route path="/admin/*" element={admin ? <ProjectList /> : <Navigate to="/admin/login" />} />
        {admin && (
          <>
            <Route exact path="/admin" element={<ProjectList />} />
            <Route exact path="/admin/project/:id" element={<Project />} />
            <Route exact path="/admin/newproject" element={<NewProject />} />
            <Route exact path="/admin/homeHeader" element={<HomeHeader />} />
            <Route exact path="/admin/homeProjects" element={<HomeProjects />} />
            <Route exact path="/admin/footer" element={<Footer />} />
            <Route exact path="/admin/contact" element={<ContactAdmin />} />
          </>
        )}
        <Route path="*" element={admin ? <Navigate to="/admin" /> : <Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
