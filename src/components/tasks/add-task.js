
import React from "react";
import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { func } from 'prop-types'

export default class AddTask extends React.PureComponent{
    constructor (props){
        super(props);
        this.state = {
            isCreateNewTaskDialogOpen: false,
            title: "",
            desc: ""
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescChange = this.onDescChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onTitleChange(event){
        let _title = event.target.value;
        this.setState({
            title : _title
        });
    }

    onDescChange(event){
        let _desc = event.target.value;
        this.setState({
            desc : _desc
        });
    }

    onSubmit(){
        this.props.onAddTask({
            title: this.state.title,
            desc: this.state.desc
        });
        this.setState({
            title: "",
            desc: ""
        });
        this.handleClose();

    }

    handleClose(){
        this.setState({
            isCreateNewTaskDialogOpen: false
        });
    }

    onAddClick(){
        this.setState({
            isCreateNewTaskDialogOpen: true
        })
    }

    render(){
        return(
            <React.Fragment>
                <ListItem className="task" primaryText=" + Add another task" onClick={this.onAddClick}/>
                <Dialog title="Add a task"
                        modal={false}
                        open={this.state.isCreateNewTaskDialogOpen}
                        onRequestClose={this.handleClose}>
                    <div>
                        <TextField
                            hintText="Enter title"
                            value={this.state.title}
                            onChange={(evt) => {this.onTitleChange(evt)}}/>

                        <br/>
                        <TextField
                            fullWidth={true}
                            hintText="Enter desc"
                            value={this.state.desc}
                            onChange={(evt) => {this.onDescChange(evt)}}/>
                        <br/>
                        <div className="form__cta-holder">
                            <RaisedButton
                                label="Create a new task"
                                primary={true}
                                onClick={(evt) =>{this.onSubmit(evt)}}/>
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        )
    }
}

AddTask.propTypes = {
    onAddTask: func
};
