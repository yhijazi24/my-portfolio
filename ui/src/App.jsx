import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectPage from './components/ProjectPage';
import Admin from '../../admin/src/App'
import './App.css'
import ScrollToTop from './ScrollToTop';

const App = () => {

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/project/:title" element={<ProjectPage />} />
        <Route exact path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
