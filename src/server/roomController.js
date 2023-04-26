const roomController = {};
const models = require('./model.js');

roomController.addRoom = (req, res, next) => {
  // get the info from the query
  const user_id = req.query.id;
  const { room_name, temperature, humidity, lighting } = req.body;
  const newRoom = { room_name, temperature, humidity, lighting };
  models.User.findOneAndUpdate(
    { _id: user_id },
    { room: room.append(newRoom) }
  );
};

module.exports = roomController;
