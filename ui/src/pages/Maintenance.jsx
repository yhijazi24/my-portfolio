import React from 'react';
import './css/maintenance.css';

const Maintenance = () => {
  return (
    <div className="maintenance-wrapper">
      <div className="maintenance-box">
        <h1>Website Under Maintenance</h1>
        <p>I'm currently working on some updates to improve the experience.</p>
        <p>Please check back soon. Thank you for your patience!</p>
        <div className="contact-links">
          <a href="https://github.com/yhijazi24" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="www.linkedin.com/in/yahya24hijazi" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
