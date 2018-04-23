import React from 'react';
import PropTypes from 'prop-types';
import {ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class TaskItem extends React.PureComponent{
    constructor (props){
        super(props);
        this.state = {
            isEditDialogOpen: false,
            title : this.props.item.title,
            desc : this.props.item.desc
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onTaskRemove = this.onTaskRemove.bind(this);
        this.onTaskUpdate = this.onTaskUpdate.bind(this);
        this.closeEditDialog = this.closeEditDialog.bind(this);
    }

    closeEditDialog(){
        this.setState({
            isEditDialogOpen: false
        });
    }

    openEditDialog(){
        this.setState({
            isEditDialogOpen    : true,
            title               : this.props.item.title,
            desc                : this.props.item.desc
        })
    }

    onTaskRemove () {
        this.props.onTaskRemove(this.props.item);
    }

    onTaskUpdate(){
        this.props.onTaskRemove(this.props.data.id);
    }

    onTitleChange(event) {
        let _title = event.target.value;

        this.setState({
            title : _title
        });
    }

    onDescChange(event) {
        let _desc = event.target.value;
        this.setState({
            desc : _desc
        });
    }

    onUpdateSubmit(evt) {
        this.props.item.title = this.state.title;
        this.props.item.desc = this.state.desc;

        this.props.onTaskUpdate(this.props.item);
        this.setState({
            isEditDialogOpen    : false
        });
    }

    render(){
        const {title, desc} = this.props.item;
        return (
             <React.Fragment>
                <ListItem primaryText={title} secondaryText={desc} onClick={(evt)=>{this.openEditDialog()}} />
                <Dialog title="Update Task"
                        modal={false}
                        open={this.state.isEditDialogOpen}
                        onRequestClose={this.closeEditDialog}>
                    <div>
                        <TextField
                            hintText="Enter project name"
                            value={this.state.title}
                            onChange={(evt) => {this.onTitleChange(evt)}}/>

                        <br/>

                        <TextField
                            multiLine={true}
                            rows={2}
                            rowsMax={4}
                            fullWidth={true}
                            hintText="Put some description"
                            value={this.state.desc}
                            onChange={(evt) => {this.onDescChange(evt)}}/>
                        <br/>


                        <div className="form__cta-holder">
                            <FlatButton
                                label="Delete Task"
                                secondary={true}
                                style={{margin:'0 10px'}}
                                onClick={(evt) =>{this.onTaskRemove(evt)}}/>

                            <RaisedButton
                                label="Update Task"
                                primary={true}
                                onClick={(evt) =>{this.onUpdateSubmit(evt)}}/>

                        </div>
                    </div>
                </Dialog>
              </React.Fragment>
        )
    }
}

TaskItem.propTypes = {
    id: PropTypes.string,
    title : PropTypes.string,
    onTaskRemove : PropTypes.func,
    onTaskUpdate : PropTypes.func
};