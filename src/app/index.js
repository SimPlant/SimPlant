import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '/src/app/application.scss';
// index path = src/app/index.js


let div = document.createElement('div');
document.querySelector('body').appendChild(div);
const root = createRoot(div);

root.render(<App />);
