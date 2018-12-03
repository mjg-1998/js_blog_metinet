const express = require('express');

const mongoose = require('mongoose');
require('./src/models');

const apiRouter = require('./src/routes');

const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/guillot_js', {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'co error'));
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function () {
    const app = express();

    app.use(bodyParser.urlencoded({extended: false})); // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());


    app.use('/', apiRouter);
    app.use(function (req, res, next) {
        if (app.get('env') === 'development') {
            console.log(`${req.method} ${req.baseUrl}`);
        }
        req.data = {};
        next();
    });


    app.listen(3000, function () {
        console.log("Server listening on port 3000");

    });
});
