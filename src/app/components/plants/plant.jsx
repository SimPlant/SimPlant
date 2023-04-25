import React from 'react';
import './plantStyle.scss'

const Plant = (props) => {
  const { species, 
          watering_frequency_per_week, 
          humidity, 
          light 
        } = props.plant;
  return(
    <div className='plant'>
      <p className="species">Species: {props.species}</p>
      <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
      <p>Water {props.watering_frequency_per_week}x per week</p>
      <p>Humidity: {props.humidity}%</p>
      <p>Light: {props.light}/10</p>
    </div>
  );
}

export default Plant;