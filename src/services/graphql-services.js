const Lokka = require('lokka').Lokka;
const Transport = require('lokka-transport-http').Transport;

const client = new Lokka({
    transport: new Transport('/graphql')
});

export default class GraphQLService {
    static getBoardsList(callback){
        const query = (`
            {
                boards{
                   id,
                    desc,
                    title
                }
            }
          `);

        client.query(query)
            .then(resp => {
                callback(resp.boards);
            }).catch(function(e) {
                console.log(e);
            });
    }

    static addNewBoard(board, callback){
        const mutationQuery = (`
            {
              addBoard(title: "${board.title}",desc: "${board.desc}" ){ title, desc, id}
            }
          `);

        client.mutate(mutationQuery)
            .then(resp => {
                callback(resp);
            }).catch(function(e) {
            console.log(e);
        })
    }

    static deleteBoard(board, callback){
        const mutationQuery = (`
            {
              deleteBoard(id: "${board}" ){desc}
            }
          `);

        client.mutate(mutationQuery)
            .then(resp => {
                callback(resp);
            }).catch(function(e) {
            console.log(e);
        })
    }

    static updateBoard(board, callback){
        const mutationQuery = (`
            {
              updateBoard(id: "${board.id}", title: "${board.title}", desc: "${board.desc}" ){title, desc, id}
            }
          `);
        client.mutate(mutationQuery)
            .then(resp => {
                callback(resp);
            }).catch(function(e) {
            console.log(e);
        })
    }
}