const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypt = require("./crypt");
const auth = {};
const tokenUtils = require("./tokenUtils");

auth.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async user => {
      if (!user) {
        res
          .status(400)
          .json({
            success: false,
            message: "Authentication failed. User not found."
        });
      } else {
        const isRightPassword = await crypt.checkPassword(req.body.password, user.password);

        if (!isRightPassword) {
          res
            .status(400)
            .json({
              success: false,
              message: "Authentication failed. Wrong password."
          });
        } else {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            admin: user.admin,
          };

          let token = tokenUtils.createToken(payload, 60 * 60 * 24);
          res.json({
            success: true,
            message: "Logged in !",
            token
          });
        } 
      }
    })
    .catch(err => {
      res
        .status(400)
        .json({
        success: false,
        message: err
      });
    });
};

module.exports = auth;