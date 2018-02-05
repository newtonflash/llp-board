import React from 'react';
import Paper from 'material-ui/Paper';

import RaisedButton from 'material-ui/RaisedButton';
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
                    <RaisedButton label="VIEW" className="board-item__action-btn" primary={true} data-id={this.props.index}></RaisedButton>
                    <RaisedButton label="EDIT" className="board-item__action-btn" primary={true} data-id={this.props.index}></RaisedButton>
                </div>

            </Paper>)
        )
    }
}