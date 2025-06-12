import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot from 'react-dom/client' for React 18
import App from './App.js'; // This line expects App.js to be in the same folder (src/)

// Get the root DOM element where your React app will be mounted
const rootElement = document.getElementById('root');

// Create a root for rendering your React application (React 18 way)
const root = ReactDOM.createRoot(rootElement);

// Render the App component into the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
