const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const express = require('express');
const router = express.Router();
// const {apiWrapper} = require('../API');
const apiController = require('../apiController.js')

// console.log('apiWrapper: ', apiWrapper);

//  apiController.addPlantToDB, getPlantDetails,
// on client's call to /plantFamily > server calls plant API > store response to db

//apiController.checkPid, apiController.getPlantFamily, apiController.getPlantDetails, apiController.addPlantToDB, 
router.get('/plantFamily/:family', apiController.checkPid, apiController.getPlantFamily, apiController.getPlantDetails, apiController.addPlantToDB, (req, res) => {
    return res.status(200).send(res.locals.plantDetails);
});

//, apiController.getPlantDetails, apiController.addPlantToDB,

//what do we want to do with our database
//pass in keys into the body of a request
module.exports = router;