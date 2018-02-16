
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
        }
    })
});

const taskList = new GraphQLObjectType({
    name:'tasklist',
    description: 'task list',
    fields : () => ({
        id : {
            type: GraphQLInt,
            description: 'id list'
        },

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
})

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
        board : {
            type : new GraphQLList(board),
            description: "Get board by id",
            args: {
                id: { type: GraphQLString }
            },
            resolve : resolver.queries.getBoard
        },
        list : {
            type: taskList,
            description:"Task list"
        }
    }
});


module.exports = new GraphQLSchema({ query: rootQuery, mutation: mutations});