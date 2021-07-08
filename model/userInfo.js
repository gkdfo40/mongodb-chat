const mongoose = require('mongoose');

let url = process.env.MONGODB_URL;
mongoose.connect(url, { dbName: 'samjo', useNewUrlParser: true }, function (err) {
    console.log('err ::' + err);
});

// model setting
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userID: String,
    username: String,
    password: String,
    salt: String,
    memberlist: [],
    chatList: []
});

module.exports = mongoose.model('userInfo', userSchema, 'userInfo');