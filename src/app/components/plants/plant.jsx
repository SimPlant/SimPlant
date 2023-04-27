import React, { useState } from 'react';
import './plantStyle.scss'

const Plant = (props) => {
  // state for modal functionality
  const [isDropdown, setIsDropdown] = useState(false);
 
let species;
let watering_frequency_per_week;
let humidity;
let light;

if (props?.plant){
  ({ species, 
    watering_frequency_per_week, 
    humidity, 
    light 
  } = props.plant);
}

  function openDropdown(e) {
    e.target.focus();
    if (isDropdown) {
      e.target.classList.toggle('plant-dropdown');
    }
    setIsDropdown(true);
  }

  function closeDropdown(e){
    if (!isDropdown) {
      e.target.classList.toggle('plant-dropdown');
    }
    setIsDropdown(false);
  }

  return(
    <div className='plant' onClick={openDropdown} tabIndex="-1" onBlur={closeDropdown}>
      <p className="species">Species: {species}</p>
      <img className= "plant-img" src="https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"></img>
      { isDropdown && 
        <>
          <p>Water {watering_frequency_per_week}x per week</p>
          <p>Light: {light}/10</p>
          <button>Delete</button>
        </>
      }
    </div>
  );
}

export default Plant;