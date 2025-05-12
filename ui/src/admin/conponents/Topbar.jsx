import React from 'react';
import './css/topbar.css';
import { Language, NotificationsNone, Settings } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/apiCalls'; 
import { persistor } from '../redux/store';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      logoutUser(dispatch); 
      persistor.purge();   
      navigate('/login');   
    }
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">My portfolio Admin Panel</span>
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
