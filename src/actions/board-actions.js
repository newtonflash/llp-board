/**
 * Tasklist action creators
 */

import Events from '../events';
import GraphQLService from '../services/graphql-services';


/**
 * Original actions
 */
const initBoard = (data) => {
    return {
        type: Events.GET_BOARD_DATA,
        data: data
    }
};

const updateTaskList = data => {
    return {
        type : Events.BOARD_UPDATE,
        data: data
    }
}

const BoardActions = {
    getBoardData: (id) => {
        return dispatch =>{
            GraphQLService.getBoardById(id, (res)=> {
               dispatch(initBoard(res))
            });
        }
    },

    reorderTaskList: (data) => {
        return dispatch => {
            GraphQLService.updateTaskList(data, (res)=> {

                dispatch(updateTaskList(data));
            });

        }
    }
};



export  default BoardActions;