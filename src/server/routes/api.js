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
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Fakegram api');
});
router.patch("/post/:postid", withAuth, function (req, res, next) {
    console.log(req.body);
    if (!req.body.comment || req.body.comment.trim() === "") {
        res.status(400).send("Комментарий не может быть пустой");
    } else {
        Post.findOne({_id: req.params.postid}).then((doc, err) => {
            if (err) {
                console.log(err);
            }
            if (doc !== null) {
                const {author, comment} = req.body;
                doc.comments.push({author, comment});
                doc.save().then((doc2, err) => {
                    if (doc2) {
                        res.sendStatus(200);
                    }
                    if (err) {
                        res.sendStatus(500);
                    }
                })

            } else {
                res.status(404).send("Такого поста нет");
            }
        });
    }
});

router.patch("/user/subscribe", withAuth, function (req, res, next) {
    const {from, to, type} = req.body;
    User.find({$or: [{username: from}, {username: to}]}).populate("subscribers").then((docs, err) => {
        if (err) {
            res.sendStatus(500);
        }
        if (docs !== null) {
            if (docs[0].username === from) {
                if (type === "subscribe") {
                    docs[0].subscribed.push(docs[1]);
                    docs[1].subscribers.push(docs[0]);
                } else {
                    docs[0].subscribed.splice(docs[1], 1);
                    docs[1].subscribers.splice(docs[0], 1);
                }
            } else {
                if (type === "subscribe") {
                    docs[1].subscribed.push(docs[0]);
                    docs[0].subscribers.push(docs[1]);
                } else {
                    docs[1].subscribed.splice(docs[0], 1);
                    docs[0].subscribers.splice(docs[1], 1);
                }
            }

            docs[0].save().then(doc => {
                docs[1].save().then(doc2 => {
                    let toSend = doc.username === to ? doc : doc2;
                    toSend = {subscribers: toSend.subscribers}
                    res.status(200).json(toSend);
                });
            });
        }
    });
});
router.delete('/user/:username', function (req, res) {
    const user = req.params.username;
    User.deleteOne({username: user}).then(() => {
        res.sendStatus(200)
    }).catch(err => {
        res.sendStatus(500);
    });
});
router.post('/user', function (req, res, next) {
    console.log(req.headers);
    console.log(req.body);
    const {body: {phone, name, login, password}} = req;
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
    res.status(200).json({username: decoded.username, userid: decoded.userid, name: decoded.name});
});
router.post('/authenticate', function (req, res) {
    const {userlogin: username, passlogin: password} = req.body;

    User.findOne({username}).then((user, err) => {
        console.log(user);
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    err: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    err: 'Неправильное имя пользователя или пароль'
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
                            err: 'Неправильное имя пользователя или пароль'
                        });
                } else {
                    // Issue token
                    const payload = {userid: user._id, username, name: user.name};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, {httpOnly: true})
                        .status(200).json({username: username, userid: user._id, name: user.name});
                }
            });
        }
    });
});
router.get("/logout", withAuth, function (req, res) {
    res.cookie("token", "").sendStatus(200);
});
router.get('/feed', withAuth, function (req, res) {

    User.findOne({username: req.query.username}).populate({
        path: "posts",
        populate: {
            path: "author",
            select: "username"
        }
    }).populate({
        path: "subscribed",
        populate: {
            path: "posts",
            populate: {
                path: "author",
                select: "username"
            }

        }
    })
        .then((doc, err) => {
            if (err) {
                console.log(err);
            }

            if (doc !== null) {
                const {subscribed} = doc;
                let allPosts = [...subscribed, {posts: doc.posts}]
                res.status(200).json({subscribed: allPosts});
            } else {
                res.status(404).send("Что-то пошло не так");
            }
        });
});
router.get('/:user', function (req, res) {

    User.findOne({username: req.params.user}).populate("posts").populate("subscribed", "username").populate("subscribers", "username").then((doc, err) => {
        if (err) {
            console.log(err);
        }
        if (doc !== null) {
            const {username, name, posts, subscribed, subscribers} = doc;
            res.status(200).json({username, name, posts, subscribed, subscribers});
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
            var targetDir = "../../../dist/build/images/posts/";
            if (!fs.existsSync(path.resolve(__dirname, targetDir))) {
                fs.mkdirSync(path.resolve(__dirname, targetDir));
            }
            sharp(req.file.buffer).resize({
                width: 600
            }).toFile(path.resolve(__dirname, targetDir + doc._id + ".png")).then(function (fileinfo) {
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
