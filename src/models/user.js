const express = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypt = require("../auth/crypt");
const isEmptyString = require("../utils/stringUtils");

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    katasDone: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Kata'
        }
    ],
    friends: Array,
}, {
    timestamps: true,
    strict: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;
