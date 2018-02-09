const Mongoose = require('mongoose');

const TaskSchema = Mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    desc: {
        type:String
    },
    order : {
        type:Number
    }
});

const TaskListSchema = Mongoose.Schema({
    title : {
        type:String,
        required:true
    },
    tasks : [TaskSchema]
});

const BoardsSchema = Mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    desc : {
        type: String
    },
    taskList : [ TaskListSchema ]

}, {collection:'boards'});

const BoardsModel = Mongoose.model('BoardsModel', BoardsSchema);

module.exports = BoardsModel;