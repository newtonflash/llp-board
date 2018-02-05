import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './containers/dashboard';
import Board from './containers/board';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import createStore from 'redux';
import {reducer} from './reducers/';


const DashBoardWrapper = () =>{
    return (
        <MuiThemeProvider>
            <Dashboard />
        </MuiThemeProvider>
    )
};

const BoardWrapper = (prop) => {
    return (
        <MuiThemeProvider>
            <Board {...prop}/>
        </MuiThemeProvider>
    )
};


const App = () => {

    return (

            <Router>
                <Switch>
                    <Route exact path="/" component={DashBoardWrapper} />
                    <Route path="/board/:id?" render={props => (<BoardWrapper {...props} />)} />
                </Switch>
            </Router>


    );
};

// this will give some error. but ignore as of now.
App.propTypes = {
    store: PropTypes.object.isRequired
}

ReactDOM.render(
    <App/>,
    document.getElementById('application-container')
);