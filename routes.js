const express = require("express");
const UserCtrl = require("./controllers/user");
const KataCtrl = require("./controllers/kata");
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

exports.kataRouter = express
.Router()
.get("/", KataCtrl.getAll)
.post("/", KataCtrl.addOne)
.delete("/", KataCtrl.deleteOne)
.get("/:kataId", KataCtrl.getAll)
.put("/solutions/:kataId", KataCtrl.addSolution)
.put("/solutions/:kataId/numb/:solutionId", KataCtrl.removeSolution)

exports.authRouter = express.Router().post("/", Auth.login);
