import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import styles from './add-item.css';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

export default class TaskList extends React.Component {

    constructor(props){
        super(props);
    }


    onDescriptionChange(event){

    }

    render(){

        return (
            <React.Fragment>
                <Paper zDepth={1} >
                    <List>
                        <Subheader>Recent chats</Subheader>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                        <ListItem primaryText="Brendan Lim"/>
                    </List>
                    <Divider />
                </Paper>
            </React.Fragment>
        )
    }
}