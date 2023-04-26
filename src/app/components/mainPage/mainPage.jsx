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
      //      resolve([]);
      resolve([
        { _id: 1, name: 'Living Room' },
        { _id: 2, name: 'Kitchen' },
      ]);
    });
  }

  function getAllPlants() {
    return new Promise((resolve) => {
      //      resolve([]);
      resolve([
        { _id: 1, room_id: 1, species: "Big Ol' Cactus" },
        { _id: 2, room_id: 2, species: "Just a li'l guy" },
      ]);
    });
  }

  // hard code userID
  const userID = 1;
  // will need to make async
  const [rooms, setRooms] = useState([null]);
  const [currentRoom, setCurrentRoom] = useState();
  const [plants, setPlants] = useState([null]);
  // only show plants in current room
  const [currentPlants, setCurrentPlants] = useState();

  // useEffect for Rooms and Plants
  useEffect(() => {
    async function initialize() {
      setRooms(await getAllRooms(userID));
      setPlants(await getAllPlants(userID));
    }
    initialize();
  }, []);

  // any time rooms changes, this useEffect runs
  useEffect(() => {
    async function initialize() {
      setCurrentRoom(rooms[0]);
    }
    initialize();
  }, [rooms]);

  useEffect(() => console.log(currentPlants), [currentPlants]);

  // set current plants, dependent on plants
  useEffect(() => {
    async function initialize() {
      setCurrentPlants(
        plants.filter((plant) => plant?.room_id === currentRoom?._id)
      );
    }
    initialize();
  }, [plants, currentRoom]);

  return (
    <div className="page">
      <RoomMenu rooms={rooms} />
      <LowerContainer currentRoom={currentRoom} currentPlants={currentPlants} />
    </div>
  );
}

export default MainPage;
