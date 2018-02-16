import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import styles from './task-list.css';

export default class TaskList extends React.Component {

    constructor(props){
        super(props);
    }


    onDescriptionChange(event){

    }

    render(){

        return (
            <React.Fragment>
                <Paper className="task-list" zDepth={1} >
                    <List>
                        <Subheader className="task-header">{this.props.data.title}</Subheader>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                        <ListItem className="task" primaryText="Brendan Lim"/>
                    </List>
                    <Divider />
                </Paper>
            </React.Fragment>
        )
    }
}