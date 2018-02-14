import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './board-item.css';
import  { Redirect } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';


import PropTypes from 'prop-types';

export default class BoardItem extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            redirect            : false,
            isEditDialogOpen    : false,
            editableTitle       : "",
            editableDesc        : ""

        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.closeEditDialog = this.closeEditDialog.bind(this);
    }

    onView(){
        this.setState({
            redirect:true
        })
    }

    closeEditDialog(){
        this.setState({
            isEditDialogOpen: false
        });
    }

    openEditDialog(){
        this.setState({
            isEditDialogOpen    : true,
            editableTitle       : this.props.data.title,
            editableDesc        : this.props.data.desc

        })
    }

    onItemRemove () {
        this.props.onItemRemove(this.props.data.id);
    }

    onTitleChange(event) {
        let _title = event.target.value;

        this.setState({
            editableTitle : _title
        });
        console.log(_title);
    }

    onDescChange(event) {
        let _desc = event.target.value;
        this.setState({
            editableDesc : _desc
        });
    }

    onUpdateSubmit(evt) {
        let boardData = {
            id : this.props.data.id,
            title: this.state.editableTitle,
            desc: this.state.editableDesc
        };

        this.props.onUpdateboard(boardData);
        this.setState({
            isEditDialogOpen    : false
        })
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to={"/board/" + this.props.data.id} />);
        } else {
            return (
                (<Paper className="boards-item">
                    <div className="boards-item__cta-holder">
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem primaryText="Edit" data-id={this.props.index} onClick={evt => this.openEditDialog()}  />
                            <MenuItem primaryText="Delete" onClick={evt => this.onItemRemove()} />
                            <MenuItem primaryText="View" onClick={evt =>this.onView()}/>
                        </IconMenu>
                    </div>
                    <h2 onClick={evt=>this.onView()}>{this.props.data.title}</h2>
                    <p>{this.props.data.desc}</p>

                    <Dialog title="Update Board"
                            modal={false}
                            open={this.state.isEditDialogOpen}
                            onRequestClose={this.closeEditDialog}>
                        <div>

                            <TextField
                                hintText="Enter project name"
                                value={this.state.editableTitle}
                                onChange={(evt) => {this.onTitleChange(evt)}}/>

                            <br/>

                            <TextField
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                fullWidth={true}
                                hintText="Put some description"
                                value={this.state.editableDesc}
                                onChange={(evt) => {this.onDescChange(evt)}}/>
                            <br/>


                            <div className="form__cta-holder">
                                <RaisedButton
                                    label="Update Board"
                                    primary={true}
                                    onClick={(evt) =>{this.onUpdateSubmit(evt)}}/>
                            </div>

                        </div>

                    </Dialog>


                </Paper>)
            )
        }
    }
}

BoardItem.propTypes = {
    onUpdateboard: PropTypes.func.isRequired
};