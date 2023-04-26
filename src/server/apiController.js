const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

//this method adds dotenv variables to our process
dotenv.config();
const TOKEN = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const apiController = {
    //fetches the plant family from plant api
    getPlantFamily: async (req, res, next) => {
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
        const plantInfo = [];
    
        const plantId = res.locals.plantId;
        console.log('received array from getPlantFamily: ', plantId);
        // const promises = plantId.map( async (plantName) => {
        plantId.map( async (plantName) => {
        try { 
            const data = await fetch(`https://open.plantbook.io/api/v1/plant/detail/${plantName}/`, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${TOKEN}` }
              })
            const newData = await data.json()
            plantInfo.push(newData);
            console.log("inside: ", plantInfo)
            }
        catch {
            const message = 'error encountered in apiController.getPlantDetails: ' + err;
            return next(message);
          }
        try {
            console.log('plantId from second try block: ', plantInfo);
            res.locals.plantDetails = plantInfo;
            return next();
        }
        catch {
          const message = 'error encountered in apiController.getPlantDetails: ' + err;
          return next(message);
        }
      });

        // console.log("promises", await promises);
        // try{
        //   res.locals.plantDetails = await Promise.all(promises);
        //   console.log('outside:', await res.locals.plantDetails);
        //   // console.log('plantDetails', await res.locals.plantDetails)
        //   await next();
        // }
        // catch(err){
        //   const message = 'error encountered in apiController.getPlantDetails: ' + err;
        //   return next(message);
        //}
      },
    
      //add plant and its details to db
      addPlantToDB: async (req, res, next) => {
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
          } catch (error) {
            const message = 'error encountered in apiController.addPlantToDB: ' + err;
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
