import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import styles from './dashboard.css';
import BoardItem from './../components/board-item.jsx';
import AddItem from './../components/add-item.jsx';

export default class DashBoard extends Component {
    constructor(){
        super();
        this.state = {
            boards : [
                {
                    id: 1,
                    title: "ASX",
                    desc : "Dashboard for Australlian security exchange"
                },
                {
                    id:2,
                    title: "European Tour",
                    desc : "This is all about golf in europe."
                }
            ]
        };
        this.onItemRemove = this.onItemRemove.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
        this.onItemAdd = this.onItemAdd.bind(this);
    }

    componentDidMount(){
        let query = {
                query: "{boards{id,desc,title}}"
            },
            variables: {  };

        fetch ('/graphql', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(query)
        })
            .then( response => {
                return response.json();
            }).then((json) => {
                this.setState({
                    boards: json.data.boards
                 });

        }).catch( error => {
            console.log(error);
        })
    };

    onItemRemove (data){

    }

    onItemUpdate (data){

    }

    onItemAdd(data) {
        console.log(data)
        data.id = this.state.boards.length + 1;
        var boards = [...this.state.boards, data];
        this.setState({
            boards: boards
        });
    }


    render() {
        const getBoards = this.state.boards.map((item, index) => {
                                return <BoardItem key={index} data={item} index={index}></BoardItem>;
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


