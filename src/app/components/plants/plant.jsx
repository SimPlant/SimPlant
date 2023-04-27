import React from 'react';
import './plantStyle.scss'

const Plant = (props) => {
  // state for modal functionality
 
let common_name;
let days_between_watering;
let light;
let species;
let image;

props?.plant?.image
  ? image = props.plant.image
  : image = "https://em-content.zobj.net/thumbs/160/apple/271/potted-plant_1fab4.png";


if (props?.plant){
  ({ species, 
    common_name,
    days_between_watering, 
    light 
  } = props.plant);
}

  function handleDeletePlant (e){
    const plantID = Number(e.target.parentNode.getAttribute('value'));
    props.deletePlant(plantID);
  }

  return(
      <>
        <p className="title">Name: {common_name}</p>
        <img className= "plant-img" src={image}></img>
        { props.isDropdown && 
          <>
            <p>Species: {species}</p>
            <p>Water every {days_between_watering} days</p>
            <p>Light: {light}/10</p>
          </>
        }
        <button onClick={handleDeletePlant}>Delete</button>
      </>
  );
}

export default Plant;
