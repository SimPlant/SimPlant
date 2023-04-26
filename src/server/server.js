const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
//require routers
const usersRouter = require('./routes/users.js');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
// app.use(cookieParser());

app.use('/users', usersRouter);

// create a new user
// app.post('/user', userController.createUser, (req, res) => {
//   res.status(200).redirect('http/localhost:8000/app');
// });
// app.get('/')
app.get('/', (req, res) => {
  res.send('hello world');
});

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

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});

module.exports = app;
