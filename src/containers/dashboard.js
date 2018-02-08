import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import styles from './dashboard.css';
import BoardItem from './../components/board-item.jsx';
import AddItem from './../components/add-item.jsx';

import GraphQLSerice from './../services/graphql-services';



export default class DashBoard extends Component {
    constructor(){
        super();
        this.state = {
            boards : []
        };
        this.onItemRemove = this.onItemRemove.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemAdd = this.onItemAdd.bind(this);
    }

    getBoardList (){
        GraphQLSerice.getBoardsList((boardsList) =>{
            this.setState({
                boards : boardsList
            })
        });
    }

    componentDidMount(){
        this.getBoardList();
    };

    onItemRemove (data){
        console.log(data);
    }

    onItemUpdate (data){

    }

    onItemAdd(data) {
        GraphQLSerice.addNewBoard(data, (res)=>{
            this.getBoardList();
        });
    }


    render() {
        const getBoards = this.state.boards.map((item, index) => {
                                return <BoardItem key={index} data={item} index={index} onItemRemove={this.onItemRemove}></BoardItem>;
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


