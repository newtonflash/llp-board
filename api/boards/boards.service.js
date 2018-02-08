const BoardsModel = require('./boards.schema');

const addBoard = function(board){
    let newBoard = new BoardsModel({
        title: board.title,
        desc: board.desc
    });
    let boardResponse = newBoard.save();
    boardResponse.then((response) => {
        console.log(response);
    }).catch(function(e) {
        console.log(e);
    })

};

const removeBoard = function(boardID){
    console.log(boardID);
};

const updateBoard = function(board){
    console.log(board);
};

const getBoards = function(){
    const boardsData = BoardsModel.find({}, (err, data) => {
        if(err) {
            return err;
        }

        return data;
    });
    return boardsData;
};

module.exports = {
    addBoard,
    removeBoard,
    updateBoard,
    getBoards
};