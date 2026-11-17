import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '@fontsource-variable/archivo/wght.css';
import '@fontsource-variable/inter/wght.css';
import '@fontsource-variable/noto-sans-sinhala/wght.css';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource/orbitron/latin-900.css';
import './styles/index.css';
import { initSmoothScroll } from './lib/smoothScroll';

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
initSmoothScroll();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
