import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './board-item.css';
import  { Redirect } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

export default class BoardItem extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            redirect:false
        }

    }
    onView(){
        this.setState({
            redirect:true
        })
    }

    onItemRemove () {
        this.props.onItemRemove(this.props.data.id);
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
                            <MenuItem primaryText="Edit" data-id={this.props.index}  />
                            <MenuItem primaryText="Delete" onClick={evt => this.onItemRemove()} />
                            <MenuItem primaryText="View" onClick={evt =>this.onView()}/>
                        </IconMenu>
                    </div>
                    <h2 onClick={evt=>this.onView()}>{this.props.data.title}</h2>
                    <p>{this.props.data.desc}</p>



                </Paper>)
            )
        }

    }
}