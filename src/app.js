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
const errorHandler = require("./utils/errorHandler");

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

// Middlewares
apiRouter.use(express.json()); // Get json from posts request
apiRouter.use(morgan("dev")); // Plugin to log requests to the console

// Routes handling
apiRouter.use("/users", userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/katas", kataRouter);
apiRouter.use("/series", serieRouter);
apiRouter.get("/", (req, res) => {
    res.send("JSme API"); 
});

apiRouter.get("/coucou", (req, res) => {
    res.send("COUCOU")
})

app.use("/api", apiRouter);

// Unknown routes handling
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

// Errors handling
app.use(errorHandler);

module.exports = app;
