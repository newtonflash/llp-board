import React from 'react';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import styles from './board-item.css';

export default class BoardItem extends React.Component {
    constructor (props){
        super(props);

    }
    onClick(){

    }

    render(){

        return (
            (<Paper className="boards-item">
                {this.props.data.item}

                <div className="boards-item__cta-holder">
                    <FlatButton label="VIEW" primary={true} data-id={this.props.index}></FlatButton>
                    <FlatButton label="EDIT" primary={true} data-id={this.props.index}></FlatButton>
                </div>

            </Paper>)
        )
    }
}