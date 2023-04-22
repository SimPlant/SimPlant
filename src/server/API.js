const express = require('express');
const plantController = require('./plantController');
const { Pool } = require('pg');
const router = express.Router();
const process = require('process');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process
dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI
});

const db = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

//currently hardcoded for Jake's ID 
const userID = 1;

//create functions for user
//get user: 
/* gets user from db and returns user */
/* (userID: number) ->  user: object */
function getUser(userID) {
  // query db with userID
  const values = [userID];
  const query = 'SELECT * FROM public.user WHERE _id = $1;';
  db.query(query, values, (err, result)=>{
    if (err) {
      return localErrorHandler('getUser', err);
    }
    return result;
  });
}

console.log(getUser(1));

//add user: 
/* adds user to db and returns new user */
/* (username: string, password: string) -> user: object */

//change user
/* changes user information */
/* (username: string) -> username: updated string 

//delete user
/* deletes user from db and returns deleted user */
/* (username: string) -> user: object */

//create functions for room

//create functions plant

//create functions for day

/* local error handler */
/* (location: string, error: object) -> console.log */ 
function localErrorHandler(location, err) {
  return console.log({location: location, err: err});
}


module.exports = router;