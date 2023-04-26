import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import '/src/app/application.scss';

let div = document.createElement('div');
document.querySelector('body').appendChild(div);
div.setAttribute('id', 'root');
const root = createRoot(div);

root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="1041871188658-v88vuae2b2d9ijt7see44igk1tg0lptj.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>
);
// Client ID:
// 1041871188658-v88vuae2b2d9ijt7see44igk1tg0lptj.apps.googleusercontent.com
// Client secret:
// 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