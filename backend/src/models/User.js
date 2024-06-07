const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password : {type: String, required: true,},
    role : {type: String, enum:['RoleA', "RoleB"], default: "RoleA"},
});

module.exports = mongoose.model("user", userSchema);