import React from 'react';
import '../style/Navbar.css';

function NavbarSE () {
  return (
    <nav className="navbar-se">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Queue System - Demo</h2>
        </div>
        <div className="navbar-menu">
          <a href="/" className="navbar-item">Home</a>
          <a href="/info" className="navbar-item">Information</a>
        </div>
      </div>
    </nav>
  );
};

export { NavbarSE };
