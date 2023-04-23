import React from 'react';
import './roomMenuStyle.scss';

export default function RoomMenu(props) {
  return (
    <nav id="roomMenu">
      <input list="rooms" name="roomMenu" />

      <datalist id="rooms">
        <option value="Living Room" />
      </datalist>
    </nav>
  );
}
