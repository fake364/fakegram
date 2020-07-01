var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db = require("./config/mongo");
var bodyparser = require('body-parser');
var indexRouter = require('./routes');

var apiRouter = require('./routes/api');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyparser.urlencoded());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', express.static(path.resolve(__dirname, "../../dist/build/")));
app.use(express.json());


app.use(bodyparser.json());

app.use('/api', apiRouter);
app.get('*', function (req, res, next) {
    return res.sendFile(path.resolve(__dirname, "../../dist/build/index.html"));
});

module.exports = app;
