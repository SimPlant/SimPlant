import React from 'react';
import './roomStyle.scss';
import Plant from '../plants/plant.jsx';

const plant = {
  species: 'Monstera deliciosa',
  watering_frequency_per_week: 1,
  humidity: 70,
  light: 5,
};

export default function Room(props) {
  console.log(props);
  // if (Array.isArray(props.currentPlants)) {
  //   const plants = props.currentPlants.map((plant) => {
  //     return <Plant plant={plant} key={plant._id} />;
  //   });
  // } else {
  //   const plants = null;
  // }
  const plants = '';

  return <div id="room">{plants}</div>;
}
