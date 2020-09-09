const express = require('express');
const morgan =  require('morgan');

const app = express();
debugger
//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use(require('./routes/contacts.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/auth.routes'));

module.exports = app;


