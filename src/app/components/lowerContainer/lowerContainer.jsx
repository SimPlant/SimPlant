import React from 'react';
import './lowerContainerStyle.scss';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/room.jsx';

//render room component
//render form container componenet - keeps track of current room

export default function LowerContainer(props) {
  console.log(props);
  return (
    <div className="lowerContainer">
      <FormContainer currentRoom={props.currentRoom} />
      <Room currentPlants={props.currentPlants} />
    </div>
  );
}
