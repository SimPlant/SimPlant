import React, { useState } from 'react';
import './mainPageStyle.scss';
import '../formContainer/formContainerStyle.scss';
import RoomMenu from '../roomMenu/roomMenu.jsx';
import LowerContainer from '../lowerContainer/lowerContainer.jsx';
import FormContainer from '../formContainer/formContainer.jsx';
import Room from '../room/Room.jsx';

//main container page acts as parent component

//render drop down menu to navigate btwn rooms -roomMenu
//render lowerContainer to hold room and input forms
//render room component
//render form container componenet



function MainPage() {
  // plant container state
  const [ selectedPlants, updateSelectedPlants ] = useState([]);
  // room state
  const [ roomPlants, updateRoomPlants ] = useState( [] );
  // plant search state
  const [ searchPlant, updateSearchPlant ] = useState('');

  //query from our server api endpoint to get back plant details
  const queryPlantFamily = (params) => {
    const plantFamilyEndpoint = `http://localhost:3000/api/plantFamily/${params}`;
    
    const fetchPlantFamily = async () => {
      try {
        console.log(plantFamilyEndpoint);
        //make call to backend endpoint that will request plant family data
        //return value is an array of plant objects
        console.log('fetch request took place at l.34 mainPage.jsx');
        const response = await fetch(plantFamilyEndpoint, { headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
        // mode: 'no-cors',
        }
      );
        const jsonResult = await response.json();
        console.log('fetchPlantFamily result:', jsonResult);
        // update selectedPlants array in state with the returned array of objects
        updateSelectedPlants([...jsonResult]);
      }
      catch (err) {
        console.log('err: ', err);
        console.log("something went wrong with your query");
      }
    };
    fetchPlantFamily();
  }

  // async function queryPlantFamily(e) {
  //   e.preventDefault()
  //   const response = await fetch(`http://localhost:3000/api/plantFamily/${searchPlant}`)
  //   const result = await response.json()
  //   console.log('result', result)
  //   await updateSelectedPlants([ ...result ])
  // }


  
  
  return (
    <div className="page">
      <RoomMenu />
      <FormContainer queryPlantFamily={queryPlantFamily} updateSearchPlant={ updateSearchPlant } />
      {/* <PlantContainer selectedPlants={selectedPlants}/>  */}
      <div className="selectedPlants">
        
      </div>
      <Room />
    </div>
  );
}

export default MainPage;
