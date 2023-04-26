import React, { useState, useEffect } from 'react';
import './mainPageStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';
// ADD import getAllPlants and getAllRooms from API !!!!!!!!!!!!!!!!!!!

//main container page acts as parent component - stateful component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms - pass props through lower container

// state:
// rooms
// current room
// plants
// current plants

function MainPage() {
  function getAllRooms() {
    return new Promise((resolve) => {
      resolve([]);

      // resolve([{ name: 'Living Room' }, { name: 'Kitchen' }]);
    });
  }

  // hard code userID
  const userID = 1;
  // will need to make async
  const [rooms, setRooms] = useState([null]);
  const [currentRoom, setCurrentRoom] = useState(rooms[0]);
  // const [plants, setPlants] = useState(getAllPlants(userID).then((r) => r));
  // only show plants in current room
  // const [currentPlants, setCurrentPlants] = useState(
  //   plants.filter((plant) => plant.room_id === currentRoom._id)
  // );

  // useEffect
  useEffect(() => {
    async function unwrapRooms() {
      setRooms(await getAllRooms(userID));
    }
    unwrapRooms();
  }, []);

  return (
    <div className="page">
      <RoomMenu rooms={rooms} />
      <LowerContainer currentRoom={currentRoom} currentPlants={''} />
    </div>
  );
}

export default MainPage;
