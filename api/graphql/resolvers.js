const BoardService = require('../boards/boards.service');


var resolver = {

    queries:{
        boards : (parent, args, context, info)=>{
            return [
                {
                    id: 1,
                    title: "ASX - new",
                    desc : "Dashboard for Australlian security exchange"
                },
                {
                    id:2,
                    title: "European Tour",
                    desc : "This is all about golf in europe."
                }
            ];
        },
        getBoard: (parent, args = {id : 0}, context, info) => {

            return [
                {
                    id: 1,
                    title: "ASX",
                    desc : "Dashboard for Australlian security exchange"
                },
                {
                    id:2,
                    title: "European Tour",
                    desc : "This is all about golf in europe."
                }
            ][args.id];
        },
        taskList : (_ , args, context, info) => {
            return "tasks";
        }
    },
    mutations: {
        addBoard : (parent, input, context) => {
            BoardService.addBoard(input);



        }
    }

};
module.exports = resolver;