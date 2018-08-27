
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // id: Number,
    first_name: String,
    last_name: String,
    sex: String,
    // age: Number,
    age: String,
    password: String,
    // confirmPW: String,
});

module.exports = mongoose.model("User", UserSchema);









