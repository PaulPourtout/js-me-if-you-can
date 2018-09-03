const express = require("express");
const User = require("../models/user");
const crypt = require("./crypt");
const tokenUtils = require("./tokenUtils");

const auth = {};
const TOKEN_LONGEVITY = 60 * 60 * 24;

auth.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(async user => {
            if (!user) {
                next({status: 404, message: "Authentication failed. User not found."});
            } else {
                    const {id, password, username, email, admin} = user;
                    const isRightPassword = await crypt.checkPassword(req.body.password, password);

                if (!isRightPassword) {
                    next({status: 401, message: "Authentication failed. Wrong password."});
                } else {
                    const payload = {
                        id,
                        username,
                        email,
                        admin,
                    };

                    let token = tokenUtils.createToken(payload, TOKEN_LONGEVITY);
                    return res.json({
                        success: true,
                        message: "Authentication succeeded. Logged in !",
                        token
                    });
                } 
            }
        })
        .catch(err => {
            next({status: 400, message: "error"})
        })
};

module.exports = auth;
