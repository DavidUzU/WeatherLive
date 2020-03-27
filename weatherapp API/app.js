const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const errorHandler = require('./helpers/errorHandler')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Include cookies in the requests sent for JWT
    res.header('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Set Routes
app.use('/', router);

//Set error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;
