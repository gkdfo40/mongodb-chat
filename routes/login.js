var express = require('express');
var data = require('../model/userInfo');
var pbkdf2Password = require('pbkdf2-password');
var hasher = pbkdf2Password();

var router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post('/', function (req, res) {
    var userid = req.body.userID;
    var password = req.body.password;

    data.findOne({ userID: userid }, function (err, doc) {
        if (err) {
            res.send({ resultcode: 101, msg: "ID가 일치하지 않습니다." });
        }
        else if (doc) {
            hasher({ password: password, salt: doc.salt }, (err, pass, salt, hash) => {
                if (hash === doc.password) {
                    console.log(doc.userID + " is logined");
                    res.send({ resultcode: 100, userID: doc.userID, username: doc.username });
                }
                else {
                    res.send({ resultcode: 202, msg: "login failed" });
                }
            });
        }
        else {
            res.send({ resultcode: 204, msg: "ID가 일치하지 않습니다." });
        }
    });
});

module.exports = router;