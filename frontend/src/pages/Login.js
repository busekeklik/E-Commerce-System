import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/1.0/authenticate', formData, { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data);
        navigate('/');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required onChange={handleInputChange} value={formData.username} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={handleInputChange} value={formData.password} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
