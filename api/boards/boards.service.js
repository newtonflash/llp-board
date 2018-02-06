const BoardsModel = require('./boards.schema');

const addBoard = function(board){
    let newBoard = new BoardsModel({
        title: board.title,
        desc: board.desc
    });
    newBoard.save((err)=>{
        console.log(err);
    });
};

const removeBoard = function(boardID){
    console.log(boardID);
};

const updateBoard = function(board){
    console.log(board);
};

const getBoards = function(){

};

module.exports = {
    addBoard,
    removeBoard,
    updateBoard,
    getBoards
};