import React from 'react';
 import './plantStyle.scss'

const Plant = (props) => {
  const { species, 
          watering_frequency_per_week, 
          humidity, 
          light 
        } = props.plant;
  return(
    <div id="plant" className='plants'>
      <p>Species: {species}</p>
      <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
      <p>Water {watering_frequency_per_week}x per week</p>
      <p>Humidity: {humidity}%</p>
      <p>Light: {light}/10</p>
    </div>
  );
}

export default Plant;