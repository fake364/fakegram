var path = require("path");
var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('*', function (req, res, next) {
    return res.sendFile(path.resolve(__dirname, "../../../dist/build/index.html"));
});

module.exports = router;
