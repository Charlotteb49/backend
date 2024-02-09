const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    family_name: { type: String, required: true}, 
    username: { type: String, required: true, unique: true},
    imageUrl: {type: String}, 
    admin: {type: Boolean},
    score: {type: Number}


});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)