import React from 'react';
import './roomStyle.scss';
import Plant from '../plants/plant.jsx';

// const plant = {
//   species: 'Monstera deliciosa',
//   watering_frequency_per_week: 1,
//   humidity: 70,
//   light: 5,
// };

export default function Room(props) {
  const plants = props.currentPlants.map((plant) => {
    return <Plant plant={plant} key={plant?._id} />;
  });

  function onSettingChange(e){
    const lightVal = Number(e.target.value);
    props.updateRoom(lightVal);
  }

  return (
    <>
      <div id="room">
        {props.currentPlants.length !== 0 && plants}
      </div>
      
      <div id="room-settings">
        <form onChange={onSettingChange}>
          <h4>Light Levels</h4>
          <select value={props.currentRoom ? props.currentRoom.light : 0} name="light">
              <option value={3}>High</option>
              <option value={2}>Medium</option>
              <option value={1}>Low</option>
            </select>
        </form>
      </div>
    </>
    );
}
