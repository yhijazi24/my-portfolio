import './Admin.css';
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ProjectList from './pages/ProjectList';
import Project from './pages/Project';
import NewProject from './pages/NewProject';
import Topbar from './conponents/Topbar';
import Sidebar from './conponents/Sidebar';
import HomeHeader from './pages/HomeHeader';
import HomeProjects from './pages/HomeProjects'; 
import Footer from './pages/Footer';
import Contact from './pages/Contact';
import { useEffect, useState } from "react";

function App() {
  const [admin, setAdmin] = useState(null);

  // Fetch and parse user data only once when app starts
  useEffect(() => {
    const storedData = localStorage.getItem("persist:root");
    if (storedData) {
      const user = JSON.parse(storedData)?.user;
      const isAdmin = user && JSON.parse(user).currentUser?.isAdmin;
      setAdmin(isAdmin);
    }
  }, []);

  // While checking the admin state
  if (admin === null) {
    return <div>Loading...</div>; // Add a loading state while admin status is being checked
  }

  return (
    <div>
      <Router>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
            </div>
          </>
        )}
        
        <Routes>
          <Route 
            path="/login" 
            element={admin ? <Navigate to="/" /> : <Login />}  
          />
          {admin && (
            <>
              <Route exact path='/' element={<ProjectList />} />
              <Route exact path='/project/:id' element={<Project />} />
              <Route exact path='/newproject' element={<NewProject />} />
              <Route exact path='/homeHeader' element={<HomeHeader />} />
              <Route exact path='/homeProjects' element={<HomeProjects />} />
              <Route exact path='/footer' element={<Footer />} />
              <Route exact path='/contact' element={<Contact />} />
            </>
          )}
          <Route 
            path="*" 
            element={admin ? <Navigate to="/" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
