import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './board-item.css';
import  { Redirect } from 'react-router-dom';

export default class BoardItem extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            redirect:false
        }

    }
    onView(){
        console.log(this);
        this.setState({
            redirect:true
        })
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to={"/board/" + this.props.data.id} />);
        } else {
            return (
                (<Paper className="boards-item">
                    <h2>{this.props.data.title}</h2>
                    <p>{this.props.data.desc}</p>

                    <div className="boards-item__cta-holder">
                        <RaisedButton label="VIEW"
                                      className="board-item__action-btn"
                                      primary={true} data-id={this.props.index}
                                      onClick={(evt)=>this.onView()}></RaisedButton>
                        <RaisedButton label="EDIT" className="board-item__action-btn" primary={true} data-id={this.props.index}></RaisedButton>
                    </div>

                </Paper>)
            )
        }

    }
}