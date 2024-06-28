import React from 'react';
import './Profile.css';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {
      }
    </div>
  );
};

export default Profile;
