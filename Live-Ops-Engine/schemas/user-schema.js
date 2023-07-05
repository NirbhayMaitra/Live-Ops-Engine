const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        validation: []
    },
    password:{
        type: String,
        required: true,


    },
    email: String,
    mobile: Number
},{})

const user = mongoose.model("user", userSchema)
module.exports = {user}