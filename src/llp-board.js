import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import styles from './llp-board.css';
import BoardItem from './components/board-item.jsx';
import AddItem from './components/add-item.jsx';

export default class LLPBoard extends Component {
    constructor(){
        super();
        this.state = {
            boards : [
                {
                    title: "Aurstrallian Security Exchange",
                    description : ""
                }
                "First project"
            ]
        };
        this.onItemRemove = this.onItemRemove.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemAdd = this.onItemAdd.bind(this);
    }

    onItemRemove (data){

    }

    onItemUpdate (data){

    }

    onItemAdd(data){
        console.log(data);
    }

    render() {
        const getBoards = this.state.boards.map((item, index) => {
                                return <BoardItem key="index" data={item} index={index}></BoardItem>;
                            });

        return (
            <React.Fragment>
                <AppBar
                    title="LLP Board"
                    iconClassNameRight="muidocs-icon-navigation-expand-more">

                </AppBar>
                <div className="board-list">
                    {getBoards}
                    <AddItem onItemAdd={this.onItemAdd}/>
                </div>
            </React.Fragment>
        );
    }
}


