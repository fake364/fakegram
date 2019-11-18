var jwt = require("jsonwebtoken");
var path = require('path');
var withAuth = require("../midleware/midleware");
var express = require('express');
var router = express.Router();
var User = require("../models/User");
const secret = "test";
const multer = require('multer');
const upload = multer();
const sharp = require("sharp");
const Post = require("../models/Post");
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Fakegram api');
});
router.post('/user', function (req, res, next) {
    console.log(req.body);
    const {body: {phone, name, login, password}} = req;
    //console.log(User);
    User.findOne({$or: [{phone: phone}, {username: login}]}).then((doc, err) => {
        if (err) {
            console.log(err);
        }
        if (doc === null) {
            const user = new User({phone, name, username: login, password});
            user.save().then((data, err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(data);
                }

            });
        } else {
            res.status(401).json({err: "Такой логин или телефон уже зарегистрированы"});
        }
    });

});
router.get('/checkToken', withAuth, function (req, res) {
    const token = req.cookies.token;
    const decoded = jwt.decode(token);
    console.log(decoded.userid);
    res.status(200).json({username: decoded.username, userid: decoded.userid});
});
router.post('/authenticate', function (req, res) {
    const {userlogin: username, passlogin: password} = req.body;
    User.findOne({username}, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    err: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    err: 'Incorrect username or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            err: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            err: 'Incorrect username or password'
                        });
                } else {
                    // Issue token
                    const payload = {userid: user._id, username};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly: true})
                        .status(200).json({username: username, userid: user._id});
                }
            });
        }
    });
});
router.get("/logout", withAuth, function (req, res) {
    res.cookie("token","").sendStatus(200);
});
router.get('/:user', function (req, res) {

    User.findOne({username: req.params.user}).populate("posts").then((doc, err) => {
        if (err) {
            console.log(err);
        }
        if (doc !== null) {
            const {username, name, posts} = doc;
            res.status(200).json({username, name, posts});
        } else {
            res.status(404).send("Такого пользователя нет");
        }
    });
});

router.post('/post', withAuth, upload.single("image"), function (req, res, next) {
    console.log(req.body);
    const {description, author} = req.body;
    const post = new Post({description, image: "", author});
    post.save().then((doc, err) => {
        if (err) {
            res.status(500).send("Error creating post");
        }
        if (doc) {
            sharp(req.file.buffer).resize({
                height: 600,
                width: 600
            }).toFile(path.resolve(__dirname, "../../../dist/build/images/posts/" + doc._id + ".png")).then(function (fileinfo) {
                Post.findOneAndUpdate({_id: doc._id}, {image: doc._id + ".png"}, {new: true}).then((document, err) => {
                    if (err) {
                        res.sendStatus(500);
                    }
                    if (document) {
                        User.findOne({_id: author}, function (err, user) {
                            user.posts.push(doc._id);
                            user.save().then((saved, err) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send("Couldnt save user");

                                }
                                res.status(200).send("User updated");

                            });
                        });
                    }
                });
            });
        }

    });
});

module.exports = router;
