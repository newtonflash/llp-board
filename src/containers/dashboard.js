import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import styles from './dashboard.css';
import BoardItem from './../components/board-item.jsx';
import AddItem from './../components/add-item.jsx';

import GraphQLService from './../services/graphql-services';

import {connect} from 'react-redux';
import DashboardActions from '../actions/dashboard-actions';

class DashBoard extends Component {
    constructor(props){
        super(props);
        this.onItemRemove = this.onItemRemove.bind(this);
        this.onItemAdd = this.onItemAdd.bind(this);
        this.onBoardUpdate = this.onBoardUpdate.bind(this);
    }

    getBoardList (){
        GraphQLService.getBoardsList((boardsList) =>{
            this.setState({
                boards : boardsList
            })
        });
    }

    componentDidMount(){
        this.props.dispatch(DashboardActions.getBoardsData({}));
    }

    onItemRemove (data){
        this.props.dispatch(DashboardActions.deleteBoard(data));
    }

    onItemAdd(data) {
        this.props.dispatch(DashboardActions.addNewBoard(data));
    }

    onBoardUpdate(data){
        this.props.dispatch(DashboardActions.updateBoard(data));
    }

    getBoards(){
        if(this.props.boards.length){
            return this.props.boards.map((item, index) => {
                return (<BoardItem
                    key={index}
                    data={item}
                    index={index}
                    onItemRemove={this.onItemRemove}
                    onUpdateboard={this.onBoardUpdate}
                ></BoardItem>);
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <AppBar
                    title="LLP Board"
                    iconClassNameRight="muidocs-icon-navigation-expand-more">

                </AppBar>
                <div className="board-list">
                    {this.getBoards()}
                    <AddItem onItemAdd={this.onItemAdd}/>
                </div>
            </React.Fragment>
        );
    }
}


const stateToPropMapping = (state) => {
    return {
        boards : state.Dashboard.boards
    }
};

const dispatchToPropsMapping = (dispatch) => {
    return{
        dispatch
    }
};


export default connect(stateToPropMapping, dispatchToPropsMapping)(DashBoard);

