import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';


const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

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
          <Link to="/cart"><FaShoppingCart className="cart-icon" /></Link>
          <button className="username">{user.username}</button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/cart"><FaShoppingCart className="cart-icon" /></Link>
          <Link to="/login"><button className="login-button">Login</button></Link>
          <Link to="/register"><button className="register-button">Register</button></Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
