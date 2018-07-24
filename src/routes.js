const express = require("express");
const UserCtrl = require("./controllers/user");
const KataCtrl = require("./controllers/kata");
const SerieCtrl = require("./controllers/serie");
const Auth = require("./auth");
const tokenUtils = require("./auth/tokenUtils");

exports.userRouter = express
    .Router()
    .get("/:userId", UserCtrl.getById)
    .get("/", UserCtrl.getAll)
    .post("/", UserCtrl.addOne)
    .post("/:userId/friends/:friendId", tokenUtils.checkToken, UserCtrl.addFriend)
    .delete("/:userId", UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne) // TODO !!!

exports.kataRouter = express
    .Router()
    .get("/", KataCtrl.getAll)
    .post("/", KataCtrl.addOne)
    .delete("/:kataId", KataCtrl.deleteOne)
    .get("/:kataId", KataCtrl.getById)
    .put("/solutions/:kataId", KataCtrl.addSolution)
    .put("/solutions/:kataId/numb/:solutionId", KataCtrl.removeSolution)
    .get("/user/:authorId", KataCtrl.findUserKatas);

exports.serieRouter = express
    .Router()
    .get("/", SerieCtrl.getAll)
    .post("/", SerieCtrl.addOne)
    .get("/:serieId", SerieCtrl.getById)
    .delete("/:serieId", SerieCtrl.deleteOne)

exports.authRouter = express.Router().post("/", Auth.login);
