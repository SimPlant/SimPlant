const model = require('./model.js');
const ObjectId = require('mongodb').ObjectId;

const userController = {};
//authentication/creating user
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('user', req.body);
  if (!username || !password) {
    return next({
      log: 'userController.createUser',
      message: { err: 'No username or password entered' },
    });
  }
  // check if username is unique
  User.find({ username })
    .exec()
    .then(user => {
      if (user.length) {
        return next({
          log: 'userController.createUser',
          message: {
            err: 'User already exists, enter a different username',
          },
        });
      }
      // if username is unique, add new user to db
      User.create({ username, password }).then(result => {
        // store userId in response sent back
        // res.locals.account = result; => result is the created user object/doc as json
        res.locals.userId = result._id;
        return next();
      });
    })
    .catch(err =>
      next({
        log: `userController.createUser: ${err}`,
        message: { err: 'Error creating user' },
      })
    );
};

// verification middleware to login
userController.verifyUser = (req, res, next) => {
  // const { username, password } = req.body;
  const id = req.params.id;
  User.find({ _id: new ObjectId(`${id}`) })
    .exec()
    .then(user => {
      if (user[0].password === password) {
        // pass down user id ('_id' in each user doc) back as userId
        console.log(user);
        res.locals.userId = user[0]._id;
        return next();
      }
    })
    .catch(err =>
      next({
        log: `userController.verifyUser: ${err}`,
        message: { err: 'Error verifying user' },
      })
    );
};

// get all data about a user
userController.getData = (req, res, next) => {
  const { username } = req.params;

  // const o_id = neObjectId(`${id}`);
  // console.log(o_id);
  User.findOne({ username, password })
    // model.User.findOne({ username: name })
    .exec()
    .then(response => {
      console.log('response:', response);
      return response.json();
    })
    .then(data => {
      console.log('entering here');
      res.locals.userData = data;
      return next();
    })
    .catch(err =>
      next({
        log: `userController.getData: ${err}`,
        message: { err: `Erros in getting user's data: ${err}` },
      })
    );
};

// get all users' data
userController.getAll = (req, res, next) => {
  model.User.find({})
    .exec()
    // .then(response => response.json())
    .then(data => {
      res.locals.users = data;
      return next();
    })
    .catch(err =>
      next({
        log: `userController.getData: ${err}`,
        message: { err: "Erros in getting user's data" },
      })
    );
};

module.exports = userController;
