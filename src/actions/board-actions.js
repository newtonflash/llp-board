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

const BoardActions = {
    getBoardData: (id) => {
        return dispatch =>{
            GraphQLService.getBoardById(id, (res)=> {
                console.log(res);
               dispatch(initBoard(res))
            });
        }
    }
};


export  default BoardActions;