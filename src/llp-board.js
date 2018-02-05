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
            todoList : [
                "First project"
            ]
        };
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(evt){
        console.log(evt.target.dataset.id);
        var newState = this.state.todoList.filter((item, index) => {

                if(index !== evt.target.dataset.id *1 ) return item;
    });
        this.setState({
            todoList : newState
        });

    }


    render() {
        const getTodoList = this.state.todoList.map((item, index) => {
                                return <BoardItem key="index" data={item} index={index}></BoardItem>;
                            });

    return (
        <React.Fragment>
            <AppBar
                title="LLP Board"
                iconClassNameRight="muidocs-icon-navigation-expand-more">

            </AppBar>
            <div className="board-list">
                {getTodoList}
                <AddItem />
            </div>
        </React.Fragment>
    );
    }
}


