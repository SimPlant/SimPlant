import React from 'react';
import './formContainerStyle.scss';

export default function FormContainer() {
  return (
    <div className="formContainer">
      <form className="inputForm">
        <div>FORM</div>
        <input type="text" placeholder="some info"></input>
        <input type="text" placeholder="some info"></input>
        <input type="text" placeholder="some info"></input>
        <input type="text" placeholder="some info"></input>
        <input type="text" placeholder="some info"></input>
      </form>
    </div>
  );
}
