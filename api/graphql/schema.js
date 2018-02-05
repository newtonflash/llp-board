
const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean
} = require ('graphql/type');



const resolver = require('./resolvers');
resolver.getBoard(1);

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

const dashboardQuery = new GraphQLObjectType({
    name: "dashboard",
    description: "Queries in dashboard",
    fields : {
        boards : {
            type: new GraphQLList(board),
            description: "Gets list of all boards",
            resolve :resolver.boards

        },
        board : {
            type : board,
            description: "Get board by id",
            args: {
                id: { type: GraphQLInt }
            },
            resolve : resolver.getBoard
        }
    }
})

const taskList = new GraphQLObjectType({
    name:'taskList',
    description: 'task list',
    fields : () => ({
        id : {
            type: (GraphQLString),
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



module.exports = new GraphQLSchema({ query: dashboardQuery});