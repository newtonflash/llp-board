import  {combineReducers} from 'redux';
import BoardReducers from './board-reducers';
import Dashboard from './dashboard-reducers';

const CombinedReducers =  combineReducers({
    Dashboard,
    BoardReducers
});

export default CombinedReducers;
