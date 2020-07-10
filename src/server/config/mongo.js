var mongoose = require("mongoose");
var _ = require("lodash");

var hostname = _.find(process.argv, (el) => el.includes("hostname="));
var foundHostName = hostname ? hostname.split("=")[1] : "localhost";
console.log("Hostname will be:'" + foundHostName + "'");
var fullIp = 'mongodb://' + foundHostName + ':27017/fakegram';
console.log("Full ip:'" + fullIp + "'");
mongoose.connect(fullIp, {
    useNewUrlParser: true
}).catch((e) => {
    console.error("Couldn't connect to DB\n" + e);
    process.exit(1);
});

var db = mongoose.connection;

module.exports = db;