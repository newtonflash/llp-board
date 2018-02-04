const express = require('express');
const bodyParser = require('body-parser');
const config = require('./application.config.js');
const mongoConnection = require('./mongoConnection');

let app = express();
app.listen(config.APP_SERVER_PORT_NO, () => console.log('App listening on port:',config.APP_SERVER_PORT_NO ));

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

require("./routes")(app, config);


module.exports = app;



