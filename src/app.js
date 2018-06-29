const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const { userRouter, authRouter, kataRouter, serieRouter } = require("./routes");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/jsing")
    .then(res => console.log("db connected"))
    .catch(err => console.error("Error", err));

app.use(express.json()); // Get json from posts request
app.use(cors());
app.use(morgan("dev")); // Plugin to log requests to the console

const apiRouter = express.Router();

app.use("/api", apiRouter);

apiRouter.get("/", (req, res) => {
    res.send("API"); 
});

apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/katas", kataRouter);
apiRouter.use("/series", serieRouter);

app.get("*", (req, res) => res.status(404).send("404 error"));

module.exports = app;