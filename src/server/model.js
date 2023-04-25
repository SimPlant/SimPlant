const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://carolynzrx:123@cluster0.edqa7gu.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
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
  lighting: { type: Number, required: true, unique: true },
  temperature: { type: Number, required: true, unique: true },
  humidity: { type: Number, required: true, unique: true },
  monday: { type: Boolean, required: true, unique: true },
  tuesday: { type: Boolean, required: true, unique: true },
  wednesday: { type: Boolean, required: true, unique: true },
  thursday: { type: Boolean, required: true, unique: true },
  friday: { type: Boolean, required: true, unique: true },
  saturday: { type: Boolean, required: true, unique: true },
  sunday: { type: Boolean, required: true, unique: true },
});
// const Plant = mongoose.model('plant', plantSchema);

const roomSchema = new Schema({
  room_name: [plantSchema],
});

// const Room = mongoose.model('room', roomSchema)

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  room: [roomSchema],
});

const User = mongoose.model('user', userSchema);
// set a schema
module.exports = User;
