import { expect } from 'chai';
import DashboardReducers from './dashboard-reducers';

import Events from '../events';

describe('Dashboard Reducers', () => {
    const initialState = {
        boards : [],
        selectedBoardId : ""
    };

    const updateDashboardData = {
        title: "hellow"
    };

    const updateDashBoard = DashboardReducers(initialState, {
        type : Events.UPDATE_DASHBOARD,
        data: updateDashboardData
    });
    it("should return the new modified state", ()=>{
        expect(updateDashBoard.boards["title"]).to.equal("hellow");
    });

});
