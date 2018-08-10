const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { userRouter, authRouter, kataRouter, serieRouter } = require("./routes");
require("dotenv").config();
const mongoose = require("mongoose");
const DB = process.env.DB || "mongodb://localhost/jsing";
const apiRouter = express.Router();

// Connect to database
mongoose
    .connect(DB)
    .then(res => console.log("db connected"))
    .catch(err => console.error("Error", err));

const corsOptions = {
    origin: 'https://js-me-api.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
// Serve React app
app.use(express.static(path.join(__dirname, "..", "client", "build")))


apiRouter.use(express.json()); // Get json from posts request
apiRouter.use(morgan("dev")); // Plugin to log requests to the console

apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/katas", kataRouter);
apiRouter.use("/series", serieRouter);

app.use("/api", apiRouter);


apiRouter.get("/", (req, res) => {
    res.send("API"); 
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

module.exports = app;
