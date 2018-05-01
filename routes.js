const express = require("express");
const UserCtrl = require("./controllers/user");

exports.userRouter = express
  .Router()
  .get("/:userId", UserCtrl.getById)
  .get("/", UserCtrl.getAll)
  .post("/", UserCtrl.addOne)
  .post("/:userId/friends/:friendId", UserCtrl.addFriend)
  .delete("/:userId", UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne)
