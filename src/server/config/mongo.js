var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/fakegram');
var db = mongoose.connection;

module.exports = db;