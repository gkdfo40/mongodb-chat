var express = require('express');
var data = require('../model/userInfo');
//var empty = require('is-empty');

var router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());


// 전체 데이터를 불러와서 항목별로 보기
router.get('/', function (req, res) {
    data.find(function (err, cursor) {
        var resultData = "";

        if (!err) {
            resultData = cursor;
        }
        res.json(resultData);
    });
});


// id 기반으로 조회하여 데이터를 1건 불러오기
router.get('/:userID', function (req, res) {
    data.findOne({ userID: req.params.userID }, function (err, cursor) {
        var resultData = "";
        if (!err) {
            resultData = cursor;
        }
        res.json(resultData);
    });
})

// 데이터 추가하기
router.post('/', function (req, res) {
    var userID = req.body.userID;
    var username = req.body.username;
    var age = req.body.age;
    var tel = req.body.tel;

    if (userID != null && username != null && age != null && tel != null) {
        var userData = new data();
        userData.userID = userID;
        userData.username = username;
        userData.age = age;
        userData.tel = tel;

        console.log("New user join us ::" + userData);

        userData.save(function (err, resultData) {
            res.json({ result: err, error: err, data: resultData });
        });
    } else {
        res.json({ result: false, error: null, data: null });
    }
});

//id로 데이터 수정
router.put('/:userID', function (req, res) {
    var username = req.body.username;
    var age = req.body.age;
    var tel = req.body.tel;
    const userID = req.params.userID;

    if (userID != null) {
        data.findOneAndUpdate({ userID: userID },
            { $set: { username: username, age: age, tel: tel } },
            function (err, doc) {
                res.json({ result: err, error: err, data: doc });
            });
    } else {
        res.json({ result: false, error: null, data: null });
    }
});

// 데이터 삭제
router.delete('/:userID', function (req, res) {
    const userID = req.params.userID;
    if (userID != null) {
        data.deleteOne({ userID: userID }, function (err, resultData) {
            res.json({ result: err, error: err, data: resultData });
        });
    } else {
        res.json({ result: false, error: null, data: null });
    }
});
module.exports = router;
