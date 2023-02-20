const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modelOptions = require("./model.options.js");


const favouriteSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    mediaType:{
        type: String,
        enum: ["tv", "movie"],
        required: true,
    },
    mediaId:{
        type: String,
        required: true,
    },
    mediaTitle:{
        type: String,
        required: true,
    },
    mediaPoster:{
        type: String,
        required: true,
    },
    mediaRate:{
        type: Number,
        required: true,
    },
}, modelOptions)

const favouriteModel = mongoose.model("Favourite", favouriteSchema)

module.exports =  favouriteModel;