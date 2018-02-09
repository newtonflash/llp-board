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
    BoardsModel.findById(board.id + "", (err, model) => {
        if(err) return err;

        model.set({
            desc: board.desc,
            title: board.title
        });

        model.save((err, updateData) => {
            if(err) return err;
            return updateData;
        });
    });
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