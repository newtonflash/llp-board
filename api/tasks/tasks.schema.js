const Mongoose = require('mongoose');



const TasksSchema = Mongoose.Schema({
    id: {
        type : Number,
        index: true,
        unique : true
    },
    category: {
        type: string

    },
    title: {
        type: String
    },
    tasks : {
        type : Array
    }

}, {collection:'tasks'});

const TasksModel = Mongoose.model('TasksModel', TasksSchema);

module.exports = TasksModel;