var env = require('node-env-file'); // .env file
env(__dirname + '/.env');
const expressValidator = require('express-validator');
const app = require('./app');
const { createConnection } = require('./database');
createConnection();
app.listen(3000);
console.log('Server on port', 3000);