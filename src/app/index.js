import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '/src/app/application.scss';

let div = document.createElement('div');
document.querySelector('body').appendChild(div);
div.setAttribute('id', 'root');
const root = createRoot(div);

root.render(<App />);
