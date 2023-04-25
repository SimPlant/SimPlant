import React from 'react';
import './roomMenuStyle.scss';

export default function RoomMenu(props) {
  return (
    <nav id="roomMenu">
      <select name="rooms">
        <option value="Living Room">Living Room</option>
      </select>
    </nav>
  );
}
