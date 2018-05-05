const express = require("express");
const UserCtrl = require("./controllers/user");
const Auth = require("./auth");
const tokenUtils = require('./auth/tokenUtils');

exports.userRouter = express
  .Router()
  .get("/:userId", UserCtrl.getById)
  .get("/", tokenUtils.checkToken, UserCtrl.getAll)
  .post("/", UserCtrl.addOne)
  .post("/:userId/friends/:friendId", UserCtrl.addFriend)
  .delete("/:userId", UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne)


exports.authRouter = express.Router().post("/", Auth.login);
