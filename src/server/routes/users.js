const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const roomController = require('../controllers/roomController.js');
const plantController = require('../controllers/plantController.js');
// root endpoint is 'http://localhost:3000/users'

// get all data about a user
router.get('/:name', userController.getData, (req, res) => {
  res.status(200).json(res.locals.userData);
});

router.post('/createUser', userController.createUser, (req, res) => {
  return res.status(201).send(`New user created!`);
});

//add room
router.post('/room/', roomController.addRoom, (req, res) => {
  res.status(200).send('room added');
});

// add plant
router.post('/plant', plantController.addPlant, (req, res) => {
  res.status(201).send('New plant added!');
});

// get all data about all users
router.get('/', userController.getAll, (req, res) => {
  res.status(200).json(res.locals.users);
});

module.exports = router;
