const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const categoryModel = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
        required: true
    }
});

categoryModel.methods.toJSON = function(){
    const { __v, ...category } = this.toObject();
    return category
}

module.exports = model("category", categoryModel);