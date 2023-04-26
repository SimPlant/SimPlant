const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const User = require('../model.js');

const ObjectId = require('mongodb').ObjectId;

const plantController = {};
plantController.addPlant = (req, res, next) => {
  const id = req.params.id;
  User.findAndUpdateOne({ _id: id });
};

module.exports = plantController;
