import Events from '../events';

let initialState = {
    boards : [],
    selectedBoardId : ""
};

const DashboardReducers = (state = initialState, action) => {
    switch (action.type) {
        case Events.UPDATE_DASHBOARD:
            return Object.assign({}, state,  {boards:action.data});
        default:
            return state;
    }
};

export default DashboardReducers;