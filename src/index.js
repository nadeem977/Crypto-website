import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { CryptoProvider } from './context/CryptoContext';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CryptoProvider>
      <App />
    </CryptoProvider>
  </React.StrictMode>
);
