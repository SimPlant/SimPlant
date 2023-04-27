import React from 'react';
import './roomStyle.scss';
import Plant from '../plants/plant.jsx';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// const plant = {
//   species: 'Monstera deliciosa',
//   watering_frequency_per_week: 1,
//   humidity: 70,
//   light: 5,
// };

export default function Room(props) {
  const plants = props.currentPlants.map((plant,i) => {
    return (
      <Draggable draggableId={plant?._id.toString()} key={plant?._id} index={i}>
        {(provided)=>{
          return (
            <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='plant'
            >
              <Plant
                plant={plant} 
                />
            </div>
            )

        }}
      </Draggable>
    );
  });

  function onSettingChange(e){
    const lightVal = Number(e.target.value);
    props.updateRoom(lightVal);
  }
  function handleOnDragEnd(result){
    const arr = props.currentPlants.slice();
      //grab the reordered item (remove from arr)
    const [reorderedItem] = arr.splice(result.source.index,1);
      //insert item at the destination index, delete 0 items, replace with reorderedItem
    arr.splice(result.destination.index,0,reorderedItem);
    props.reorderRoom(arr);
  }

  return (
    <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='room'>
        {(provided)=>{
          return(
            <div id="room" {...provided.droppableProps} ref={provided.innerRef}>
              {props.currentPlants.length !== 0 && plants}
              {provided.placeholder}
            </div>
          )
          
        }}
      </Droppable>
    </DragDropContext>
    
   {props.currentRoom && <div id="room-settings">
      <form onChange={onSettingChange}>
        <h4>Light Levels</h4>
        <select value={props.currentRoom ? props.currentRoom.light : 0} name="light">
            <option value={3}>High</option>
            <option value={2}>Medium</option>
            <option value={1}>Low</option>
          </select>
      </form>
    </div>}
    </>
    );
}
