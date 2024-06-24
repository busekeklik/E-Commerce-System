import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password, address } = formData;

    const body = {
      username,
      email,
      password,
      address
    };

    try {
      const response = await axios.post('http://localhost:8080/api/1.0/users/addUser', body, { withCredentials: true });


      console.log('API response:', response);
      if (response.status === 200) {
        console.log('Registration successful');
        localStorage.setItem('user', JSON.stringify({ username }));
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>Username</label>
          <input type="text" name="username" onChange={handleInputChange} value={formData.username} />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleInputChange} value={formData.email} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleInputChange} value={formData.password} />
        </div>
        <div className="input-group">
          <label>Address</label>
          <input type="text" name="address" onChange={handleInputChange} value={formData.address} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
