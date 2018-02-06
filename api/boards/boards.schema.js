const Mongoose = require('mongoose');

const BoardsSchema = Mongoose.Schema({
    id: {
        type:Number,
        index: true,
        unique:true
    },
    title: {
        type: String,
        required: true
    },
    desc : {
        type: String
    }
}, {collection:'boards'});

const BoardsModel = Mongoose.model('BoardsModel', BoardsSchema);

module.exports = BoardsModel;