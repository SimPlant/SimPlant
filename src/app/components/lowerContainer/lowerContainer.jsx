import React from 'react';
import './lowerContainerStyle.scss';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/roomContainer.jsx';
export default function LowerContainer(props) {
  return (
    <div className="lowerContainer">
      <FormContainer />
      <Room />
    </div>
  );
}
