import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import styles from './dashboard.css';
import BoardItem from './../components/board-item.jsx';
import AddItem from './../components/add-item.jsx';

const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
    transport: new Transport('/graphql')
});

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

    componentDidMount(){

        const query = (`
            {
              boards{id,desc,title}
            }
          `);

        client.query(query)
            .then(resp => {
                console.log("asdfasdfadf",resp);
                this.setState({
                    boards: resp.boards
                })
            }).catch(function(e) {
            console.log(e);
        });

    };

    onItemRemove (data){

    }

    onItemUpdate (data){

    }

    onItemAdd(data) {
        const mutationQuery = (`
            {
              addItem(title: "${data.title}",desc: "${data.desc}" )
            }
          `);

        client.mutate(mutationQuery)
            .then(resp => {
                console.log(resp);
            }).catch(function(e) {
                console.log(e);
            })



/*
        data.id = this.state.boards.length + 1;
        var boards = [...this.state.boards, data];
        this.setState({
            boards: boards
        });*/
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


