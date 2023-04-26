import React from 'react';
import './lowerContainerStyle.scss';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/roomContainer.jsx';

//render room component
//render form container componenet

export default function LowerContainer() {
  return (
    <div className="lowerContainer">
      <FormContainer />
      <Room />
    </div>
  );
}
