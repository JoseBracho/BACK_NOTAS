const mongoose = require("mongoose");

const { Schema, model } = mongoose

const userModel = new Schema({
    name:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    age:{
        type: String
    },
    email:{
        type: String
    },
    hobby:{
        type: String
    },
})

userModel.methods.toJSON = function(){
    const { password, __v, ...user } = this.toObject();
    return user
}

module.exports = model( "user", userModel );