const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypt = require("../auth/crypt");

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    friends: Array
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

const createAdmin = async () => {
    let hashPassword = await crypt.hashPassword("admin");
    
    // TO DO : delete in prod
    const user = new User({
        name: "admin",
        username: "admin",
        email: "admin@admin.com",
        password: hashPassword,
        admin: true,
        friends: []
    })
    
    return user.save();
}

// createAdmin();

module.exports = User;
