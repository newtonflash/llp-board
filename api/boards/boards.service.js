const BoardsModel = require('./boards.schema');

const defaultListData = [
    {
        title : "Not Started",
        order : 1,
        tasks : [
            {
                "title": "Sample task 1",
                "desc": "sample task description"
            },
            {
                "title": "Edit/delete this task 1",
                "desc": "sample task description"

            },
            {
                "title": "Create your new task 1",
                "desc": "sample task description"
            }

        ]
    },
    {
        title : "On going",
        order : 2,
        tasks : [
            {
                "title": "Sample task 2",
                "desc": "sample task description"
            },
            {
                "title": "Edit/delete this task 2",
                "desc": "sample task description"

            },
            {
                "title": "Create your new task 2",
                "desc": "sample task description"
            }
        ]
    },
    {
        title : "Completed",
        order : 3,
        tasks : [
            {
                "title": "Sample task 3",
                "desc": "sample task description"
            },
            {
                "title": "Edit/delete this task 3",
                "desc": "sample task description"

            },
            {
                "title": "Create your new task 3",
                "desc": "sample task description"
            }
        ]
    }
]


const addBoard = function(board){
    let newBoard = new BoardsModel({
        title: board.title,
        desc: board.desc,
        taskList : defaultListData
    });
    let boardResponse = newBoard.save();
    return boardResponse;
};

const deleteBoard = function(board){

    const query = {_id : board.id + ""};

    let returnPromise = BoardsModel.findOneAndRemove(
        query ,
        { rowResult : true }
    );

    return returnPromise;
};

const updateBoard = function(board){

    const query = {_id : board.id + ""};

    let returnPromise = BoardsModel.findOneAndUpdate(
        query ,
        {
            desc: board.desc,
            title: board.title
        },
        { new : true }
    );

    return returnPromise;

};

const getBoardById = function(id) {
    const boardsData = BoardsModel.findById(id, (err, data) => {
        if(err) {
            console.log(err);
            return err;
        }
        return data;
    });

    return boardsData;
};

const getBoards = function(){

    const boardsData = BoardsModel.find({}, (err, data) => {
        if(err) {
            return err;
        }

       // return data; //what is the need of this query? how does graph ql know about this query api to execute?
    });
    return boardsData;
};


const updateTaskList = function(board){

    const query = {_id : board.id + ""};

    let returnPromise = BoardsModel.findOneAndUpdate(
        query ,
        {
            taskList: board.taskList
        },
        { new : true }
    );

    return returnPromise;
};

module.exports = {
    addBoard,
    deleteBoard,
    updateBoard,
    getBoards,
    getBoardById,
    updateTaskList
};