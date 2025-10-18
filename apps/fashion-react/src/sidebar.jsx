import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

// Mount React app into the sidebar root
const rootDiv = document.getElementById('fashion-extension-root');
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}