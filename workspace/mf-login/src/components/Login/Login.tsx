import React from 'react';
import './Login.css';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login App Hibrido</h2>
        <form className="form">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
