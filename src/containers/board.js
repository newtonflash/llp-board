import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import style from "./board.css";

import styles from './dashboard.css';
import BoardItem from './../components/board-item.jsx';

import  { Redirect } from 'react-router-dom';

export default class Board extends Component {
    constructor(props){
        super(props);
        this.boardId = this.props.match.params.id *1;
        this.state = {
            boards : [
                {
                    title: "ASX",
                    desc : "Dashboard for Australlian security exchange"
                },
                {
                    title: "European Tour",
                    desc : "This is all about golf in europe."
                }
            ]
        };
    }






    render() {
        const getBoards = this.state.boards.map((item, index) => {
                                return <BoardItem key={index} data={item} index={index}></BoardItem>;
                            });

        return (
            <React.Fragment>
                <AppBar
                    title={this.state.boards[this.boardId].title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementRight={
                        <Link to="/">
                            <FlatButton className="app-bar-link" label="Back to Dashboard"/>
                        </Link>
                    }
                >
                </AppBar>
            </React.Fragment>
        );
    }
}


