const model = require('../model.js');

const roomController = {};
roomController.addRoom = async (req, res, next) => {
  // get the info from the query
  const { username, room_name, temperature, humidity, lighting } =
    req.body;
  // check for missing data
  if (
    (!username || !room_name || temperature === undefined,
    humidity === undefined,
    lighting === undefined)
  ) {
    return next({
      log: 'roomController.addRoom',
      message: { err: 'Missing input field' },
    });
  }
  // check if username exists
  // check if room_name exists
  try {
    const user = await model.User.findOne({ username });
    if (!user) {
      throw new Error('User not found.');
    }
    const room = user.rooms.find(rooms => rooms.room_name === room_name);
    if (room) {
      throw new Error('Room exists.');
    } else {
      const newRoom = {
        room_name,
        temperature,
        humidity,
        lighting,
        plants: [],
      };
      const result = await model.User.updateOne(
        { username },
        { $push: { rooms: newRoom } }
      );
      if (!result) {
        throw new Error('Error updating database for the new room.');
      }
      return next();
    }
  } catch (err) {
    return next({
      log: 'roomController.addRoom',
      message: { err: 'Error creating a new room ' + `${err}` },
    });
  }
};

module.exports = roomController;
