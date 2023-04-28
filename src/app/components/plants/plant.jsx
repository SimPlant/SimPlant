import React from 'react';
import './plantStyle.scss'

const Plant = (props) => {
  // state for modal functionality
 
let common_name;
let days_between_watering;
let light;
let species;


if (props?.plant){
  ({ species, 
    common_name,
    days_between_watering, 
    light 
  } = props.plant);
}


  return(
      <>
        <p className="title">Name: {common_name}</p>
        <img className= "plant-img" src={props?.plant.image || "https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png"}></img>
        { props.isDropdown && 
          <>
            <p>Species: {species}</p>
            <p>Water {days_between_watering}x per week</p>
            <p>Light: {light}/10</p>
            <button onMouseDown={e => props.deletePlant(props.plant._id)} className="delete">Delete</button>
          </>
        }
      </>
  );
}

export default Plant;