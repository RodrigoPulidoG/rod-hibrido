import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';

import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root-mf-login')!);
root.render(
  <React.StrictMode>
    <div className='appContainer'>
      <Login />
    </div>
  </React.StrictMode>
);
