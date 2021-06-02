var express = require('express');
var data = require('../model/userInfo');
var pbkdf2Password = require('pbkdf2-password');
var hasher = pbkdf2Password();

var signup = express.Router();

signup.use(express.urlencoded({ extended: false }));
signup.use(express.json());

signup.post('/', function (req, res) {
    var userid = req.body.userID;
    var username = req.body.username;
    var password = req.body.password;

    if (userid != null && username != null && password != null) {
        data.findOne({ userID: userid }, function (err, doc) {
            if (err) {
                console.log("error");
            }
            else if (doc == undefined) {
                hasher({ password: password }, async (err, pass, salt, hash) => {
                    var userData = new data();
                    userData.userID = userid;
                    userData.username = username;
                    userData.password = hash;
                    userData.salt = salt;
                    console.log("New user sign up us ::" + userData);
                    userData.save(function (err, resultData) {
                        res.json({ resultcode: 100, msg: "sign up success", data: resultData });
                    });
                });
            } else {
                res.json({ resultcode: 200, msg: "중복되는 ID가 존재합니다." });
            }
        });
    }
    else {
        res.json({ resultcode: 203, msg: "가입정보가 부족합니다." });
    }
});

module.exports = signup;