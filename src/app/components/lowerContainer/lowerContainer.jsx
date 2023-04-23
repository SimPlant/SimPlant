import React from 'react';
import './lowerContainerStyle.scss';

export default function LowerContainer() {
  return (
    <div className="lowerContainer">
      <div
        style={{ height: '100px', width: '100px', border: 'black 1px solid' }}
        className="room"
      ></div>
      <div
        className="formContainer"
        style={{ height: '100px', width: '100px', border: 'black 1px solid' }}
      ></div>
    </div>
  );
}
