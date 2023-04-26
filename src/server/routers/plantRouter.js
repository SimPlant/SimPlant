const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController')

// //get all plants
// router.get('/', plant) 

//get plant by user
router.get('/user/:id', plantController.getAllPlantsByUser, (req,res)=>{ 
  res.status(200).json(res.locals.dbPlants)
});

//get all plants in room
router.get('/room/:id', plantController.getAllPlantsByRoom, (req,res)=>{ 
  res.status(200).json(res.locals.dbPlants)
});


//get plant with id
router.get('/:id', plantController.getPlantById, (req,res)=>{ 
  res.status(200).json(res.locals.dbPlant)
});

//localhost:3000/api/plants/ ->  post plant
router.post('/', plantController.findInformation, plantController.addPlant, (req,res)=>{
  res.status(200).json(res.locals.dbPlant)
});

router.delete((req,res)=>{

});
router.put((req,res)=>{

});



module.exports = router