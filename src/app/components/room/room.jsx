import React from 'react';
import './roomStyle.scss';
import Plant from '../plants/plant.jsx';

const plant = {
  species: 'Monstera deliciosa',
  watering_frequency_per_week: 1,
  humidity: 70,
  light: 5,
};

export default function Room() {
  return (
    <div id="room">
      <Plant plant={plant} />
      <Plant plant={plant} />
      <Plant plant={plant} />
      <Plant plant={plant} />
      <Plant plant={plant} />
      <Plant plant={plant} />
    </div>
  );
}
