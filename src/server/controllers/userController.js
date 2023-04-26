const bcrypt = require('bcrypt');
const pool = require('../database.js');
const userController = {};


function errorCreator (funcName, error){
  console.log(error.message);
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  }
}

userController.getUser = async (req,res,next) => {
  try {
    const { id } = req.params
    const query = 'SELECT * FROM public.user WHERE _id = $1;';
    const result = await pool.query(query, [id]);
    res.locals.user = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('getUser', error));
  }
}

userController.getAllUsers = async (req,res,next) => {
  try {
    const query = 'SELECT * FROM public.user;';
    const result = await pool.query(query);
    res.locals.users =  result.rows;
    return next();
  } catch (error) {
    return next(errorCreator('getUser', error));
  }
}

userController.addUser = async (req,res,next) => {
  try {
    const { username, password } = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    //to compare a retrieved hash to a password
    //const isMatch = await bcrypt.compare(password, data.rows[0].password);
    const query = `INSERT INTO public.user (username, password)
                  VALUES ($1, $2)
                  RETURNING *;`;
    const result = await pool.query(query, [username, passwordHash]);
    res.locals.user = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('addUser', error));
  }
}

// userController.deleteUser = async (req, res, next) => {
//     try {

//     } catch (error){
//         return localErrorHandler('deleteUser', error);
//     }
// }

userController.updateUser = async (req, res, next) => {
    const _id = req.params;
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    try {
      const query = `UPDATE public.user
                    SET username = $1, password = $2
                    WHERE _id = $3
                    RETURNING *;`
      const result = await pool.query(query, [username, passwordHash, _id]);
      res.locals.user = result.rows[0]
      return next()
    } catch (error) {
      return next(errorCreator('updateUser', error));
    }   
}

userController.deleteUser = async (req,res,next) => {
  try {
    const { id } = req.params
    const query = `DELETE FROM public.user
                  WHERE _id = $1
                  RETURNING *;`
    const result = await pool.query(query, [id]);
    res.locals.user = result.rows[0];
    return next();
  } catch (error) {
    return next(errorCreator('deleteUser', error));
  }
}
module.exports = userController;