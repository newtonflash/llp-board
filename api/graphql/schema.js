
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require ('graphql/type');

const resolver = require('./resolvers');


const task = new GraphQLObjectType ({
    name: 'task',
    description: 'Task object',
    fields : () => ({
        title : {
            type: GraphQLString,
            description: 'Title of individual task'
        },
        desc : {
            type: GraphQLString,
            description: 'Description of the task if exists( optional)'
        },
        order : {
            type: GraphQLInt,
            description: "Tasks priority order"
        }
    })
});

const taskList = new GraphQLObjectType({
    name:'tasklist',
    description: 'task list',
    fields : () => ({
        id : {
            type: GraphQLString,
            description: 'id list'
        },

        title : {
            type: GraphQLString,
            description: 'title'
        },
        order : {
            type: GraphQLInt,
            description: 'desc'
        },

        tasks : {
            type: new GraphQLList(task),
            description: "Task Item"
        }
    })
});

const board = new GraphQLObjectType({
    name:'board',
    description: 'board',
    fields : () => ({
        id : {
            type: GraphQLString,
            description: 'id of the board'
        },
        title : {
            type: GraphQLString,
            description: 'title'
        },
        desc : {
            type: GraphQLString,
            description: 'desc'
        },
        taskList : {
            type: new GraphQLList(taskList),
            description: 'Task list'
        }
    })
});

/*
const boardInput = new GraphQLInputObjectType({
    name:'board',
    description: 'board',
    fields : () => ({
        title : {
            type: GraphQLString,
            description: 'title'
        },
        desc : {
            type: GraphQLString,
            description: 'desc'
        }
    })
});
*/

const mutations = new GraphQLObjectType({
    name: "dashboardMutations",
    description: "mutations in dashboard",
    fields : {
        addBoard : {
            type:  board,
            args : {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                desc: {
                    type: GraphQLString
                }
            },
            description : 'Add a new board',
            resolve : resolver.mutations.addBoard
        },
        deleteBoard : {
            type : board,
            args : {
                id: {
                    type: GraphQLString
                }
            },
            description : 'Delete a board',
            resolve : resolver.mutations.deleteBoard
        },
        updateBoard : {
            type : board,
            args : {
                id: {
                    type: GraphQLString
                },
                title: {
                    type : GraphQLString
                },
                desc : {
                    type : GraphQLString
                }
            },
            description : 'Update a board',
            resolve : resolver.mutations.updateBoard
        }
    }
});


const rootQuery = new GraphQLObjectType({
    name: "RootQuery",
    description: "Queries in dashboard",
    fields : {
        boards : {
            type: new GraphQLList(board),
            description: "Gets list of all boards",
            resolve :resolver.queries.boards

        },
        getBoardById : {
            type : board,
            description: "Get board by id",
            args: {
                id: { type: GraphQLString }
            },
            resolve : resolver.queries.getBoardById
        },
        list : {
            type: taskList,
            description:"Task list"
        }
    }
});


module.exports = new GraphQLSchema({ query: rootQuery, mutation: mutations});