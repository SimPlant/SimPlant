import React, { useState, useEffect } from 'react';
import Header from './components/header/header.jsx';
import MainPage from './components/mainPage/mainPage.jsx';
import Login from './pages/Login.js';
import './application.scss';

function App() {
  const [loggedIn, setLoggedIn] = useState();

  // if user is not logged in, load Login component to require login
  // if (!loggedIn) {
  //   return (
  //     <>
  //       <Header />
  //       <Login setLoggedIn={setLoggedIn} />
  //     </>
  //   )
  // }

  // if user is logged in, display homepage
  return (
    <div id="app">
      <Header />

      <MainPage />
    </div>
  );
}

export default App;
