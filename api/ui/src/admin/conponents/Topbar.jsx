import React from 'react';
import './css/topbar.css';
import { Language, NotificationsNone, Settings } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/apiCalls'; // Assuming the logoutUser function is in apiCalls.js
import { persistor } from '../redux/store'; // Access the persistor to clear persisted state

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logoutUser(dispatch);  // Dispatches the logout action to update Redux state
      persistor.purge();     // Clears persisted user data in localStorage
      navigate('/login');    // Redirects to the login page
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Mustad Maroc</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img 
            src="https://www.mustad.com/sites/mustad.com/files/logo/Mustad%E2%80%94logo.svg" 
            alt="" 
            className="topAvatar" 
          />
          <button onClick={handleLogoutClick} className="logoutButton">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
