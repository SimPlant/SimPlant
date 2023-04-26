import React from 'react';
import './formContainerStyle.scss';

export default function FormContainer(props) {
  function onRoomSubmit (e){
    //props.addRoom();
    e.preventDefault();
    const form = new FormData(e.target)
    props.addRoom(Object.fromEntries(form.entries()));
  }

const onPlantSubmit = (e) => {
  e.preventDefault();
  let form = new FormData(e.target);
  form = Object.fromEntries(form.entries());
  console.log("plant form: ", form)
}

  return (
    <div className="formContainer">
      <form className="roomForm" onSubmit={onRoomSubmit}>
        <div className="formTitle">ADD ROOM</div>
        <input
          name="name"
          className="inputField"
          type="text"
          placeholder="Room Name"
        ></input>
        <select name="lighting">
          <option>Please Choose a Lighting Level</option>
          <option value="High Light">High</option>
          <option value="Medium Light">Medium</option>
          <option value="Low Light">Low</option>
        </select>
        <select name="temperature">
          <option>Please Choose a Temperature Level</option>
          <option value="High Temp">High</option>
          <option value="Medium Temp">Medium</option>
          <option value="Low Temp">Low</option>
        </select>
        <select name="humidity">
          <option>Please Choose a Humidity Level</option>
          <option value="High Humidity">High</option>
          <option value="Medium Humidity">Medium</option>
          <option value="Low Humidity">Low</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <form className="plantForm" onSubmit={onPlantSubmit}>
        <div className="formTitle">ADD PLANT</div>
        <input
          name="plantSpecies"
          type="text"
          placeholder="Plant Species"
        ></input>
        <input
          name="plantLighting"
          type="text"
          placeholder="Lighting Needs"
        ></input>
        <input
          name="plantWatering"
          type="text"
          placeholder="Watering Needs"
        ></input>
        <input
          name="plantHumidity"
          type="text"
          placeholder="Humidity Needs"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
