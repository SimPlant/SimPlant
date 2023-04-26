import React, { useRef } from 'react';
import './formContainerStyle.scss';


export default function FormContainer(props) {
  const { queryPlantFamily, updateSearchPlant } = props;
  const typedPlantFamily = useRef(null);
  // console.log(`queryPlantFamily(was the prop drilled?): ${queryPlantFamily}`)
  return (
    <div className="formContainer">
      {/* <form className="roomForm">
        <div className="formTitle">ADD ROOM</div>
        <input
          className="inputField"
          type="text"
          placeholder="Room Name"
        ></input>
        <select name="roomLighting">
          <option>Please Choose a Lighting Level</option>
          <option value="High Light">High</option>
          <option value="Medium Light">Medium</option>
          <option value="Low Light">Low</option>
        </select>
        <select name="roomTemp">
          <option>Please Choose a Temperature Level</option>
          <option value="High Temp">High</option>
          <option value="Medium Temp">Medium</option>
          <option value="Low Temp">Low</option>
        </select>
        <select name="roomHumidity">
          <option>Please Choose a Humidity Level</option>
          <option value="High Humidity">High</option>
          <option value="Medium Humidity">Medium</option>
          <option value="Low Humidity">Low</option>
        </select>
        <button type="submit">Submit</button>
      </form> */}
      {/* <form className="plantForm" onSubmit={()=> console.log(); queryPlantFamily("cactus")}></div> */}
      {/* <form className="plantForm" > */}
        <div className="formTitle">ADD PLANT</div>
        <input
          // name="plantSpecies"
          type="text"
          placeholder="Plant Family"
          // ref={typedPlantFamily}
          // required onChange={ (e) => {updateSearchPlant(e.target.value)} }
        ></input>
        <button 
        // onClick={(event) => {
        //   event.preventDefault();
        //   console.log('clicked!')}
        // }
        onClick={()=> queryPlantFamily("cactus")} 
        // required onClick={(e)=> updateSearchPlant(e.target.value)}
        type="submit">Submit</button>
      {/* </form> */}
    </div>
  );
}
