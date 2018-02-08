import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import styles from './add-item.css';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

export default class AddItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            boardName : "",
            desc: ""
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onSubmit () {
        this.props.onItemAdd({
            title: this.state.title,
            desc: this.state.desc
        });
        this.setState({open: false});
    }

    onNameChange(event){
        let _name = event.target.value;
        this.setState({
            title: _name
        });
    }

    onDescriptionChange(event){
        let _desc = event.target.value;
        this.setState({
            desc: _desc
        })
    }

    handleOpen() {
        this.setState({open: true, title: "", desc:""});

    };

    handleClose (){
        this.setState({open: false});
    };

    render(){

        return (
                <React.Fragment>
                    <FloatingActionButton className="board-list__add-new-btn" onClick={this.handleOpen}>
                        <ContentAdd />
                    </FloatingActionButton>
                    <Dialog title="Add a board"
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}
                    >
                        <div>

                            <TextField
                                hintText="Enter project name" value={this.state.title} onChange={(evt) => {this.onNameChange(evt)}}/>

                            <br/>

                            <TextField
                                multiLine={true}
                                rows={2}
                                rowsMax={4}
                                fullWidth={true}
                                hintText="Put some description" value={this.state.desc} onChange={(evt) => {this.onDescriptionChange(evt)}}/>
                            <br/>


                            <div className="form__cta-holder">
                                <RaisedButton
                                    label="Create Board"
                                    primary={true}
                                    onClick={(evt) =>{this.onSubmit(evt)}}/>
                            </div>

                        </div>

                    </Dialog>
                </React.Fragment>
            )
    }
}