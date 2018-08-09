const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { userRouter, authRouter, kataRouter, serieRouter } = require("./routes");
require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DB || "mongodb://localhost/jsing";

mongoose
    .connect(DB)
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

// Serve React app
app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/katas", kataRouter);
apiRouter.use("/series", serieRouter);

app.get("*", (req, res) => res.status(404).send("404 error"));

module.exports = app;
