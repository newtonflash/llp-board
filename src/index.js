import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from './containers/dashboard';
import Board from './containers/board';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import CombinedReducers from './reducers/';
import ReduxThunk from 'redux-thunk';


const ApplicationStore = createStore(CombinedReducers, /* {}, */
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() , applyMiddleware(ReduxThunk));

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
        <Provider store={ApplicationStore}>
            <Router>
                <Switch>
                    <Route exact path="/" component={DashBoardWrapper} />
                    <Route path="/board/:id?" render={props => (<BoardWrapper {...props} />)} />
                </Switch>
            </Router>
        </Provider>
    );
};



ReactDOM.render(
    <App/>,
    document.getElementById('application-container')
);