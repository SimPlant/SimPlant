import React from 'react';
import FormSelect from './FormSelect';
import './formContainerStyle.scss';

export default function FormContainer() {
  return (
    <div className="formContainer">
      <form className="roomForm">
        <div className="formTitle">ADD ROOM</div>
        <input
          className="inputField"
          type="text"
          placeholder="Room Name"
        ></input>
        <FormSelect name="roomLighting" property="Lighting"/>
        <FormSelect name="roomTemperature" property="Temperature"/>
        <FormSelect name="roomHumidity" property="Humidity"/>
        <button type="submit">Submit</button>
      </form>
      <form className="plantForm">
        <div className="formTitle">ADD PLANT</div>
        <input
          name="plantSpecies"
          type="text"
          placeholder="Plant Species"
        ></input>
        <FormSelect name="plantLighting" property="Lighting"/>
        <FormSelect name="plantTemperature" property="Temperature"/>
        <FormSelect name="plantHumidity" property="Humidity"/>
        <FormSelect name="plantWatering" property="Watering"/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
