
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    sex: String,
    age: Number,
    password: String,
    // confirmPW: String,
});

module.exports = mongoose.model("User", UserSchema);









