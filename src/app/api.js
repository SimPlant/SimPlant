import { request } from "../server/server";


const apiWrapper = {};


//define some functions

//add a user
apiWrapper.addUser = async (body) => {
  // { username, password } = req.body
  try {
    return await fetch('/api/user', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('user post request err')
  }
}
//get state for user
apiWrapper.getUserState = async (user_id) => {
  // return object has {username: string, state: {rooms: [roomObj], plants: [plantObj]}  }
  // roomObj example {"_id": 1,  "name": "Living Room",  "light": 5,  "humidity": 10,  "temperature": 10,  "user_id": 1}
  // plantObj example {"_id": 1, "species": "Aloe Vera", "watering_frequency_per_week": 1, "humidity": 10, "light": 10, "user_id": 1, "room_id": 1}
  // arrays may have null values
  try {
    return await fetch(`/api/user/${user_id}/state`)
  } catch (err){
    console.log('user get request err')
  }
}

//updateUser
apiWrapper.updateUser = async (body) => {
  // { user_id, username, password } = body
  try {
    return await fetch(`/api/user/${body.user_id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('user put request err')
  }
}

//addPlant
apiWrapper.addPlant = async (body) => {
  // const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = req.body
  try {
    return await fetch('api/plant', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('plant post request err')
  }
}

//deletePlant
apiWrapper.deletePlant = async (plantID) => {
  try {
    return await fetch(`api/plant/${plantID}`, {
    method: "DELETE"})
 
  } catch (err){
    console.log('plant delete request err')
  }
}


//addRoom
apiWrapper.addRoom = async (body) => {
  //const { name, light, humidity, temperature, user_id } = req.body;
  try {
    return await fetch('api/room', {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('room post request err')
  }
}

//deleteRoom
apiWrapper.deleteRoom = async (roomID) => {
  try {
    return await fetch(`api/room/${roomID}`, {
    method: "DELETE"})
 
  } catch (err){
    console.log('room delete request err')
  }
}

//updateRoom
apiWrapper.updateRoom = async (body) => {
  //const { _id, name, light, humidity, temperature, user_id } = req.body;
  try {
    return await fetch(`api/room/${body._id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(body)})
  } catch (err){
    console.log('room put request err')
  }
}
export default apiWrapper;