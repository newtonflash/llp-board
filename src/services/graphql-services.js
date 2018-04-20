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

    static getBoardById(id, callback){
        const query = (`
            {
                getBoardById(id:"${id}"){
                    id,
                    title,
                    desc,
                    taskList {
                        title,
                        order,
                        id,
                        tasks{
                          title,
                          desc
                        }

                    }
                }
            }
          `);
        client.query(query)
            .then(resp => {
                callback(resp.getBoardById);
            }).catch(function(e) {
            console.log(e);
        })
    }

    static updateTaskList(data, callback){
        var taskList = data.taskList

        //let mutationQuery = `{ updateTaskList(id:'" + data.id + "' taskList:["+ taskList +"]){id, title, desc, taskList{title, order}}}`;

        const mutation = (`
            {
                updateTaskList( id : "${data.id}" , taskList: ${JSON.stringify(taskList).replace(/\{\"/g, "{").replace(/\,\"/g, ",").replace(/\"\:/g, ":")} ){
                    id,
                    title,
                    desc,
                    taskList {
                        title,
                        order,
                        id
                    }
                }
            }
          `);
       client.mutate(mutation)
            .then(resp => {
                callback(resp.getBoardById);
            }).catch(function(e) {
            console.log(e);
        })
    }
}