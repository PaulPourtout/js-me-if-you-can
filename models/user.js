const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at: Date,
    updated_at: Date,
    friends: Array,
})

const User = mongoose.model('User', userSchema);

module.exports = User;