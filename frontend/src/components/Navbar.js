import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="brand-title">Diff-Jewel</div>
      <div className="navbar-links">
        <ul>
          <li><a href="#home">Ring</a></li>
          <li><a href="#about">Necklace</a></li>
          <li><a href="#services">Bracklet</a></li>
        </ul>
      </div>
      <div className="auth-buttons">
        <Link to="/login"><button className="login-button">Login</button></Link>
        <Link to="/register"><button className="register-button">Register</button></Link>
      </div>
    </nav>
  );
};

export default Navbar;
