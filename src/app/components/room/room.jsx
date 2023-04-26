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
  const plants = props.currentPlants.map((plant) => {
    return <Plant plant={plant} key={plant?._id} />;
  });

  return (
    <div id="room">
      {props.currentPlants.length !== 0 && plants}
    </div>
    );
}
