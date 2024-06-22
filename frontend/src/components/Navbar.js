import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <div className="brand-title">
        <Link to="/" className="brand-link">Diff-Jewel</Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/ring">Ring</Link></li>
          <li><Link to="/necklace">Necklace</Link></li>
          <li><Link to="/bracelet">Bracelet</Link></li>
        </ul>
      </div>
      {user ? (
        <div className="user-profile">
          <Link to="/profile" className="profile-link">{user.username}</Link>
          <Link to="/cart"><FaShoppingCart className="cart-icon" /></Link>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login"><button className="login-button">Login</button></Link>
          <Link to="/register"><button className="register-button">Register</button></Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
