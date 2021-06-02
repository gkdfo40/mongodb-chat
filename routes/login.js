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
        var resultInfo = { msg: "login Falied" };
        if (err) {
            res.json(resultInfo);
        }
        else if (doc) {
            hasher({ password: password, salt: doc.salt }, (err, pass, salt, hash) => {
                if (hash === doc.password) {
                    console.log(doc.userID + " is logined");
                    res.json(doc);
                }
                else {
                    res.json({ resultcode: 202, msg: "login failed" });
                }
            });
        }
        else {
            res.json(resultInfo);
        }
    });
});

module.exports = router;