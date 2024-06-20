import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form>
        <div className="input-group">
          <label>Username</label>
          <input type="text" name="username" />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
