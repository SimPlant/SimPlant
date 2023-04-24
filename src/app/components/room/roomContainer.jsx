import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

const plant = {
  species: 'Monstera deliciosa',
  watering_frequency_per_week: 1, 
  humidity: 70, 
  light: 5
}

export default function Room() {
  
  return (
    <div id="roomContainer">
      <Plant plant={plant}/>
    </div>
  );
}
