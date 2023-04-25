import React, { useState } from 'react';
import './mainPageStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';
import apiWrapper from '../../../server/API.js'
//main container page acts as parent component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms
//render room component
//render form container componenet

function MainPage() {
  const userID = 2; // esther
  const currRoom = {};
  // get all rooms of user
  const rooms = apiWrapper.getAllRooms(userID);
  // get all plants of user
  const allPlants = apiWrapper.getAllPlantsByUser(userID);
  
  // get input from RoomMenu
  const [roomName, setRoomName] = useState("");
  // set roomName to room name selected by user 
  const handleRoomSelection = (e) => {
    setRoomName(e.target.value);
  }

  // get room that user selected
  rooms.forEach(room => {
    if (room.name === roomName) {
      currRoom = room;
      return;
    }
  });

  // array to hold all the plants in the current room
  const [plants, setPlants] = useState([]);
  const plantsInCurrRoom = [];

  // get all plants of the current room
  allPlants.forEach(plant => {
    if (plant.room_id === currRoom._id) {
      plantsInCurrRoom.push(plant);
    }
  });
  
  setPlants(plantsInCurrRoom);
  // plantsInCurrRoom 
  // mainPage -> LowerContainer -> Room
  // render plants from plantsInCurrRoom array in Room

  return (
    <div className="page">
      <RoomMenu onChange={handleRoomSelection}/>
      <LowerContainer />
    </div>
  );
}

export default MainPage;
