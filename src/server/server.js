const path = require('path');
const express = require('express');
const app = express();
const userController = require('./userController.js');
const roomController = require('./roomController.js');
const plantController = require('./plantController.js');

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded());
// app.use(cookieParser());

//start server-serve index.html
app.get('/', (req, res) => {
  res.send('hello world');
});

// at login, verifty user,
// app.get('/login', userController.verifyUser, (req,res)=>{
//   res.redirect('http://localhost:8080/simPlant')
// })

// creat a new user
// app.get('/')

// get all data about all users

// get all data about a user
app.get('/users/:name', userController.getData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

app.get('/users', userController.getAll, (req, res) => {
  res.status(200).json(res.locals.users);
});
// create a new room
// app.patch('/room', roomController.addRoom, (req, res) => {
//   res.status(200).send()
// })

// create a new plant
// app.patch('/plant', plantController.addPlant, (req,res)=>{
//   res.status(200).send()
// })
// move a plant from one room to another

// route for API handling
// app.use('/api', apiController);

//local error handler
app.use((req, res) => {
  res.status(404).send('error: 404');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('ERROR: ', errorObj.log);
  const errorStatus = err.status || 500;
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
