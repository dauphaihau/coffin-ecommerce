import {useEffect, useState} from "react";
import Dialog from "../../../../core/Dialog/Dialog";
import {Button} from "../../../../core/Button";
import {Box, Grid, Row} from "../../../../core/Layout";
import {Text} from "../../../../core";

import {Checkbox, Input, Select} from "../../../../core/Input";
import {searchByOptsProducts} from "../../../../assets/data/options";
import {MenuAlt4Icon} from "@heroicons/react/outline";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

// fake data generator
// const getItems = count => Array.from({length: count}, (v, k) => k).map(k => ({
//   id: `item-${k}`,
//   title: `item ${k}`
// }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // width: 250
});

const CustomizeColumnDialog = (props) => {
  const {defaultStatus, setDialogStatus, columns, onSave} = props;
  const [items, setItems] = useState(columns)
  const [columnsChecked, setColumnsChecked] = useState(columns.map(o => o.id))
  const [memoData, setMemoData] = useState()
  // console.log('items', items)

  useEffect(() => {
    setMemoData({...columns})
    // console.log('memo-data', memoData)
    // console.log('columns', columns)

    // setItems(columns)
    // setColumnsChecked(columns.map(o => o.id))
    // console.log('columns-checked', columnsChecked)
  }, [columns])



  function onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const itemsReorder = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    // console.log('items-reorder', itemsReorder)
    setItems(itemsReorder)
  }

  const handleOnChange = (selected) => {
    const status = selected.target.checked
    const idSelected = selected.target.value

    console.log('status', status)

    if (!status) {
      const result = columnsChecked.filter(o => o !== idSelected)
      setColumnsChecked(result)
    } else setColumnsChecked([...columnsChecked, idSelected])
    console.log('columns-checked', columnsChecked)
  }

  const handleSave = () => {
    onSave(items.filter(o => columnsChecked.includes(o.id)))
    // setMemoData(items.filter(o => columnsChecked.includes(o.id)))
    // onSave(items)
    setDialogStatus(false)
  }

  // console.log('columns-checked', columnsChecked)
  return (
    <Dialog
      classes='w-[390px]'
      isOpen={defaultStatus}
      closeDialog={() => setDialogStatus(false)}
    >
      <Dialog.Title title='Customize Columns'/>
      <Dialog.Content>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // style={getItemStyle(
                        //   snapshot.isDragging,
                        //   provided.draggableProps.style
                        // )}
                        classes={`p-4 border rounded-lg my-4 
                        flex items-center justify-between 
                        animate 
                        `}
                        // ${snapshot.isDragging ? ''}
                      >
                        <Checkbox
                          value={item.id} name={item.id}
                          defaultChecked={!columnsChecked.includes(items.id)}
                          onChange={handleOnChange}
                          label={item.title}/>
                        <MenuAlt4Icon className='h-4 w-4'/>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Row classes='mt-4' justify='end'>
          <Button light onClick={() => setDialogStatus(false)}>Cancel</Button>
          <Button shadow onClick={() => handleSave()}>Save</Button>
        </Row>
      </Dialog.Content>
    </Dialog>
  );
}

export default CustomizeColumnDialog;