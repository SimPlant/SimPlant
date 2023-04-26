const pool = require('../database.js');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process

const plantController = {};

function errorCreator (funcName, error){
  console.log(error.message);
  return {
    log: `Express error handler caught ${funcName} error with message ${error.message}`,
    status: 400,
    message: { err: error.message },
  }
}


plantController.addPlant = async (req,res,next) => {
  const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = res.locals.plant;
  try {
    const query = `INSERT INTO public.plants (species, watering_frequency_per_week, humidity, light, user_id, room_id)
                  VALUES ($1, $2, $3, $4, $5, $6)
                  RETURNING *;`
    const result = await pool.query(query, [species, watering_frequency_per_week, humidity, light, user_id, room_id]);
    res.locals.dbPlant= result.rows[0];
    return next();             
  } catch (error) {
    return next(errorCreator('addPlant', error));
  }
}

plantController.findInformation = async(req, res, next) => {
  dotenv.config();
  const PERENUAL_KEY = process.env.PERENUAL_KEY;
  const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = req.body
  try {
    const result = await fetch(`https://perenual.com/api/species-list?key=${PERENUAL_KEY}&q=${species}`)
    console.log(result);
  } catch (err){
    console.log('perenual error')
  }
  //fetch from api // const plant = await fetch(url)
  // let { watering_frequency_per_week, humidity, light } = plant;
  // const {species, user_id, room_id} = req.body;
 
  //store everything in res.locals.plant
  res.locals.plant = { species, watering_frequency_per_week, humidity, light, user_id, room_id };
  return next();
}

plantController.getPlantById = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const query = `SELECT * FROM public.plants
                  WHERE _id = $1;`
    const result = await pool.query(query, [id]);
    res.locals.dbPlant = result.rows[0];
    return next();   
  } catch (error) {
    return next(errorCreator('getPlant', error));
  }
}

plantController.getAllPlantsByUser = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const query = `SELECT * FROM public.plants
    WHERE user_id = $1;`;
    const result = await pool.query(query, [id]);
    res.locals.dbPlants= result.rows;
    return next();   
  } catch (error) {
    return next(errorCreator('getAllPlantsByUser', error));
  }
};

plantController.getAllPlantsByRoom = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const query = `SELECT * FROM public.plants
                  WHERE room_id = $1;`;
    const result = await pool.query(query, [id]);
    res.locals.dbPlants = result.rows;
    return next();   
  } catch (error) {
    return next(errorCreator('getAllPlantsByRoom', error));
  }
};

plantController.deletePlantById = async (req,res,next) => {
  try {
    const{ id } = req.params;
    const query = `DELETE FROM public.plants
                  WHERE _id = $1
                  RETURNING *;`;
    const result = await pool.query(query, [id]);
    res.locals.dbPlant = result;
    return next();
  } catch (error) {
    return next(errorCreator('deletePlant', error));
  }
}



module.exports = plantController;