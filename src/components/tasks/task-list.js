import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from '../../../node_modules/material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import styles from './../task-list.css';

import { Droppable,Draggable } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f0f0f0" : "white"

});

export default class TaskList extends React.Component {

    constructor(props){
        super(props);

        this.state={
            list:
            [
                {
                    title : "Task 1",
                    desc : "Here is my task 1 description"
                },
                {
                    title : "Task 2",
                    desc : "Here is my task 1 description"
                },
                {
                    title : "Task 3",
                    desc : "Here is my task 1 description"
                },
                {
                    title : "Task 4",
                    desc : "Here is my task 1 description"
                }
            ]
        }

    }

    render(){

        let {list} = this.state;
        let itemId = this.props.itemId;
        let UID = this.props.data.id;

        let getListItems = list.map((item, i)=> {

           return (

                   <Draggable key={i + itemId} draggableId={10000 + i + UID} index={900000 + i } type="TASK">
                       {(provided, snapshot) => (
                           <div
                               ref={provided.innerRef}
                               {...provided.dragHandleProps}
                               {...provided.draggableProps}
                           >
                               <ListItem className="taskItem" key={i} primaryText={item.title}  />

                           </div>

                       )}
                   </Draggable>
               )


        });

        return (
            <List>
                <Droppable droppableId={"TASK_LIST__" + this.props.data.id} type="TASK" direction="vertical">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {getListItems}
                        </div>
                    )}
                </Droppable>

                <ListItem className="task" primaryText=" + Add another task"/>
            </List>
        )
    }
}