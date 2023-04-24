import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header/header.jsx';
import MainPage from './components/mainPage/mainPage.jsx';
import './application.scss';

function App() {
  return (
    <div id="app">
      <Header />

      <MainPage />
    </div>
  );
}

export default App;
