import React from 'react';
import './Footer.css'
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="footer-text">
            <p>&copy; {currentYear} Srinivas Library Management System | Designed by: SHRISHA BAYARI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
