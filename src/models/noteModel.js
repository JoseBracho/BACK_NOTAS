const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const noteModel = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category', 
        required: true
    }
});


noteModel.methods.toJSON = function(){
    const { __v, ...note } = this.toObject();
    return note
}

module.exports = model("note", noteModel);
