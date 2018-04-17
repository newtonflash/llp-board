import React from 'react';
import PropTypes from 'prop-types';

export default class TaskItem extends React.PureCompoent{
    constructor (props){
        super(props);
        this.state = {
            isEditDialogOpen: false
        };
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onItemRemove = this.onItemRemove.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        title : PropTypes.string.isRequired,
        onItemRemove : PropTypes.function.isRequired,
        onUpdateboard : PropTypes.function.isRequired
    };

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
            editableTitle       : this.props.data.title
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
                                    label="Update Task"
                                    primary={true}
                                    onClick={(evt) =>{this.onUpdateSubmit(evt)}}/>

                                <RaisedButton
                                    label="Delete Task"
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

