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
        <div className="schedule">
          <div>
            <label for="">Mon</label>
            <input type="checkbox" name="Mon" value="Mon"></input>
          </div>
          <div>
            <label for="">Tue</label>
            <input type="checkbox" name="Tue" value="Tue"></input>
          </div>
          <div>
            <label for="">Wed</label>
            <input type="checkbox" name="Wed" value="Wed"></input>
          </div>
          <div>
            <label for="">Thur</label>
            <input type="checkbox" name="Thur" value="Thur"></input>
          </div>
          <div>
            <label for="">Fri</label>
            <input type="checkbox" name="Fri" value="Fri"></input>
          </div>
          <div>
            <label for="">Sat</label>
            <input type="checkbox" name="Sat" value="Sat"></input>
          </div>
          <div>
            <label for="">Sun</label>
            <input type="checkbox" name="Sun" value="Sun"></input>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
