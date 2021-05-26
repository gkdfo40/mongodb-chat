const mongoose = require('mongoose');

let url = "mongodb+srv://clientuser:157923468@samjotecbase.ay4fs.mongodb.net/samjo?retryWrites=true&w=1";
mongoose.connect(url, { dbName: 'samjo', useNewUrlParser: true }, function (err) {
    console.log('err ::' + err);
});

// model setting
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userID: String,
    username: String,
    age: Number,
    tel: String
});

module.exports = mongoose.model('userInfo', userSchema, 'userInfo');