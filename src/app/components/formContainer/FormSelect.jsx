import React from 'react';

export default function FormSelect(props) {
  return (
    <select name={props.name}>
      <option>Please Choose a {props.property} Level</option>
      <option value={`High ${props.property}`}>High</option>
      <option value={`Medium ${props.property}`}>Medium</option>
      <option value={`Low ${props.property}`}>Low</option>
    </select>
  )
}