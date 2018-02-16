const BoardsModel = require('./boards.schema');

const addBoard = function(board){
    let newBoard = new BoardsModel({
        title: board.title,
        desc: board.desc
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

const getBoard = function(id) {
    const boardsData = BoardsModel.find({_id: id}, (err, data) => {
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
       // return data;
    });
    return boardsData;
};

module.exports = {
    addBoard,
    deleteBoard,
    updateBoard,
    getBoards,
    getBoard
};