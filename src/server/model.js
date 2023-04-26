const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'SimPlant',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  species: { type: String },
  lighting: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
  monday: { type: Boolean },
  tuesday: { type: Boolean },
  wednesday: { type: Boolean },
  thursday: { type: Boolean },
  friday: { type: Boolean },
  saturday: { type: Boolean },
  sunday: { type: Boolean },
});
// const Plant = mongoose.model('plant', plantSchema);

const roomSchema = new Schema({
  room_name: { type: String },
  lighting: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
  plants: [plantSchema],
});

// const Room = mongoose.model('room', roomSchema)

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  room: [roomSchema],
});

const User = mongoose.model('user', userSchema);
// set a schema
module.exports = { User };
