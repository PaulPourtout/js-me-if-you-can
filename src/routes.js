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
    .get("/:userId", UserCtrl.getById)
    .get("/", UserCtrl.getAll)
    .post("/", UserCtrl.addOne)
    .post("/:userId/friends/:friendId", tokenUtils.checkToken, UserCtrl.addFriend)
    .delete("/:userId", UserCtrl.deleteOne);
// .put('/:userId', UserCtrl.updateOne) // TODO !!!

    kataRouter
    .get("/", KataCtrl.getAll)
    .post("/", KataCtrl.addOne)
    .put("/:kataId", KataCtrl.updateOne)
    .delete("/:kataId", KataCtrl.deleteOne)
    .get("/:kataId", KataCtrl.getById)
    .put("/solutions/:kataId", KataCtrl.addSolution)
    .put("/solutions/:kataId/numb/:solutionId", KataCtrl.removeSolution)
    .get("/user/:authorId", KataCtrl.findUserKatas);

    serieRouter
    .get("/", SerieCtrl.getAll)
    .post("/", SerieCtrl.addOne)
    .get("/:serieId", SerieCtrl.getById)
    .delete("/:serieId", SerieCtrl.deleteOne)

    authRouter.post("/", Auth.login);

    module.exports = {userRouter, kataRouter, serieRouter, authRouter};
