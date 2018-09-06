const express = require("express");
const UserCtrl = require("./controllers/user");
const KataCtrl = require("./controllers/kata");
const SerieCtrl = require("./controllers/serie");
const Auth = require("./auth");
const tokenUtils = require("./auth/tokenUtils");

const userRouter = express.Router();
const kataRouter = express.Router();
const serieRouter = express.Router();
const authRouter = express.Router();

    userRouter
    .get("/:userId", tokenUtils.checkToken, UserCtrl.getById)
    .get("/", tokenUtils.checkToken, tokenUtils.isAdmin, UserCtrl.getAll)
    .post("/", UserCtrl.addOne)
    .post("/:userId/friends/:friendId", tokenUtils.checkToken, UserCtrl.addFriend)
    .delete("/:userId", tokenUtils.checkToken, tokenUtils.isAdmin, UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne) // TODO !!!

    kataRouter
    .get("/", tokenUtils.checkToken, KataCtrl.getAll)
    .post("/", tokenUtils.checkToken, tokenUtils.isAdmin, KataCtrl.addOne)
    .put("/:kataId", tokenUtils.checkToken, tokenUtils.isAdmin, KataCtrl.updateOne)
    .delete("/:kataId", tokenUtils.checkToken, tokenUtils.isAdmin, KataCtrl.deleteOne)
    .get("/:kataId", KataCtrl.getById)
    .put("/solutions/:kataId", tokenUtils.checkToken, KataCtrl.addSolution)
    .put("/solutions/:kataId/numb/:solutionId", tokenUtils.checkToken, tokenUtils.isAdmin, KataCtrl.removeSolution)
    .get("/user/:authorId", tokenUtils.checkToken, KataCtrl.findUserKatas);

    serieRouter
    .get("/", tokenUtils.checkToken, SerieCtrl.getAll)
    .post("/", tokenUtils.checkToken, tokenUtils.isAdmin, SerieCtrl.addOne)
    .get("/:serieId", SerieCtrl.getById)
    .put("/:serieId", tokenUtils.checkToken, tokenUtils.isAdmin, SerieCtrl.updateOne)
    .delete("/:serieId", tokenUtils.checkToken, tokenUtils.isAdmin, SerieCtrl.deleteOne)

    authRouter.post("/", Auth.login);

    module.exports = {userRouter, kataRouter, serieRouter, authRouter};
