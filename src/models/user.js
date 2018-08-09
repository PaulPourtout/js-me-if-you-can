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

module.exports = User;
