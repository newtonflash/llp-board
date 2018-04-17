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
import AddTaskList from '../components/add-task-list';
import BoardActions from "../actions/board-actions";


import { Droppable,Draggable, DragDropContext } from 'react-beautiful-dnd';

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f0f0f0" : "white",
    display: "flex",
    padding: 8,
    overflow: "auto"
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

class Board extends Component {
    constructor(props){
        super(props);
        //console.log(this.props.match.params);
        this.boardId = this.props.match.params.id;
        this.state = {

        }
        this.onDragEnd = this.onDragEnd.bind(this);
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

       const items = reorder(
            this.props.board.taskList,
            result.source.index,
            result.destination.index
        );

        this.props.board.taskList = items;
        console.log(this.props.board);
        this.props.dispatch(BoardActions.reorderTaskList(this.props.board));
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

                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >

                                {

                                    taskList.map((item, index) => (

                                        <Draggable key={index} draggableId={index} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskList data={item} key={index}></TaskList>

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


