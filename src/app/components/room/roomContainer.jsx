import React from 'react';
import './roomContainerStyle.scss';
import Plant from '../plants/plant.jsx';

const plant = {
  species: 'Monstera deliciosa',
  watering_frequency_per_week: 1, 
  humidity: 70, 
  light: 5
}

export default function Room(props) {
  const plantsToRender = [];
  // loop thru plantsInCurrRoom array and render plants with props
  props.plants.forEach(plant => {
    plantsToRender.push(<Plant plant={plant}/>)
  })
  
  return (
    <div id="roomContainer">
      {plantsToRender}
    </div>
  );
}
