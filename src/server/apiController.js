const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { Pool } = require('pg');
const process = require('process');

//this method adds dotenv variables to our process
dotenv.config();
const PG_URI = process.env.PG_URI;
const pool = new Pool({
  connectionString: PG_URI
});

const TOKEN = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;




const apiController = {

    //check if data already exists in database
    checkPid: async (req, res, next) => {
      
      try {
        const query = `SELECT * FROM public.plants
                      WHERE pid LIKE '%${req.params.family}%';`
        const result = await pool.query(query);
        //if our query to our database finds the desired plant
        if(result.rows.length > 0) {
          res.locals.duplicateFound = true;
          res.locals.plantDetails = result.rows; //pass it within res.locals
          return next();
        } else {
          console.log("move to next middleware bc new family");
          res.locals.duplicateFound = false;
          return next();
        }
      } 
      catch (error) {
        console.log('err: ', error);
        return next({'getPlant': error});
      }
    },

    //fetches the plant family from plant api
    getPlantFamily: (req, res, next) => {
      if(res.locals.duplicateFound === true) {
        return next();
      }
        const { family } = req.params;
        // console.log('req.params: ', req.params);
        const plantIdArr = [];
        // {headers: {Authentication: 'Bearer Token'}}
        fetch(`https://open.plantbook.io/api/v1/plant/search?alias=${family}&limit=20`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${TOKEN}` }
        })
          .then((body)=> body.json())
          .then((data) => {
              // console.log('data', data)
              data.results.forEach((obj => plantIdArr.push(obj.pid)));
              res.locals.plantId = plantIdArr;
              return next();
            })
          .catch((err) => {
            const message = 'error encountered in apiController.getPlantFamily: ' + err;
            return next({message});
          })
      },

      //middleware that takes plantID and gets backs all details
      getPlantDetails: async (req, res, next) => {
        if(res.locals.duplicateFound === true) {
          return next();
        }
        const plantInfo = [];
    
        const plantId = res.locals.plantId;

        for (let plantName of plantId) {
          await fetch(`https://open.plantbook.io/api/v1/plant/detail/${plantName}/`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${TOKEN}` }
          })
            .then(data => data.json())
            .then(result => {
              plantInfo.push(result)
            })
        }

        res.locals.plantDetails = plantInfo;
        return next()
      },
    
      //add plant and its details to db
      addPlantToDB: async (req, res, next) => {
        if(res.locals.duplicateFound === true) {
          console.log('duplicate found');
          return next();
        }
        //helper function to calculate watering_frequency_per_week
        function closestValue(num) {
          const diff20 = Math.abs(num - 20);
          const diff40 = Math.abs(num - 40);
          const diff60 = Math.abs(num - 60);
          return (diff20 < diff40 && diff20 < diff60) ? 1 :
                 (diff40 < diff20 && diff40 < diff60) ? 2 :
                 3;
        }
        res.locals.plantDetails.forEach( async (plant) => { 
          //calculate a watering freq property and add it 
          const { pid, max_light_lux, min_light_lux, max_temp, min_temp, max_env_humid, min_env_humid, max_soil_moist, min_soil_moist, image_url } = plant;
          const avg_soil_moisture = Math.floor((max_soil_moist + min_soil_moist)/2);
          const watering_frequency_per_week = closestValue(avg_soil_moisture);
        
          // const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = plant;
          try {
            const query = `INSERT INTO public.plants (pid, max_light_lux, min_light_lux, max_temp, min_temp, max_env_humid, min_env_humid, max_soil_moist, min_soil_moist, watering_frequency_per_week, image_url)
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                          RETURNING *;`
            const result = await pool.query(query, [pid, max_light_lux, min_light_lux, max_temp, min_temp, max_env_humid, min_env_humid, max_soil_moist, min_soil_moist, watering_frequency_per_week, image_url]);              
          } catch (err) {
            const message = 'error encountered in apiController.addPlantToDB: ' + err;
            console.log(message);
            return next(message);
          }
        });
        return next(); 
      },
};



// apiController.

// const apiController = function () {
//   console.log("It's apiController, here!");
// };

module.exports = apiController;
