import React, { useRef } from 'react';
import './SignupStyle.scss';

export default function Signup(props) {
  const username = useRef();
  const password = useRef();

  const userCreate = async credentials => {
    console.log('username: ', username.current.value);
    console.log('password: ', password.current.value);
    // fetch call to create user
    // const data = await fetch('http://localhost:3000/users', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    // return data;
  }
  
  const handleClickSignup = async () => {
    const result = await userCreate({
        username,
        password
    });
    // if user creation is successful, set loggedIn to true
    // props.setLoggedIn(true);
  }

  return (
    <div className="signup">
      <input ref={username} id="usernameS" placeholder="Username"></input>
      <input ref={password} id="passwordS" placeholder="Password"></input>
      <button onClick={handleClickSignup}>Sign Up</button>
    </div>
  )
}