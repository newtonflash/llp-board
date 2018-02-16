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
import TaskList from '../components/task-list';
import AddTaskList from '../components/add-task-list';
import BoardActions from "../actions/board-actions";

class Board extends Component {
    constructor(props){
        super(props);
        //console.log(this.props.match.params);
        this.boardId = this.props.match.params.id;
    }

    componentDidMount () {
        this.props.dispatch(BoardActions.getBoardData(this.boardId));
    }

    getAllLists(list) {
        if(list[0]){
            return list.map((item,index) => {
                return <TaskList data={item} key={index}></TaskList>;
            })
        }
    }

    onTaskListAdd (data) {

    }

    render() {
        return (
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
                {
                    this.getAllLists(this.props.board.taskList || [])
                }
                <AddTaskList onItemAdd = {this.onTaskListAdd}></AddTaskList>
            </React.Fragment>
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


