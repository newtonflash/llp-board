
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
            type: GraphQLInt,
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
            type : board,
            description: "Get board by id",
            args: {
                id: { type: GraphQLInt }
            },
            resolve : resolver.queries.getBoard
        },
        list : {
            type: taskList,
            description:"Task list"
        }
    }
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
        }
    }
});




module.exports = new GraphQLSchema({ query: rootQuery, mutation: mutations});