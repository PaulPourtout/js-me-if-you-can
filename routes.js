const express = require("express");
const UserCtrl = require("./controllers/user");
const Auth = require("./auth");
const tokenUtils = require("./auth/tokenUtils");

exports.userRouter = express
  .Router()
  .get("/:userId", UserCtrl.getById)
  .get("/", UserCtrl.getAll)
  .post("/", UserCtrl.addOne)
  .post("/:userId/friends/:friendId", tokenUtils.checkToken, UserCtrl.addFriend)
  .delete("/:userId", tokenUtils.checkToken, UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne)

exports.authRouter = express.Router().post("/", Auth.login);
