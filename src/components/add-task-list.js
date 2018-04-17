import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import styles from './add-item.css';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

export default class AddBoardItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            title : "",
            type : ""
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

    onTypeChange (event) {
        let _type = event.target.value;
        this.setState({
            type: _type
        })
    }

    onTitleChange(event){
        let _title = event.target.value;
        this.setState({
            title: _title
        });
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
                <Dialog title="Add a board."
                        modal={false}
                        open={this.state.open}
                        onRequestClose={this.handleClose}>
                    <div>
                        <TextField
                            hintText="Enter type name"
                            value={this.state.type}
                            onChange={(evt) => {this.onTypeChange(evt)}}/>

                        <br/>
                        <TextField
                            hintText="Enter task list title (optional)"
                            value={this.state.title}
                            onChange={(evt) => {this.onTitleChange(evt)}}/>
                        <br/>
                        <div className="form__cta-holder">
                            <RaisedButton
                                label="Create Task List"
                                primary={true}
                                onClick={(evt) =>{this.onSubmit(evt)}}/>
                        </div>
                    </div>

                </Dialog>
            </React.Fragment>
        )
    }
}