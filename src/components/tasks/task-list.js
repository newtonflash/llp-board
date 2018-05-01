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

import TaskItem from './task-item.jsx';

import { Droppable,Draggable } from 'react-beautiful-dnd';

import AddTask from './add-task';

import taskListStyle from './task-list.css';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f0f0f0" : "white"
});

export default class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.onAddTask = this.onAddTask.bind(this);
    }

    onAddTask(newListItem) {
        this.props.onTaskAdd(this.props.data.id, newListItem);
    }

    render(){

        let {tasks} = this.props.data;
        let itemId = this.props.itemId;
        let UID = this.props.data.id;
        let itemRemoveCB = this.props.onTaskRemove;
        let itemUpdateCB = this.props.onTaskUpdate;

        let getListItems = tasks.map((item, i)=> {

           return (

                   <Draggable key={i + itemId} draggableId={10000 + i + UID} index={900000 + i } type="TASK">
                       {(provided, snapshot) => (
                           <div
                               ref={provided.innerRef}
                               {...provided.dragHandleProps}
                               {...provided.draggableProps}
                           >
                               <TaskItem className="taskItem"
                                         key={i}
                                         item={item}
                                         taskListId = {this.props.data.id}
                                         onTaskRemove={itemRemoveCB}
                                         onTaskUpdate={itemUpdateCB}
                               />
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

                <AddTask onAddTask={this.onAddTask}/>

            </List>
        )
    }
}