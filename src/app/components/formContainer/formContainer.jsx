import React from 'react';
import './formContainerStyle.scss';

export default function FormContainer(props) {
  function onRoomSubmit (e) {
    //props.addRoom();
    e.preventDefault();
    let form = new FormData(e.target)
    form = Object.fromEntries(form.entries());
    //form looks like {name:'roomname', light:'3'...} '3' is a string
    //convert to {name:'roomname',light:3...} 3 is a number
    //use isNaN(arg);-> true or false
    for (const property in form) {
      if (!isNaN(Number(form[property]))) {
        form[property] = Number(form[property])
      }
    }
    props.addRoom(form);
    // console.log(Object.fromEntries(form.entries()));
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
        <select name="light">
          <option value={0}>Please Choose a Lighting Level</option>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </select>
        {/* <select name="temperature">
          <option value={0}>Please Choose a Temperature Level</option>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </select>
        <select name="humidity">
          <option value={0}>Please Choose a Humidity Level</option>
          <option value={3}>High</option>
          <option value={2}>Medium</option>
          <option value={1}>Low</option>
        </select> */}
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
