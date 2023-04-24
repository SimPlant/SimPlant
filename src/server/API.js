/* need to migrate all functionality into the router once the 
   public-facing endpoint API is designed */
const { Pool } = require('pg');
const process = require('process');
const dotenv = require('dotenv');

//this method adds dotenv variables to our process
dotenv.config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
  connectionString: PG_URI
});

// currently hardcoded for esther's ID 
// const userID = 2;
export default apiWrapper = {
  /**** USER FUNCTIONS ****/
  // do we need to get all users?
  // should we pass in a user obj with username and password props instead?

  /* gets user from db and returns user */
  /* (userID: number) ->  user: Promise<object> */
  getUser: async userID => {
    try {
      const query = 'SELECT * FROM public.user WHERE _id = $1;';
      const result = await pool.query(query, [userID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('getUser', error);
    }
  },
  // (async () => {
  //   console.log('getUser', await getUser(userID));
  // })();
  
  /* adds user to db and returns new user */
  /* (user: object) -> user: Promise<object> */
  addUser: async (user) => {
    try {
      const { username, password } = user;
      const query = `INSERT INTO public.user (username, password)
                    VALUES ($1, $2)
                    RETURNING *;`;
      const result = await pool.query(query, [username, password]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('addUser', error);
    }
  },
  // (async () => {
  //   const user = {username: 'shimmy', password: 'shimmys_password'};
  //   console.log('addUser', await addUser(user));
  // })();

  /* update user and return updated user */
  /* (user: object) -> user: Promise<object> */
  updateUser: async (user) => {
    const { _id, username, password } = user;
    try {
      const query = `UPDATE public.user
                    SET username = $1, password = $2
                    WHERE _id = $3
                    RETURNING *;`
      const result = await pool.query(query, [username, password, _id]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('updateUser', error);
    }
  },
  // (async () => {
  //   const user = {_id: 2, username: 'esther', password:'new_password'}
  //   console.log('updateUser', await updateUser(user));
  // })();

  /* deletes user from db and returns deleted user */
  /* (userID: number) -> user: Promise<object> */
  deleteUser: async (userID) => {
    try {
      const query = `DELETE FROM public.user
                    WHERE _id = $1
                    RETURNING *;`
      const result = await pool.query(query, [userID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('deleteUser', error);
    }
  },
  // (async () => {
  //   console.log('deleteUser', await deleteUser(4));
  // })();

  /**** ROOM FUNCTIONS ****/
  // const roomID = 3;

  /* gets room from db and returns room */
  /* (roomID: number) -> room: Promise<object> */
  getRoom: async (roomID) => {
    try {
      const query = `SELECT * FROM public.room
                    WHERE _id = $1;`;
      const result = await pool.query(query, [roomID]);
      return result.rows[0];               
    } catch (error) {
      return localErrorHandler('getRoom', error);
    }
  },
  // (async () => {
  //   console.log('getRoom', await getRoom(roomID));
  // })();

  /* gets all rooms of user from db and returns all rooms */
  /* (userID: number) -> rooms: Promise<array<object>> */
  getAllRooms: async (userID) => {
    try {
      const query = `SELECT * FROM public.room
                    WHERE user_id = $1;`;
      const result = await pool.query(query, [userID]);
      return result.rows;
    } catch (error) {
      return localErrorHandler('getAllRooms', error);
    }
  },
  // (async () => {
  //   console.log('getAllRooms', await getAllRooms(userID));
  // })();

  // do we need to pass in userID if it is already a prop on the newRoom obj?
  /* adds room of user to db and returns new room */
  /* (room: object, userID: number) -> room: Promise<object> */
  addRoom: async (room) => {
    try {
      const { name, light, humidity, temperature, user_id } = room;
      const values = [name, light, humidity,temperature, user_id];
      const query = `INSERT INTO public.room (name, light, humidity, temperature, user_id)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *;`
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('addRoom', error);
    }
  },
  // (async () => {
  //   const room = {
  //     name: 'kitchen', 
  //     light: 1,
  //     humidity: 5,
  //     temperature: 75,
  //     user_id: userID
  //   }
  //   console.log('addRoom', await addRoom(room, userID));
  // })();

  /* deletes room of user and returns deleted room */
  /* (roomID: number) -> room: Promise<object> */
  deleteRoom: async (roomID) => {
    try {
      const query = `DELETE FROM public.room
                    WHERE _id = $1
                    RETURNING *;`;
      const result = await pool.query(query, [roomID]);
      return result.rows[0];               
    } catch (error) {
      return localErrorHandler('deleteRoom', error);
    }
  }, 
  // (async () => {
  //   console.log('deleteRoom', await deleteRoom(roomID));
  // })();

  /* updates room and returns updated room */
  /* (updatedRoom: object, roomID: number) -> room: Promise<object> */
  updateRoom: async (updatedRoom, roomID) => {
    try {
      const { name, light, humidity, temperature, user_id } = updatedRoom;
      const values = [name, light, humidity, temperature, user_id, roomID];
      const query = `UPDATE public.room
                    SET name = $1, light = $2, humidity = $3, temperature = $4, user_id = $5
                    WHERE _id = $6
                    RETURNING *;`
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('updateRoom', error);
    }
  },
  // (async () => {
  //   const updatedRoom = {
  //     name: 'bathroom', 
  //     light: 1,
  //     humidity: 5,
  //     temperature: 80,
  //     user_id: userID
  //   }
  //   console.log('updateRoom', await updateRoom(updatedRoom, roomID));
  // })();

  /**** PLANT FUNCTIONS ****/
  // const plantID = 1;
  /* get plant from db and return plant */
  /* (plantID: number) -> Promise<object> */
  getPlant: async (plantID) => {
    try {
      const query = `SELECT * FROM public.plants
                    WHERE _id = $1;`
      const result = await pool.query(query, [plantID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('getPlant', error);
    }
  },
  // (async () => {
  //   console.log('getPlant', await getPlant(plantID));
  // })();

  /* gets and returns all plants of a given user from db */
  /* (userID: number) -> plants: Promise<array<object>> */
  getAllPlantsByUser: async (userID) => {
    try {
      const query = `SELECT * FROM public.plants
                    WHERE user_id = $1;`;
      const result = await pool.query(query, [userID]);
      return result.rows;
    } catch (error) {
      return localErrorHandler('getAllPlantsByUser', error);
    }
  },
  // (async () => {
  //   console.log('getAllPlantsByUser', await getAllPlantsByUser(userID));
  // })();

  /* gets and returns all plants in a given room from db */
  /* (roomID: number) -> plants: Promise<array<object>> */
  getAllPlantsByRoom: async (roomID) => {
    try {
      const query = `SELECT * FROM public.plants
                    WHERE room_id = $1;`;
      const result = await pool.query(query, [roomID]);
      return result.rows;
    } catch (error) {
      return localErrorHandler('getAllPlantsByRoom', error);
    }
  },
  // (async () => {
  //   console.log('getAllPlantsByRoom', await getAllPlantsByRoom(roomID));
  // })();

  /* add plant to db and return new plant */
  /* (plant: object, userID: number) -> Promise<object> */
  addPlant: async (plant) => {
    const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = plant;
    try {
      const query = `INSERT INTO public.plants (species, watering_frequency_per_week, humidity, light, user_id, room_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *;`
      const result = await pool.query(query, [species, watering_frequency_per_week, humidity, light, user_id, room_id]);
      return result.rows[0];                   
    } catch (error) {
      return localErrorHandler('addPlant', error);
    }
  },
  // (async () => {
  //   const plant = {
  //     species: 'succulent',
  //     watering_frequency_per_week: 1,
  //     humidity: 70,
  //     light: 5,
  //     user_id: userID,
  //     room_id: roomID
  //   };
  //   console.log('addPlant', await addPlant(plant));
  // })();

  /* deletes plant and returns deleted plant */
  /* (plantID: number) -> Promise<object> */
  deletePlant: async (plantID) => {
    try {
      const query = `DELETE FROM public.plants
                    WHERE _id = $1
                    RETURNING *;`;
      const result = await pool.query(query, [plantID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('deletePlant', error);
    }
  },
  // (async () => {
  //   console.log('deletePlant', await deletePlant(plantID));
  // })();

  /* update plant in db and return updated plant */
  /* (plant: object, plantID: number) -> Promise<object> */
  updatePlant: async (plant, plantID) => {
    const { species, watering_frequency_per_week, humidity, light, user_id, room_id } = plant;
    try {
      const query = `UPDATE public.plants
                    SET species = $1, watering_frequency_per_week = $2, humidity = $3, light = $4, user_id = $5, room_id = $6
                    WHERE _id = $7
                    RETURNING *;`
      const result = await pool.query(query, [species, watering_frequency_per_week, humidity, light, user_id, room_id, plantID]);
      return result.rows[0];                   
    } catch (error) {
      return localErrorHandler('updatePlant', error);
    }
  },
  // (async () => {
  //   const plant = {
  //     species: 'succulent',
  //     watering_frequency_per_week: 1,
  //     humidity: 70,
  //     light: 5,
  //     user_id: userID,
  //     room_id: roomID
  //   };
  //   console.log('updatePlant', await updatePlant(plant, 3));
  // })();

  /**** DAY FUNCTIONS ****/
  // will we need to update/delete days? each user should have 7 days?

  /* get day from db and return day */
  /* (dayID: number) -> Promise<object> */
  getDay: async (dayID) => {
    try {
      const query = `SELECT * FROM public.day
                    WHERE _id = $1;`
      const result = await pool.query(query, [dayID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('getDay', error);
    }
  },
  // (async () => {
  //   console.log('getDay', await getDay(1));
  // })();

  /* gets and returns all days of a given user from db */
  /* (userID: number) -> plants: Promise<array<object>> */
  getAllDays: async (userID) => {
    try {
      const query = `SELECT * FROM public.day
                    WHERE user_id = $1;`;
      const result = await pool.query(query, [userID]);
      return result.rows;
    } catch (error) {
      return localErrorHandler('getAllDays', error);
    }
  },
  // (async () => {
  //   console.log('getAllDays', await getAllDays(userID));
  // })();

  /* add day to db and return new day */
  /* (day: object, userID: number) -> Promise<object> */
  addDay: async (day) => {
    const { day_num, user_id } = day;
    try {
      const query = `INSERT INTO public.day (day_num, user_id)
                    VALUES ($1, $2)
                    RETURNING *;`
      const result = await pool.query(query, [day_num, user_id]);
      return result.rows[0];                   
    } catch (error) {
      return localErrorHandler('addDay', error);
    }
  },
  // (async () => {
  //   const day = {
  //     day_num: 2,
  //     user_id: userID
  //   };
  //   console.log('addDay', await addDay(day));
  // })();

  /* deletes day and returns deleted day */
  /* (dayID: number) -> Promise<object> */
  deleteDay: async (dayID) => {
    try {
      const query = `DELETE FROM public.day
                    WHERE _id = $1
                    RETURNING *;`;
      const result = await pool.query(query, [dayID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('deleteDay', error);
    }
  },
  // (async () => {
  //   console.log('deleteDay', await deleteDay(2));
  // })();

  /**** PLANT_WATERING FUNCTIONS ****/

  /* get plant_watering event and returns event */
  /* (plantWateringID: number) -> Promise<object> */
  getPlantWatering: async (plantWateringID) => {
    try{
      const query =  `SELECT * FROM public.plant_watering WHERE _id = $1;`;
      const result = await pool.query(query, [plantWateringID]);
      return result.rows[0];
    } catch (error) {
      return localErrorHandler('getPlantWatering', error);
    }
  },
  // (async () => {
  //   console.log('getPlantWatering', await getPlantWatering(1));
  // })();
  

  /* get all plant_watering events of day and return events */
  /* (dayID: number) -> Promise<array<object>> */
  getAllPlantWateringsByDay: async (dayID) => {
    try{
      const query = `SELECT * FROM public.plant_watering 
                    WHERE day_id = $1;`;
      const result = await pool.query(query, [dayID]);
      return result.rows;
    }
    catch(error) {
      return localErrorHandler('getAllPlantWateringsByDay', error);
    }
  },
  // (async ()=> {console.log('getAllPlantWateringsByDay', await getAllPlantWateringsByDay(1))})();

  /* get all plant_watering events of plant and return events */
  /* (plantID: number) -> Promise<array<object>> */
  getAllPlantWateringsByPlant: async (plantID) => {
    try {
      query = `SELECT * FROM public.plant_watering 
              WHERE plants_id = $1;`;
      const result = await pool.query(query, [plantID]);
      return result.rows;
    }
    catch(error){
      return localErrorHandler('getAllPlantWateringsByPlant', error);
    }
  },

  // (async () => {
  //   console.log('getAllPlantWateringsByPlant', await getAllPlantWateringsByPlant(1));
  // })();

  /* add plant_watering event and return new event */
  /* (plantWatering: object) -> Promise<object> */
  addPlantWatering: async (plantWatering) => {
    const { plants_id, day_id } = plantWatering;
    try {
      //create query
      const query = `INSERT INTO public.plant_watering (plants_id, day_id) 
                    VALUES ($1, $2)
                    RETURNING *;`;
      const result =  await pool.query(query, [plants_id, day_id]);
      return result.rows[0];
    }
    catch (error) {
      return localErrorHandler('addPlantWatering', error);
    }
  },
  // (async () => {
  //   const plantWatering = {plants_id: 1, day_id: 1};
  //   console.log('addPlantWatering', await addPlantWatering(plantWatering));
  // })();

  /* delete plant_watering event and return deleted event */
  /* (plantWateringID: number) -> Promise<object> */
  deletePlantWatering: async (plantWateringID) => {
    try {
      const query = `DELETE FROM public.plant_watering
                      WHERE _id = $1
                      RETURNING *;`;
      const result = await pool.query(query, [plantWateringID]);
      return result.rows[0];
    } catch(error) {
      return localErrorHandler('deletePlantWatering', error);
    }
  },

  // (async () => {
  //   console.log('deletePlantWatering', await deletePlantWatering(1));
  // })();

  /* local error handler */
  /* (location: string, error: object) -> console.log */ 
  localErrorHandler: (location, err) => {
    return console.log({location: location, err: err});
  }
};
