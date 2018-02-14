import  {combineReducers} from 'redux';
import Board from './board-reducers';
import Dashboard from './dashboard-reducers';

const CombinedReducers =  combineReducers({
    Dashboard,
    Board
});

export default CombinedReducers;
