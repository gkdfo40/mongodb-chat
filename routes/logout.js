var express = require('express');

var logout = express.Router();

logout.use(express.urlencoded({ extended: false }));
logout.use(express.json());

logout.get('/', function (req, res) {
    console.log("clear cookie");
    console.log(req.params.userID + " is logout");
    res.clearCookie('userid');
    res.clearCookie('username');
    res.send({ resultcode: 300, msg: "logout" });
});

module.exports = logout;