const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const modelOptions = require("./model.options.js");
const crypto = require("crypto");

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    displayName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    salt:{
        type: String,
        required: true,
    },
}, modelOptions)

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex")

    this.password = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");
}

userSchema.methods.validPassword = function(password){
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        "sha512"
    ).toString("hex");

    return this.password === hash;
}

// module.exports = mongoose.model('User', userSchema);
const userModel = mongoose.model("User", userSchema)

module.exports = userModel;