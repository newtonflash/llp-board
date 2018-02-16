/**
 * Dashboard action creators.
 * @type {{}}
 */

import Events from '../events';
import GraphQLService from '../services/graphql-services';

/**
 * Original actions
 */
const initDashboard = (data) => {
    return {
        type: Events.UPDATE_DASHBOARD,
        data: data
    }
};

const DashboardActions = {
    /**
     * For this excersize, authentication is out of scope. but it would be required incase of real application. because
     * dashboard should belong to a person.
     * @param authentication
     * @returns {Function} // using thunk middleware to do async functions
     */
    getBoardsData : (authentication = {}) => {
        return dispatch => {
            GraphQLService.getBoardsList((boardsList) =>{
                dispatch(initDashboard(boardsList) )
            });
        }
    },
    addNewBoard : (boardData) => {
        return dispatch => {
            GraphQLService.addNewBoard(boardData, (res)=>{
                GraphQLService.getBoardsList((boardsList) =>{
                    dispatch(initDashboard(boardsList) )
                });
            });
        }
    },
    deleteBoard : (boardData) => {
        return dispatch => {
            GraphQLService.deleteBoard(boardData, (res) => {
                GraphQLService.getBoardsList((boardsList) =>{
                    dispatch(initDashboard(boardsList) )
                });
            });
        }
    },

    updateBoard : (boardData) => {
        return dispatch => {
            GraphQLService.updateBoard(boardData, (res) => {
                GraphQLService.getBoardsList((boardsList) =>{
                    dispatch(initDashboard(boardsList) )
                });
            });
        }
    }
};

export default DashboardActions;