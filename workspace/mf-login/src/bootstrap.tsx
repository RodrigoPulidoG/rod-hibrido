import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/Login';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

export function mount(containerIdOrElement: string | HTMLElement) {
  const containerElement = typeof containerIdOrElement === 'string'
    ? document.getElementById(containerIdOrElement)
    : containerIdOrElement;

  if (!containerElement) {
    console.error('No se encontró el elemento contenedor para el montaje del MF-Login de React.');
    return;
  }

  const root = ReactDOM.createRoot(containerElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <div className="appContainer">
          <Login />
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Soporte local standalone:
const container = document.getElementById('root-mf-login');
if (container) {
  mount('root-mf-login');
}