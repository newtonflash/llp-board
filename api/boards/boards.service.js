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
   /* BoardsModel.remove({_id:board.id}, function (err) {
        if (err) return console.log(err);
        return boardID.id;
    });*/

    BoardsModel.findById(board.id + "", (err, model) => {
        if(err || model === null) return err;

        //console.log(model);
        model.remove((err) => {
            if(err) return err;
            //console.log("resulting ",model);
            return model;
        });
    });
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