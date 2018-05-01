import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import style from "./board.css";

import styles from './dashboard.css';



import BoardItem from './../components/board-item.jsx';

import  { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import TaskList from '../components/tasks/task-list';
import AddTaskList from '../components/tasks/add-task-list';
import BoardActions from "../actions/board-actions";
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



import { Droppable,Draggable, DragDropContext } from 'react-beautiful-dnd';

const TASK_LIST = "TASK_LIST";
const BOARDS = "BOARDS";


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f0f0f0" : "white",
    display: "flex",
    padding: 8,
    overflow: "auto"
});

const reorder = (orderType, taskLists, source, destination) => {

    let resultantArr =  Array.from(taskLists);

    if(orderType === BOARDS){
        const [removed] = resultantArr.splice(source.index, 1);
        resultantArr.splice(destination.index, 0, removed);
    }


    if(orderType ===  TASK_LIST){
        // todo sorting of elements
        if(source.droppableId === destination.droppableId){
            resultantArr = resultantArr.map((item)=>{
                console.log(item);
                if(item.id === source.droppableId.replace("TASK_LIST__", "") ){
                    const [removed] = item.tasks.splice(source.index - 900000, 1);
                    item.tasks.splice(destination.index, 0, removed);
                }
                return item;
            });

        } else {
            let sourceList = resultantArr.filter((item, i)=>{
                return item.id === source.droppableId.replace("TASK_LIST__", "");
            });
            console.log(sourceList);

            let destinationList = resultantArr.filter((item, i)=>{
                return item.id === destination.droppableId.replace("TASK_LIST__", "");
            });
        }

        //const [removed] = resultantArr.

    }

    return resultantArr;
};

class Board extends Component {
    constructor(props){
        super(props);
        //console.log(this.props.match.params);
        this.boardId = this.props.match.params.id;
        this.state = {

        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onTaskAdd = this.onTaskAdd.bind(this);
        this.onTaskRemove = this.onTaskRemove.bind(this);
        this.onTaskUpdate = this.onTaskUpdate.bind(this);
    }

    componentDidMount () {
        this.props.dispatch(BoardActions.getBoardData(this.boardId));
    }

    getAllLists(list) {
        if(list[0]){
            return list.map((item,index) => {
                return <Draggable draggableId={index} index={index} key={index}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}
                            {...provided.draggableProps}

                        >
                            <div className="test"></div>
                        </div>
                    )}
                </Draggable>
            })
        }
    }

    onTaskListAdd (data) {

    }

    onDragEnd(result){
        // return if not droppped properly.
        if (!result.destination) {
            return;
        }

        let orderType = TASK_LIST;

        if(result.destination.droppableId.indexOf(BOARDS) > -1) orderType = BOARDS;

       const items = reorder(
            orderType,
            this.props.board.taskList,
            result.source,
            result.destination
        );

        this.props.board.taskList = items;
        console.log(this.props.board);

        // this action should have been done asynchronous.. in ideal scenario, it should only send and updation to server.
        this.props.dispatch(BoardActions.updateBoardData(this.props.board));
    }

    onTaskAdd (taskListId, newTask){
        this.props.board.taskList.map((item)=>{
            if(item.id === taskListId){
                item.tasks.push(newTask)
            }
        });
        this.props.dispatch(BoardActions.updateBoardData(this.props.board));
    }

    onTaskUpdate(taskListId, task){
        this.props.board.taskList.map((item)=>{
            if(item.id === taskListId){
                item.tasks = item.tasks.map((item, i)=> {
                    if( item.id == task.id){
                        item = task;
                    }
                    return item;
                });
            }
        });

       this.props.dispatch(BoardActions.updateBoardData(this.props.board));
    }

    onTaskRemove(taskListId, task){
        this.props.board.taskList.map((item)=>{
            if(item.id === taskListId){
                item.tasks = item.tasks.filter((item, i)=> {return item.id !== task.id});
            }
        });

        this.props.dispatch(BoardActions.updateBoardData(this.props.board));
    }

    render() {
        const {taskList} = this.props.board;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <React.Fragment>
                    <AppBar
                        title={this.props.board.title}
                        iconElementRight={
                            <Link to="/">
                                <FlatButton className="app-bar-link" label="Back to Dashboard"/>
                            </Link>
                        }
                    >
                    </AppBar>

                    <Droppable droppableId="BOARDS" direction="horizontal" type="BOARDS">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {
                                    taskList.map((item, index) => (

                                        <Draggable key={index} draggableId={item.order} index={index} type="BOARDS">
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                >
                                                    <Paper className="task-list">
                                                        <Subheader
                                                            {...provided.dragHandleProps}
                                                            className="task-header" type="BOARDS" >

                                                            <div className="task-list__title">{item.title}</div>
                                                            <div className="task-list__cta-holder">
                                                                <IconMenu
                                                                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                                                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                                                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                                                >
                                                                    <MenuItem primaryText="Edit" data-id={this.props.index} />
                                                                    <MenuItem primaryText="Delete" />
                                                                </IconMenu>
                                                            </div>

                                                        </Subheader>
                                                        <Divider />
                                                        <TaskList data={item}
                                                                  key={index}
                                                                  itemId={index}
                                                                  onTaskAdd={this.onTaskAdd}
                                                                  onTaskRemove = {this.onTaskRemove}
                                                                  onTaskUpdate = {this.onTaskUpdate}
                                                        ></TaskList>
                                                    </Paper>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <AddTaskList onItemAdd = {this.onTaskListAdd}></AddTaskList>
                </React.Fragment>
            </DragDropContext>
        );
    }
}

const stateToPropMapping = (state) => {
    return {
        board : state.Board
    }
};

const dispatchToPropsMapping = (dispatch) => {
    return{
        dispatch
    }
};


export default connect(stateToPropMapping, dispatchToPropsMapping)(Board);


