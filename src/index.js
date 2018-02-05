import React from 'react';
import ReactDOM from 'react-dom';
import LLPBoard from './llp-board';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
    return (
        <MuiThemeProvider>
            <LLPBoard />
        </MuiThemeProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('application-container')
);