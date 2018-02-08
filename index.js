const express = require('express');
const bodyParser = require('body-parser');
const config = require('./application.config.js');
const mongoConn = require('./mongoConnection')();

var graphqlHTTP = require('express-graphql');

const graphQLResolvers = require('./api/graphql/resolvers');

var schema = require('./api/graphql/schema');

let app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: graphQLResolvers,
    graphiql: true
}));

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

require("./routes")(app, config);

app.listen(config.APP_SERVER_PORT_NO, () => console.log('App listening on port:',config.APP_SERVER_PORT_NO ));



module.exports = app;




