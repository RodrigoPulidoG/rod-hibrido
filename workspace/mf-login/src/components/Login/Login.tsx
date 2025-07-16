import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { MOCK_PASSWORD, MOCK_USER } from '../../constants';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      navigate('/home');
      const loginSuccessEvent = new CustomEvent('loginSuccess', {
        detail: { token: authToken, type: 'persistent' }
      });
      window.dispatchEvent(loginSuccessEvent);
    }
  }, [navigate]);
  
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (username === MOCK_USER && password === MOCK_PASSWORD) {
        const mockToken = 'mock-auth-token-12345';
        sessionStorage.setItem('authToken', mockToken);

        const loginSuccessEvent = new CustomEvent('loginSuccess', {
          detail: { token: mockToken, user: username }
        });
        window.dispatchEvent(loginSuccessEvent);

        navigate('/home');
      } else {
        const loginFailureEvent = new CustomEvent('loginFailure', {
          detail: { message: 'Credenciales inválidas. Por favor, intente de nuevo.' }
        });
        window.dispatchEvent(loginFailureEvent);
      }
    } catch (error) {
      const loginFailureEvent = new CustomEvent('loginFailure', {
        detail: { message: 'Ocurrió un error inesperado. Intente de nuevo más tarde.' }
      });
      window.dispatchEvent(loginFailureEvent);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login App Hibrido</h2>
        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="username">User Name</label>
          <input
            type="username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Starting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;