const { date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: string,
    rating: {
        type:number,
        min:1,
        max:5
    },
    createdAt:{
        type:date,
        default: date.now()
    }
});

module.exports = mongoose.model("Review", reviewSchema);