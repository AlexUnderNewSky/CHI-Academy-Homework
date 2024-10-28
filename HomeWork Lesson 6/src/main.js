import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App.js';
import '../styles/styles.css';

const domContainer = document.getElementById('root');
const root = createRoot(domContainer); 
root.render(<App />);
