import Events from '../events';

const initialState = {
    title: "",
    taskList : []
};

const BoardReducers = (state = initialState, action) => {
    switch (action.type) {
        case Events.GET_BOARD_DATA:

            return Object.assign({}, state,  action.data);
        default:
            return state;
    }
};

export default BoardReducers;
