import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import './LoginStyle.scss';

export default function Login(props) {
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();

  // const handleClick = async e => {
  //   const token = await loginUser({
  //       username,
  //       password
  //   });
  //   props.setLoggedIn(token);
  // }

  return (
    <div className='loginPage'>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse.credential);
          const decoded = jwt_decode(credentialResponse.credential);
          console.log(decoded);
          props.setLoggedIn(true);
          // fetch call to server to store decoded.sub (google user's internal id) in cookie or database to preserve session
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
      {/* database user */}
      {/* <input id='usernameInput' placeholder='Username' onChange={e => setUsername(e.target.value)}></input>
      <input placeholder='Password' onChange={e => setPassword(e.target.value)} ></input>
      <div>
          <button onClick={handleClick}>Login</button>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link> 
      </div> */}
    </div>
  )
}