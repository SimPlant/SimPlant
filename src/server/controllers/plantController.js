const model = require('../model.js');

// const ObjectId = require('mongodb').ObjectId;

const plantController = {};
plantController.addPlant = async (req, res, next) => {
  const {
    username,
    room_name,
    species,
    lighting,
    temperature,
    humidity,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;
  // check for missing data
  if (
    !username ||
    !room_name ||
    !species ||
    !lighting ||
    !temperature ||
    !humidity ||
    monday === undefined ||
    tuesday === undefined ||
    wednesday === undefined ||
    thursday === undefined ||
    friday === undefined ||
    saturday === undefined ||
    sunday === undefined
  ) {
    return next({
      log: 'plantController.addPlant',
      message: { err: 'Missing input field' },
    });
  }

  // check if username exists
  // check if room_name exists
  // check if this plant already exists in this room
  try {
    const user = await model.User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }
    const room = user.rooms.find(rooms => rooms.room_name === room_name);
    if (!room) {
      throw new Error('Room not found.');
    }
    const plantExists = room.plants.some(
      plant => plant.species === species
    );
    if (plantExists) {
      throw new Error('The plant exists in the room.');
    } else {
      const newPlant = {
        species: species,
        lighting: lighting,
        temperature: temperature,
        humidity: humidity,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday,
        sunday: sunday,
      };
      const result = await model.User.updateOne(
        { username, 'rooms.room_name': room_name },
        { $push: { 'rooms.$.plants': newPlant } }
      );
      if (!result) {
        throw new Error('Error updating database for the new plant.');
      }
      return next();
    }
  } catch (err) {
    return next({
      log: 'plantController.addPlant',
      message: { err: 'Error creating a new plant ' + `${err}` },
    });
  }
};

module.exports = plantController;
