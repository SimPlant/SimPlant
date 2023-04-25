import React from 'react';
import './mainPageStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';

//main container page acts as parent component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms
//render room component
//render form container componenet

function MainPage() {
  return (
    <div className="page">
      <RoomMenu />
      <LowerContainer />
    </div>
  );
}

export default MainPage;
