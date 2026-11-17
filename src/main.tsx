import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Start entrance animations once the web fonts are in (or after a short grace
// period), so headlines never swap typeface mid-animation.
const markReady = () => document.documentElement.classList.add('is-ready');
Promise.race([
  document.fonts?.ready ?? Promise.resolve(),
  new Promise((resolve) => setTimeout(resolve, 1500)),
]).then(markReady, markReady);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
