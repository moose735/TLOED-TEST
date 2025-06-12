import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // This import expects a file named 'App.js' directly in the 'src' folder

// Find the root element in index.html
const rootElement = document.getElementById('root');

// Create a React root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
