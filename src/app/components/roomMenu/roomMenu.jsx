import React from 'react';
import './roomMenuStyle.scss';

export default function RoomMenu(props) {
  // add props to component
  let roomOptions = props.rooms.map((room) => {
    return (
      <option value={room?.name} key={room?._id}>
        {room?.name}
      </option>
    );
  });

  if (!roomOptions.length) {
    roomOptions = <option value="empty">Add a room first!</option>;
  }

  return (
    <nav id="roomMenu">
      <select name="rooms" onChange={(e)=>{props.changeCurrentRoom(e.target.value)}}>{roomOptions}</select>
    </nav>
  );
}
