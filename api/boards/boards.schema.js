const Mongoose = require('mongoose');


const BoardsSchema = Mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique:true
    },
    desc : {
        type: String
    }
}, {collection:'boards'});

const BoardsModel = Mongoose.model('BoardsModel', BoardsSchema);

module.exports = BoardsModel;