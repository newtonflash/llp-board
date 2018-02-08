const BoardsModel = require('./boards.schema');

const addBoard = function(board){
    let newBoard = new BoardsModel({
        title: board.title,
        desc: board.desc
    });
    let boardResponse = newBoard.save();

    return boardResponse;

};

const deleteBoard = function(boardID){

    const boardsData = BoardsModel.find({id:boardID.id}).remove().exec();
    boardsData.then((data)=>{
        console.log(data);
        return boardID;
    }).catch((err)=>{
        console.log(err);
    })
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
    deleteBoard,
    updateBoard,
    getBoards
};